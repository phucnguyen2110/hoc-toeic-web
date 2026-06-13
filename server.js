// Express Full-stack TOEIC Server
const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { query, initDb } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'toeic-master-super-secret-key';

// Middleware
app.use(express.json());

// Database Lazy Initialization Middleware for Serverless & Local Environment
let dbInitialized = false;
async function ensureDbInitialized(req, res, next) {
    if (!dbInitialized) {
        try {
            await initDb();
            dbInitialized = true;
        } catch (err) {
            console.error('Database initialization failed:', err.message);
            return res.status(500).json({ error: 'Không thể khởi tạo cơ sở dữ liệu.' });
        }
    }
    next();
}
app.use(ensureDbInitialized);

// Serve static files directly from the root directory
app.use(express.static(__dirname));

// JWT Verification Middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ error: 'Truy cập bị từ chối. Vui lòng đăng nhập.' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Phiên làm việc hết hạn. Vui lòng đăng nhập lại.' });
        }
        req.user = user;
        next();
    });
}

// ============================================
// AUTHENTICATION ROUTES
// ============================================

// Register User
app.post('/api/auth/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password || username.trim() === '' || password.trim() === '') {
        return res.status(400).json({ error: 'Tài khoản và mật khẩu không được trống.' });
    }

    try {
        // Check if user already exists
        const existingUser = await query('SELECT * FROM users WHERE username = $1', [username]);
        if (existingUser.count > 0) {
            return res.status(400).json({ error: 'Tên tài khoản đã tồn tại.' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert user
        const result = await query(
            'INSERT INTO users (username, password) VALUES ($1, $2)',
            [username, hashedPassword]
        );

        // Fetch inserted user to get correct ID (since SQLite run returns lastID but PG query returns row)
        let userId = result.lastID;
        if (!userId) {
            const newUser = await query('SELECT id FROM users WHERE username = $1', [username]);
            userId = newUser.rows[0].id;
        }

        // Generate JWT
        const userPayload = { id: userId, username };
        const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({
            message: 'Đăng ký tài khoản thành công.',
            token,
            user: userPayload
        });
    } catch (err) {
        console.error('Registration Error:', err.message);
        res.status(500).json({ error: 'Lỗi máy chủ trong quá trình đăng ký.' });
    }
});

// Login User
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Vui lòng nhập tài khoản và mật khẩu.' });
    }

    try {
        // Find user
        const userResult = await query('SELECT * FROM users WHERE username = $1', [username]);
        if (userResult.count === 0) {
            return res.status(400).json({ error: 'Tài khoản hoặc mật khẩu không chính xác.' });
        }

        const user = userResult.rows[0];

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Tài khoản hoặc mật khẩu không chính xác.' });
        }

        // Generate JWT
        const userPayload = { id: user.id, username: user.username };
        const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: '7d' });

        res.json({
            message: 'Đăng nhập thành công.',
            token,
            user: userPayload
        });
    } catch (err) {
        console.error('Login Error:', err.message);
        res.status(500).json({ error: 'Lỗi máy chủ trong quá trình đăng nhập.' });
    }
});

// Get Current User Info
app.get('/api/auth/me', authenticateToken, (req, res) => {
    res.json({ user: req.user });
});


// ============================================
// VOCABULARY PROGRESS ROUTES
// ============================================

// Get progress for current user
app.get('/api/progress', authenticateToken, async (req, res) => {
    try {
        const result = await query(
            'SELECT topic_id, mastered_words, learning_words FROM vocab_progress WHERE user_id = $1',
            [req.user.id]
        );
        res.json({ progress: result.rows });
    } catch (err) {
        console.error('Fetch Progress Error:', err.message);
        res.status(500).json({ error: 'Không thể lấy dữ liệu tiến độ.' });
    }
});

// Sync/Save progress
app.post('/api/progress', authenticateToken, async (req, res) => {
    const { topic_id, mastered_words, learning_words } = req.body;

    if (!topic_id) {
        return res.status(400).json({ error: 'Thiếu mã chủ đề (topic_id).' });
    }

    const masteredStr = typeof mastered_words === 'string' ? mastered_words : JSON.stringify(mastered_words || []);
    const learningStr = typeof learning_words === 'string' ? learning_words : JSON.stringify(learning_words || []);

    try {
        // Standard SQL UPSERT (Works on SQLite >= 3.24.0 and PostgreSQL)
        await query(`
            INSERT INTO vocab_progress (user_id, topic_id, mastered_words, learning_words) 
            VALUES ($1, $2, $3, $4)
            ON CONFLICT(user_id, topic_id) 
            DO UPDATE SET 
                mastered_words = EXCLUDED.mastered_words, 
                learning_words = EXCLUDED.learning_words, 
                updated_at = CURRENT_TIMESTAMP
        `, [req.user.id, topic_id, masteredStr, learningStr]);

        res.json({ message: 'Lưu tiến độ học tập thành công.' });
    } catch (err) {
        console.error('Save Progress Error:', err.message);
        res.status(500).json({ error: 'Không thể lưu tiến độ học tập.' });
    }
});


// ============================================
// PRACTICE HISTORY ROUTES
// ============================================

// Get all test results and attempts
app.get('/api/results', authenticateToken, async (req, res) => {
    try {
        // Query Reading/Listening test results
        const testResults = await query(
            'SELECT * FROM test_results WHERE user_id = $1 ORDER BY id DESC',
            [req.user.id]
        );

        // Query Speaking/Writing attempts
        const attempts = await query(
            'SELECT * FROM attempts WHERE user_id = $1 ORDER BY id DESC',
            [req.user.id]
        );

        res.json({
            testResults: testResults.rows,
            attempts: attempts.rows
        });
    } catch (err) {
        console.error('Fetch Results Error:', err.message);
        res.status(500).json({ error: 'Không thể lấy lịch sử luyện tập.' });
    }
});

// Save Listening/Reading Test Result
app.post('/api/results', authenticateToken, async (req, res) => {
    const { test_id, score, total, percentage, date } = req.body;

    if (!test_id || score === undefined || total === undefined) {
        return res.status(400).json({ error: 'Thiếu dữ liệu kết quả bài thi.' });
    }

    const formattedDate = date || new Date().toLocaleString('vi-VN');

    try {
        await query(
            'INSERT INTO test_results (user_id, test_id, score, total, percentage, date) VALUES ($1, $2, $3, $4, $5, $6)',
            [req.user.id, test_id, score, total, percentage, formattedDate]
        );
        res.status(201).json({ message: 'Lưu kết quả bài thi thành công.' });
    } catch (err) {
        console.error('Save Test Result Error:', err.message);
        res.status(500).json({ error: 'Không thể lưu kết quả bài thi.' });
    }
});

// Save Speaking/Writing Attempt
app.post('/api/attempts', authenticateToken, async (req, res) => {
    const { type, question_id, user_input, score, max_score, feedback, date } = req.body;

    if (!type || !question_id || user_input === undefined || score === undefined) {
        return res.status(400).json({ error: 'Thiếu dữ liệu bài luyện tập.' });
    }

    const formattedDate = date || new Date().toLocaleString('vi-VN');

    try {
        await query(
            'INSERT INTO attempts (user_id, type, question_id, user_input, score, max_score, feedback, date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [req.user.id, type, question_id, user_input, score, max_score, feedback, formattedDate]
        );
        res.status(201).json({ message: 'Lưu bài làm thành công.' });
    } catch (err) {
        console.error('Save Attempt Error:', err.message);
        res.status(500).json({ error: 'Không thể lưu bài làm.' });
    }
});


// ============================================
// STATIC SITE ROUTING FALLBACK
// ============================================

// Catch all other routes to serve index.html (SPA fallback)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running at: http://localhost:${PORT}`);
    });
}

module.exports = app;
