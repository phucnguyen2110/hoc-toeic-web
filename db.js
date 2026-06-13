// Dynamic Database Adapter (SQLite for local, PostgreSQL for production Vercel)
const sqlite3 = require('sqlite3');
const pg = require('pg');
const path = require('path');
const fs = require('fs');

const isProd = !!process.env.DATABASE_URL;
let dbClient = null;

// Initialize connection
if (isProd) {
    console.log('Using PostgreSQL database connection');
    dbClient = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
} else {
    console.log('Using local SQLite database connection');
    const dbPath = path.join(__dirname, 'database.db');
    dbClient = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Failed to connect to SQLite:', err.message);
        } else {
            console.log('Connected to SQLite at:', dbPath);
        }
    });
}

// Unified Query Interface
function query(sql, params = []) {
    return new Promise((resolve, reject) => {
        if (isProd) {
            // PostgreSQL Pool Query
            dbClient.query(sql, params, (err, res) => {
                if (err) {
                    console.error('PostgreSQL query error:', err, 'SQL:', sql);
                    return reject(err);
                }
                resolve({ rows: res.rows, count: res.rowCount });
            });
        } else {
            // SQLite Query
            // Convert PostgreSQL query parameters ($1, $2) to SQLite style (?)
            const sqliteSql = sql.replace(/\$[0-9]+/g, '?');
            
            const isInsertOrUpdate = /^\s*(INSERT|UPDATE|DELETE|CREATE|DROP|ALTER)/i.test(sqliteSql);
            
            if (isInsertOrUpdate) {
                dbClient.run(sqliteSql, params, function(err) {
                    if (err) {
                        console.error('SQLite run error:', err, 'SQL:', sqliteSql);
                        return reject(err);
                    }
                    resolve({ rows: [], lastID: this.lastID, changes: this.changes });
                });
            } else {
                dbClient.all(sqliteSql, params, (err, rows) => {
                    if (err) {
                        console.error('SQLite all error:', err, 'SQL:', sqliteSql);
                        return reject(err);
                    }
                    resolve({ rows: rows || [], count: rows ? rows.length : 0 });
                });
            }
        }
    });
}

// Database Migrations (Run on server bootup)
async function initDb() {
    console.log('Initializing database tables...');
    try {
        if (isProd) {
            // PostgreSQL table schemas
            await query(`
                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    username VARCHAR(100) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            `);
            await query(`
                CREATE TABLE IF NOT EXISTS vocab_progress (
                    id SERIAL PRIMARY KEY,
                    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                    topic_id VARCHAR(100) NOT NULL,
                    mastered_words TEXT DEFAULT '[]',
                    learning_words TEXT DEFAULT '[]',
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    UNIQUE(user_id, topic_id)
                );
            `);
            await query(`
                CREATE TABLE IF NOT EXISTS test_results (
                    id SERIAL PRIMARY KEY,
                    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                    test_id VARCHAR(100) NOT NULL,
                    score INTEGER NOT NULL,
                    total INTEGER NOT NULL,
                    percentage INTEGER NOT NULL,
                    date VARCHAR(100) NOT NULL
                );
            `);
            await query(`
                CREATE TABLE IF NOT EXISTS attempts (
                    id SERIAL PRIMARY KEY,
                    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                    type VARCHAR(20) NOT NULL,
                    question_id VARCHAR(100) NOT NULL,
                    user_input TEXT NOT NULL,
                    score INTEGER NOT NULL,
                    max_score INTEGER NOT NULL,
                    feedback TEXT,
                    date VARCHAR(100) NOT NULL
                );
            `);
        } else {
            // SQLite table schemas
            await query(`
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT UNIQUE NOT NULL,
                    password TEXT NOT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                );
            `);
            await query(`
                CREATE TABLE IF NOT EXISTS vocab_progress (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL,
                    topic_id TEXT NOT NULL,
                    mastered_words TEXT DEFAULT '[]',
                    learning_words TEXT DEFAULT '[]',
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    UNIQUE(user_id, topic_id),
                    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
                );
            `);
            await query(`
                CREATE TABLE IF NOT EXISTS test_results (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL,
                    test_id TEXT NOT NULL,
                    score INTEGER NOT NULL,
                    total INTEGER NOT NULL,
                    percentage INTEGER NOT NULL,
                    date TEXT NOT NULL,
                    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
                );
            `);
            await query(`
                CREATE TABLE IF NOT EXISTS attempts (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL,
                    type TEXT NOT NULL,
                    question_id TEXT NOT NULL,
                    user_input TEXT NOT NULL,
                    score INTEGER NOT NULL,
                    max_score INTEGER NOT NULL,
                    feedback TEXT,
                    date TEXT NOT NULL,
                    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
                );
            `);
        }
        console.log('Database tables verified/created successfully.');
    } catch (err) {
        console.error('Error creating database tables:', err.message);
        throw err;
    }
}

module.exports = {
    query,
    initDb
};
