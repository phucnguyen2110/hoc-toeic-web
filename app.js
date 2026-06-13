// ============================================
// STATE MANAGEMENT
// ============================================

const state = {
    currentScreen: 'home-screen',
    currentTopic: null,
    currentCardIndex: 0,
    flashcardHistory: {},
    currentQuiz: null,
    quizCurrentQuestion: 0,
    quizScore: 0,
    progress: {
        mastered: 0,
        learning: 0,
        total: 0
    }
};

// ============================================
// LOCAL STORAGE
// ============================================

function loadProgress() {
    const saved = localStorage.getItem('toeic_progress');
    if (saved) {
        const data = JSON.parse(saved);
        state.flashcardHistory = data.flashcardHistory || {};
        updateProgressStats();
    }
}

function saveProgress() {
    const data = {
        flashcardHistory: state.flashcardHistory,
        lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('toeic_progress', JSON.stringify(data));
    updateProgressStats();
    
    // Sync to backend database if logged in
    if (typeof uploadLocalProgressToBackend === 'function') {
        uploadLocalProgressToBackend();
    }
}

// ============================================
// PROGRESS TRACKING
// ============================================

function updateProgressStats() {
    const totalWords = getTotalWordCount();
    let mastered = 0;
    let learning = 0;

    Object.values(state.flashcardHistory).forEach(status => {
        if (status === 'mastered') mastered++;
        else if (status === 'learning') learning++;
    });

    state.progress = {
        mastered,
        learning,
        total: totalWords
    };

    // Update UI
    const masteredEl = document.getElementById('mastered-words');
    const learningEl = document.getElementById('learning-words');
    const remainingEl = document.getElementById('remaining-words');
    const progressBar = document.getElementById('progress-bar');
    const progressValue = document.getElementById('progress-value');
    const totalProgress = document.getElementById('total-progress');

    if (masteredEl) masteredEl.textContent = mastered;
    if (learningEl) learningEl.textContent = learning;
    if (remainingEl) remainingEl.textContent = totalWords - mastered - learning;

    const percentage = Math.round((mastered / totalWords) * 100);
    if (progressBar) progressBar.style.width = `${percentage}%`;
    if (progressValue) progressValue.textContent = `${percentage}%`;
    if (totalProgress) totalProgress.textContent = `${mastered}/${totalWords} từ`;
}

// ============================================
// NAVIGATION
// ============================================

function navigateTo(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        state.currentScreen = screenId;
    }

    // Update bottom nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.screen === screenId) {
            item.classList.add('active');
        }
    });
}

// ============================================
// HOME SCREEN
// ============================================

function renderTopics() {
    const topicsGrid = document.getElementById('topics-grid');
    if (!topicsGrid) return;

    topicsGrid.innerHTML = '';

    vocabularyData.topics.forEach(topic => {
        const learned = topic.words.filter(word =>
            state.flashcardHistory[`${topic.id}_${word.word}`] === 'mastered'
        ).length;
        const progress = Math.round((learned / topic.words.length) * 100);

        const card = document.createElement('div');
        card.className = 'topic-card';
        card.innerHTML = `
            <div class="topic-icon">${topic.icon}</div>
            <h4>${topic.name}</h4>
            <p class="topic-description">${topic.description}</p>
            <div class="topic-stats">
                <span>${topic.words.length} từ</span>
                <div class="topic-progress">
                    <div class="topic-progress-bar">
                        <div class="topic-progress-fill" style="width: ${progress}%"></div>
                    </div>
                    <span>${progress}%</span>
                </div>
            </div>
        `;

        card.addEventListener('click', () => startFlashcards(topic.id));
        topicsGrid.appendChild(card);
    });
}

// ============================================
// FLASHCARD SCREEN
// ============================================

function startFlashcards(topicId) {
    const topic = getTopicById(topicId);
    if (!topic) return;

    state.currentTopic = topic;
    state.currentCardIndex = 0;

    // Update header
    document.getElementById('flashcard-topic-title').textContent = topic.name;
    document.getElementById('total-cards').textContent = topic.words.length;

    // Render first card
    renderFlashcard();
    renderProgressDots();

    // Navigate to flashcard screen
    navigateTo('flashcard-screen');
}

function renderFlashcard() {
    if (!state.currentTopic) return;

    const word = state.currentTopic.words[state.currentCardIndex];
    const flashcard = document.getElementById('flashcard');

    // Update card counter
    document.getElementById('current-card').textContent = state.currentCardIndex + 1;

    // Update front
    document.getElementById('word-type').textContent = word.type;
    document.getElementById('word').textContent = word.word;

    // Update back
    document.getElementById('word-back').textContent = word.word;
    document.getElementById('pronunciation').textContent = word.pronunciation;
    document.getElementById('meaning').textContent = word.meaning;
    document.getElementById('example').textContent = word.example;

    // Reset flip state
    flashcard.classList.remove('flipped');
}

function renderProgressDots() {
    const dotsContainer = document.getElementById('progress-dots');
    if (!dotsContainer || !state.currentTopic) return;

    dotsContainer.innerHTML = '';

    state.currentTopic.words.forEach((word, index) => {
        const dot = document.createElement('div');
        dot.className = 'progress-dot';

        const wordKey = `${state.currentTopic.id}_${word.word}`;
        const status = state.flashcardHistory[wordKey];

        if (status === 'mastered') dot.classList.add('mastered');
        else if (status === 'learning') dot.classList.add('learning');

        if (index === state.currentCardIndex) {
            dot.classList.add('current');
        }

        dotsContainer.appendChild(dot);
    });
}

function nextCard(status) {
    if (!state.currentTopic) return;

    // Save status
    const word = state.currentTopic.words[state.currentCardIndex];
    const wordKey = `${state.currentTopic.id}_${word.word}`;
    state.flashcardHistory[wordKey] = status;
    saveProgress();

    // Move to next card or finish
    if (state.currentCardIndex < state.currentTopic.words.length - 1) {
        state.currentCardIndex++;
        renderFlashcard();
        renderProgressDots();
    } else {
        // Topic completed
        showTopicCompletion();
    }
}

function showTopicCompletion() {
    alert(`🎉 Chúc mừng! Bạn đã hoàn thành chủ đề "${state.currentTopic.name}"!\n\nTiếp tục phát huy nhé! 💪`);
    navigateTo('home-screen');
}

// ============================================
// QUIZ SCREEN
// ============================================

function startQuiz(topicId = null) {
    let quizWords;
    let quizTitle;

    if (topicId) {
        const topic = getTopicById(topicId);
        if (!topic) return;
        quizWords = [...topic.words].sort(() => Math.random() - 0.5).slice(0, 10);
        quizTitle = `Quiz: ${topic.name}`;
    } else {
        quizWords = getRandomWords(10);
        quizTitle = 'Quiz ngẫu nhiên';
    }

    state.currentQuiz = quizWords;
    state.quizCurrentQuestion = 0;
    state.quizScore = 0;

    document.getElementById('quiz-topic-title').textContent = quizTitle;
    document.getElementById('quiz-total').textContent = quizWords.length;

    // Hide completion screen
    document.getElementById('quiz-completion').classList.add('hidden');

    renderQuizQuestion();
    navigateTo('quiz-screen');
}

function renderQuizQuestion() {
    if (!state.currentQuiz) return;

    const question = state.currentQuiz[state.quizCurrentQuestion];
    const correctAnswer = question.meaning;

    // Get 3 random wrong answers
    const allWords = [];
    vocabularyData.topics.forEach(topic => {
        topic.words.forEach(word => {
            if (word.word !== question.word) {
                allWords.push(word.meaning);
            }
        });
    });

    const wrongAnswers = allWords
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

    // Combine and shuffle
    const options = [correctAnswer, ...wrongAnswers]
        .sort(() => Math.random() - 0.5);

    // Update UI
    document.getElementById('question-number').textContent = state.quizCurrentQuestion + 1;
    document.getElementById('question-text').textContent = 'Nghĩa của từ này là gì?';
    document.getElementById('question-word').textContent = question.word;
    document.getElementById('quiz-score').textContent = state.quizScore;

    // Render options
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option, correctAnswer));
        optionsContainer.appendChild(button);
    });

    // Hide result
    document.getElementById('quiz-result').classList.add('hidden');
}

function checkAnswer(selected, correct) {
    const isCorrect = selected === correct;

    if (isCorrect) {
        state.quizScore++;
        document.getElementById('quiz-score').textContent = state.quizScore;
    }

    // Disable all options
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === correct) {
            btn.classList.add('correct');
        } else if (btn.textContent === selected && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });

    // Show result
    const resultDiv = document.getElementById('quiz-result');
    const resultIcon = document.getElementById('result-icon');
    const resultTitle = document.getElementById('result-title');
    const resultExplanation = document.getElementById('result-explanation');

    if (isCorrect) {
        resultIcon.textContent = '✓';
        resultIcon.style.color = '#10b981';
        resultTitle.textContent = 'Chính xác!';
    } else {
        resultIcon.textContent = '✗';
        resultIcon.style.color = '#ef4444';
        resultTitle.textContent = 'Chưa đúng!';
    }

    const currentWord = state.currentQuiz[state.quizCurrentQuestion];
    resultExplanation.textContent = `${currentWord.word} (${currentWord.type}) nghĩa là: ${currentWord.meaning}`;

    resultDiv.classList.remove('hidden');
}

function nextQuestion() {
    if (state.quizCurrentQuestion < state.currentQuiz.length - 1) {
        state.quizCurrentQuestion++;
        renderQuizQuestion();
    } else {
        showQuizCompletion();
    }
}

function showQuizCompletion() {
    const score = state.quizScore;
    const total = state.currentQuiz.length;
    const percentage = Math.round((score / total) * 100);

    document.getElementById('final-score').textContent = score;
    document.querySelector('.score-total').textContent = `/${total}`;

    let message = '';
    if (percentage >= 90) {
        message = 'Xuất sắc! 🌟 Bạn là cao thủ từ vựng!';
    } else if (percentage >= 70) {
        message = 'Tuyệt vời! 🎉 Tiếp tục phát huy!';
    } else if (percentage >= 50) {
        message = 'Khá tốt! 👍 Cố gắng thêm nhé!';
    } else {
        message = 'Đừng bỏ cuộc! 💪 Hãy ôn lại và thử lại!';
    }

    document.getElementById('completion-message').textContent = message;
    document.getElementById('quiz-completion').classList.remove('hidden');
}

// ============================================
// EVENT LISTENERS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Load saved progress
    loadProgress();

    // Render home screen
    renderTopics();
    updateProgressStats();

    // Bottom navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const screenId = item.dataset.screen;

            // If navigating to quiz screen, start a random quiz
            if (screenId === 'quiz-screen') {
                startQuiz(); // This will call navigateTo internally
            } else {
                navigateTo(screenId);
            }
        });
    });

    // Back buttons
    document.getElementById('back-from-flashcard')?.addEventListener('click', () => {
        navigateTo('home-screen');
    });

    document.getElementById('back-from-quiz')?.addEventListener('click', () => {
        navigateTo('home-screen');
    });

    // Flashcard flip
    document.getElementById('flashcard')?.addEventListener('click', function () {
        this.classList.toggle('flipped');
    });

    // Flashcard action buttons
    document.getElementById('know-btn')?.addEventListener('click', () => {
        nextCard('mastered');
    });

    document.getElementById('learning-btn')?.addEventListener('click', () => {
        nextCard('learning');
    });

    document.getElementById('unknown-btn')?.addEventListener('click', () => {
        nextCard('unknown');
    });

    // Quiz buttons
    document.getElementById('next-question-btn')?.addEventListener('click', () => {
        nextQuestion();
    });

    document.getElementById('retry-quiz')?.addEventListener('click', () => {
        startQuiz();
    });

    document.getElementById('back-home-from-quiz')?.addEventListener('click', () => {
        navigateTo('home-screen');
    });

    // Quick action buttons
    document.getElementById('continue-learning')?.addEventListener('click', () => {
        // Find first topic with unfinished words
        for (let topic of vocabularyData.topics) {
            const unfinished = topic.words.some(word => {
                const wordKey = `${topic.id}_${word.word}`;
                return !state.flashcardHistory[wordKey] || state.flashcardHistory[wordKey] !== 'mastered';
            });

            if (unfinished) {
                startFlashcards(topic.id);
                return;
            }
        }

        // If all completed, start from first topic
        startFlashcards(vocabularyData.topics[0].id);
    });

    document.getElementById('random-quiz')?.addEventListener('click', () => {
        startQuiz();
    });

    // Prevent double-tap zoom on mobile
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (event) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
    // Only in flashcard screen
    if (state.currentScreen === 'flashcard-screen') {
        if (e.key === ' ') {
            e.preventDefault();
            document.getElementById('flashcard').classList.toggle('flipped');
        } else if (e.key === '1') {
            nextCard('mastered');
        } else if (e.key === '2') {
            nextCard('learning');
        } else if (e.key === '3') {
            nextCard('unknown');
        }
    }

    // Quiz screen shortcuts
    if (state.currentScreen === 'quiz-screen') {
        if (e.key >= '1' && e.key <= '4') {
            const index = parseInt(e.key) - 1;
            const options = document.querySelectorAll('.option-btn');
            if (options[index] && !options[index].disabled) {
                options[index].click();
            }
        }
    }
});
