// Frontend Authentication and Synchronization Controller

const authState = {
    token: localStorage.getItem('toeic_jwt_token') || null,
    user: null,
    testResults: [],
    attempts: []
};

// Check auth status on load
document.addEventListener('DOMContentLoaded', () => {
    initAuthUI();
    checkAuthStatus();
});

// Get authorization headers for fetch requests
function getAuthHeader() {
    if (authState.token) {
        return { 'Authorization': `Bearer ${authState.token}` };
    }
    return {};
}

// Check current session
async function checkAuthStatus() {
    if (!authState.token) {
        updateHeaderUserUI();
        return;
    }

    try {
        const res = await fetch('/api/auth/me', {
            headers: getAuthHeader()
        });

        if (res.ok) {
            const data = await res.json();
            authState.user = data.user;
            updateHeaderUserUI();
            
            // Sync vocabulary and load history
            syncVocabProgressFromBackend();
            loadPracticeHistory();
        } else {
            // Token expired or invalid
            logoutUser();
        }
    } catch (err) {
        console.error('Auth check error:', err);
        updateHeaderUserUI(); // Offline or server down, fallback to guest
    }
}

// Update login status in header
function updateHeaderUserUI() {
    const userContainer = document.getElementById('user-profile-container');
    if (!userContainer) return;

    if (authState.user) {
        // Logged In State
        userContainer.innerHTML = `
            <div class="user-profile-dropdown" style="position: relative; display: inline-block;">
                <button class="user-btn" style="background: var(--primary-gradient); color: white; border: none; padding: 8px 16px; border-radius: 20px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                    👤 ${authState.user.username} ▾
                </button>
                <div class="dropdown-menu hidden" style="position: absolute; right: 0; top: 100%; margin-top: 5px; background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-md); box-shadow: var(--shadow-lg); min-width: 150px; z-index: 1000; overflow: hidden;">
                    <button id="btn-show-history" style="width: 100%; text-align: left; background: none; border: none; padding: 10px 15px; color: var(--color-text-primary); cursor: pointer; font-size: 0.95rem; font-family: var(--font-family); transition: background var(--transition-base);">📊 Lịch sử học</button>
                    <button id="btn-logout" style="width: 100%; text-align: left; background: none; border: none; padding: 10px 15px; color: var(--color-error); cursor: pointer; font-size: 0.95rem; font-family: var(--font-family); border-top: 1px solid var(--color-border); transition: background var(--transition-base);">🚪 Đăng xuất</button>
                </div>
            </div>
        `;

        // Bind dropdown toggles
        const btn = userContainer.querySelector('.user-btn');
        const menu = userContainer.querySelector('.dropdown-menu');
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('hidden');
        });

        document.addEventListener('click', () => {
            menu.classList.add('hidden');
        });

        userContainer.querySelector('#btn-show-history').addEventListener('click', () => {
            showHistoryDashboard();
        });

        userContainer.querySelector('#btn-logout').addEventListener('click', () => {
            logoutUser();
        });

        // Show learning history dashboard on Homepage
        const dashboard = document.getElementById('history-dashboard-section');
        if (dashboard) dashboard.classList.remove('hidden');

    } else {
        // Guest / Logged Out State
        userContainer.innerHTML = `
            <button class="action-btn primary" id="btn-show-login" style="padding: 8px 16px; font-size: var(--font-size-sm); border-radius: 20px; background: var(--primary-gradient);">
                🔑 Đăng nhập
            </button>
        `;

        userContainer.querySelector('#btn-show-login').addEventListener('click', () => {
            showModal('login-modal');
        });

        // Hide learning history dashboard on Homepage
        const dashboard = document.getElementById('history-dashboard-section');
        if (dashboard) dashboard.classList.add('hidden');
    }
}

// Initialize Authentication UI Modals
function initAuthUI() {
    // Insert Account Profile container inside the Header Content (on the right)
    const headerContent = document.querySelector('.header-content');
    if (headerContent && !document.getElementById('user-profile-container')) {
        const profileDiv = document.createElement('div');
        profileDiv.id = 'user-profile-container';
        profileDiv.style.marginLeft = 'auto';
        profileDiv.style.display = 'flex';
        profileDiv.style.alignItems = 'center';
        
        // Find existing header-stats and insert before it
        const headerStats = headerContent.querySelector('.header-stats');
        if (headerStats) {
            headerContent.insertBefore(profileDiv, headerStats);
        } else {
            headerContent.appendChild(profileDiv);
        }
    }

    // Bind login/register forms
    document.getElementById('login-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        await loginUser(username, password);
    });

    document.getElementById('register-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;

        if (password !== confirmPassword) {
            showAuthError('register-error', 'Mật khẩu xác nhận không khớp.');
            return;
        }

        await registerUser(username, password);
    });

    // Close modals
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
            hideModals();
        });
    });

    // Toggle links between Login & Register Modals
    document.getElementById('link-to-register')?.addEventListener('click', (e) => {
        e.preventDefault();
        hideModals();
        showModal('register-modal');
    });

    document.getElementById('link-to-login')?.addEventListener('click', (e) => {
        e.preventDefault();
        hideModals();
        showModal('login-modal');
    });
}

// User Actions
async function loginUser(username, password) {
    const errorId = 'login-error';
    clearAuthError(errorId);

    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('toeic_jwt_token', data.token);
            authState.token = data.token;
            authState.user = data.user;
            hideModals();
            updateHeaderUserUI();
            
            // Sync data
            await syncVocabProgressFromBackend();
            await loadPracticeHistory();
            
            alert('Đăng nhập thành công!');
        } else {
            showAuthError(errorId, data.error || 'Đăng nhập thất bại.');
        }
    } catch (err) {
        showAuthError(errorId, 'Lỗi kết nối tới máy chủ.');
    }
}

async function registerUser(username, password) {
    const errorId = 'register-error';
    clearAuthError(errorId);

    try {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('toeic_jwt_token', data.token);
            authState.token = data.token;
            authState.user = data.user;
            hideModals();
            updateHeaderUserUI();
            
            // Sync local progress to DB
            await uploadLocalProgressToBackend();
            await loadPracticeHistory();

            alert('Đăng ký tài khoản thành công!');
        } else {
            showAuthError(errorId, data.error || 'Đăng ký thất bại.');
        }
    } catch (err) {
        showAuthError(errorId, 'Lỗi kết nối tới máy chủ.');
    }
}

function logoutUser() {
    localStorage.removeItem('toeic_jwt_token');
    authState.token = null;
    authState.user = null;
    authState.testResults = [];
    authState.attempts = [];
    updateHeaderUserUI();
    
    // Reload local vocabulary status in memory
    if (typeof loadProgress === 'function') {
        loadProgress();
    }
    
    // Hide dashboard
    const listContainer = document.getElementById('history-list');
    if (listContainer) listContainer.innerHTML = '';
}

// Modal Helpers
function showModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = 'flex';
}

function hideModals() {
    document.querySelectorAll('.auth-modal-overlay').forEach(m => {
        m.style.display = 'none';
    });
}

function showAuthError(elementId, message) {
    const el = document.getElementById(elementId);
    if (el) {
        el.textContent = message;
        el.style.display = 'block';
    }
}

function clearAuthError(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
        el.textContent = '';
        el.style.display = 'none';
    }
}


// ============================================
// DATA SYNCHRONIZATION
// ============================================

// Sync progress from server DB to local app memory
async function syncVocabProgressFromBackend() {
    if (!authState.user) return;

    try {
        const res = await fetch('/api/progress', {
            headers: getAuthHeader()
        });

        if (res.ok) {
            const data = await res.json();
            
            // Find the row for all vocabulary
            const vocabRow = data.progress && data.progress.find(item => item.topic_id === 'all_vocab');
            
            if (vocabRow) {
                localStorage.setItem('toeic_progress', vocabRow.mastered_words);

                // Update UI by calling global loadProgress from app.js
                if (typeof loadProgress === 'function') {
                    loadProgress();
                }
            } else {
                // If backend has no data, upload whatever we have locally
                uploadLocalProgressToBackend();
            }
        }
    } catch (err) {
        console.error('Failed to sync progress from backend:', err);
    }
}

// Upload local localStorage progress to database
async function uploadLocalProgressToBackend() {
    if (!authState.user) return;

    const progressData = localStorage.getItem('toeic_progress');
    if (!progressData) return;

    try {
        await fetch('/api/progress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader()
            },
            body: JSON.stringify({
                topic_id: 'all_vocab',
                mastered_words: progressData,
                learning_words: '{}'
            })
        });
    } catch (err) {
        console.error('Error uploading vocabulary progress to backend:', err);
    }
}



// ============================================
// PRACTICE HISTORY DASHBOARD
// ============================================

async function loadPracticeHistory() {
    if (!authState.user) return;

    try {
        const res = await fetch('/api/results', {
            headers: getAuthHeader()
        });

        if (res.ok) {
            const data = await res.json();
            authState.testResults = data.testResults || [];
            authState.attempts = data.attempts || [];

            renderHistoryDashboard();
        }
    } catch (err) {
        console.error('Failed to load practice history:', err);
    }
}

function renderHistoryDashboard() {
    const listContainer = document.getElementById('history-list');
    if (!listContainer) return;

    listContainer.innerHTML = '';

    if (authState.testResults.length === 0 && authState.attempts.length === 0) {
        listContainer.innerHTML = `
            <div style="text-align: center; color: var(--color-text-secondary); padding: var(--spacing-xl);">
                Bạn chưa làm bài luyện tập nào. Bắt đầu học và làm thi thử ngay! 🚀
            </div>
        `;
        return;
    }

    // Combine and sort by date/ID
    const allHistory = [];

    authState.testResults.forEach(r => {
        allHistory.push({
            id: r.id,
            rawItem: r,
            category: 'test',
            title: `Đề thi trắc nghiệm: ${r.test_id}`,
            score: `${r.score}/${r.total}`,
            badge: `${r.percentage}%`,
            badgeClass: r.percentage >= 75 ? 'success' : (r.percentage >= 50 ? 'warning' : 'error'),
            date: r.date
        });
    });

    authState.attempts.forEach(a => {
        const isSpeaking = a.type === 'speaking';
        allHistory.push({
            id: a.id,
            rawItem: a,
            category: 'attempt',
            title: `${isSpeaking ? '🗣️' : '✍️'} Luyện ${isSpeaking ? 'Speaking' : 'Writing'}: ${a.question_id}`,
            score: `${a.score}/${a.max_score}`,
            badge: isSpeaking ? 'Speaking' : 'Writing',
            badgeClass: isSpeaking ? 'primary' : 'accent',
            date: a.date,
            feedback: a.feedback
        });
    });

    // Sort by date descending (we use simple local-based sort or reverse insertion order since backend returned descending)
    // Both API queries returned id DESC. If we want a strict date sort, we can sort them.
    allHistory.sort((a, b) => new Date(b.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1')) - new Date(a.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1')) || b.id - a.id);

    allHistory.forEach(item => {
        const row = document.createElement('div');
        row.className = 'history-row';
        row.style.display = 'flex';
        row.style.justifyContent = 'space-between';
        row.style.alignItems = 'center';
        row.style.padding = '12px 16px';
        row.style.borderBottom = '1px solid var(--color-border)';
        row.style.gap = '10px';

        row.innerHTML = `
            <div style="flex: 1;">
                <div style="font-weight: 600; font-size: 0.95rem; color: var(--color-text-primary);">${item.title}</div>
                <div style="font-size: 0.8rem; color: var(--color-text-secondary); margin-top: 3px;">⏱️ ${item.date}</div>
            </div>
            
            <div style="display: flex; align-items: center; gap: 15px;">
                <div style="font-weight: 700; font-size: 1.1rem; color: var(--color-text-primary);">${item.score}</div>
                <span class="status-badge ${item.badgeClass}" style="padding: 4px 10px; border-radius: 12px; font-size: 0.75rem; font-weight: 700;">
                    ${item.badge}
                </span>
                ${item.category === 'attempt' ? `
                    <button class="action-btn secondary btn-view-feedback" style="padding: 5px 10px; font-size: 0.8rem; margin: 0;">
                        Xem nhận xét
                    </button>
                ` : ''}
            </div>
        `;

        if (item.category === 'attempt') {
            row.querySelector('.btn-view-feedback').addEventListener('click', () => {
                alert(`--- NHẬN XÉT CỦA GIÁO VIÊN AI ---\n\nĐiểm số: ${item.score}\n\n${item.feedback}`);
            });
        }

        listContainer.appendChild(row);
    });
}

function showHistoryDashboard() {
    // Navigate back to Home and scroll to history dashboard
    navigateTo('home-screen');
    const dashboard = document.getElementById('history-dashboard-section');
    if (dashboard) {
        dashboard.scrollIntoView({ behavior: 'smooth' });
        
        // Brief highlight animation
        dashboard.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.4)';
        setTimeout(() => {
            dashboard.style.boxShadow = 'none';
        }, 1500);
    }
}
