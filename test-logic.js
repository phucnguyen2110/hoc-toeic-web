// ============================================
// PRACTICE TEST STATE
// ============================================

const testState = {
    currentTest: null,
    currentQuestionIndex: 0,
    userAnswers: [],
    startTime: null,
    timeRemaining: 0,
    timerInterval: null
};

// ============================================
// PRACTICE TEST FUNCTIONS
// ============================================

function startPracticeTest(testId) {
    const test = getFullTestById(testId); // Changed from getTestById
    if (!test) return;

    testState.currentTest = test;
    testState.currentQuestionIndex = 0;
    testState.userAnswers = [];
    testState.startTime = Date.now();
    testState.timeRemaining = test.duration * 60; // Convert to seconds

    // Flatten all questions from all sections
    testState.allQuestions = [];
    test.sections.forEach(section => {
        if (section.questions) {
            section.questions.forEach(q => {
                testState.allQuestions.push({
                    ...q,
                    sectionId: section.id,
                    sectionName: section.name
                });
            });
        }
        if (section.passages) {
            section.passages.forEach(passage => {
                // Determine passage text based on structure
                let passageText = '';
                let passageTitle = passage.title || '';

                if (passage.text) {
                    // Single passage: has direct text property
                    passageText = passage.text;
                } else if (passage.passages && Array.isArray(passage.passages)) {
                    // Double/Triple passage: has passages array
                    passageText = passage.passages.map(p => {
                        let text = '';
                        if (p.title) {
                            text += `<div style="font-weight: 700; color: var(--color-primary); margin-bottom: 1rem;">${p.title}</div>`;
                        }
                        text += p.text;
                        return text;
                    }).join('<div style="border-top: 2px dashed var(--color-border); margin: 2rem 0; padding-top: 2rem;"></div>');
                }

                // Add each question with the passage text
                passage.questions.forEach(q => {
                    testState.allQuestions.push({
                        ...q,
                        sectionId: section.id,
                        sectionName: section.name,
                        passageText: passageText,
                        passageTitle: passageTitle
                    });
                });
            });
        }
    });

    // Initialize user answers array
    testState.userAnswers = new Array(testState.allQuestions.length).fill(null);

    // Show test taking screen
    document.getElementById('test-selection').classList.add('hidden');
    document.getElementById('test-taking').classList.remove('hidden');
    document.getElementById('test-results').classList.add('hidden');

    // Update test info
    document.getElementById('test-name').textContent = test.name;

    // Start timer
    startTestTimer();

    // Render first question
    renderTestQuestion();
    renderQuestionPalette();
}

function renderTestQuestion() {
    const question = testState.allQuestions[testState.currentQuestionIndex];
    const display = document.getElementById('test-question-display');
    const passageColumn = document.getElementById('test-passage-column');

    // Update progress
    document.getElementById('test-question-count').textContent =
        `Câu ${testState.currentQuestionIndex + 1}/${testState.allQuestions.length}`;

    // Render passage in left column (if exists)
    if (question.passageText) {
        passageColumn.innerHTML = `
            ${question.passageTitle ? `<div class="passage-title">${question.passageTitle}</div>` : ''}
            <div class="passage-text">${question.passageText}</div>
        `;
    } else {
        passageColumn.innerHTML = '';
    }

    // Render question in right column
    let html = '';

    // Show question text
    if (question.question) {
        html += `<div class="test-question-text">${question.question}</div>`;
    } else if (question.questionNumber) {
        html += `<div class="test-question-text">Câu ${question.questionNumber}</div>`;
    }

    // Show options
    html += '<div class="test-options">';
    question.options.forEach((option, index) => {
        const isSelected = testState.userAnswers[testState.currentQuestionIndex] === index;
        html += `
            <div class="test-option ${isSelected ? 'selected' : ''}" data-option-index="${index}">
                ${String.fromCharCode(65 + index)}. ${option}
            </div>
        `;
    });
    html += '</div>';

    display.innerHTML = html;

    // Add click listeners to options
    document.querySelectorAll('.test-option').forEach(option => {
        option.addEventListener('click', function () {
            const optionIndex = parseInt(this.dataset.optionIndex);
            selectTestOption(optionIndex);
        });
    });

    // Update navigation buttons
    document.getElementById('prev-test-question').disabled = testState.currentQuestionIndex === 0;
    document.getElementById('next-test-question').disabled = false;

    // Update palette
    updateQuestionPalette();
}

function selectTestOption(optionIndex) {
    testState.userAnswers[testState.currentQuestionIndex] = optionIndex;

    // Update UI
    document.querySelectorAll('.test-option').forEach((opt, idx) => {
        if (idx === optionIndex) {
            opt.classList.add('selected');
        } else {
            opt.classList.remove('selected');
        }
    });

    // Update palette to show question is answered
    updateQuestionPalette();
}

function nextTestQuestion() {
    if (testState.currentQuestionIndex < testState.allQuestions.length - 1) {
        testState.currentQuestionIndex++;
        renderTestQuestion();
    }
}

function prevTestQuestion() {
    if (testState.currentQuestionIndex > 0) {
        testState.currentQuestionIndex--;
        renderTestQuestion();
    }
}

function startTestTimer() {
    if (testState.timerInterval) {
        clearInterval(testState.timerInterval);
    }

    updateTimerDisplay();

    testState.timerInterval = setInterval(() => {
        testState.timeRemaining--;
        updateTimerDisplay();

        if (testState.timeRemaining <= 0) {
            clearInterval(testState.timerInterval);
            submitTest(true); // Auto submit when time is up
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(testState.timeRemaining / 60);
    const seconds = testState.timeRemaining % 60;
    const display = `⏱️ ${minutes}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('test-timer').textContent = display;

    // Change color when time is running out
    const timerEl = document.getElementById('test-timer');
    if (testState.timeRemaining < 300) { // Less than 5 minutes
        timerEl.style.color = '#ef4444'; // Red
    } else if (testState.timeRemaining < 600) { // Less than 10 minutes
        timerEl.style.color = '#f59e0b'; // Orange
    }
}

function submitTest(autoSubmit = false) {
    if (!autoSubmit) {
        const unanswered = testState.userAnswers.filter(a => a === null).length;
        if (unanswered > 0) {
            const confirm = window.confirm(`Bạn còn ${unanswered} câu chưa trả lời. Bạn có chắc muốn nộp bài?`);
            if (!confirm) return;
        }
    }

    // Stop timer
    if (testState.timerInterval) {
        clearInterval(testState.timerInterval);
    }

    // Calculate score
    let totalScore = 0;
    const sectionScores = {
        part5: { correct: 0, total: 0 },
        part6: { correct: 0, total: 0 },
        part7: { correct: 0, total: 0 }
    };

    testState.allQuestions.forEach((question, index) => {
        const userAnswer = testState.userAnswers[index];
        const isCorrect = userAnswer === question.correctAnswer;

        if (isCorrect) {
            totalScore++;
        }

        // Track by section
        const sectionKey = question.sectionId;
        if (sectionScores[sectionKey]) {
            sectionScores[sectionKey].total++;
            if (isCorrect) {
                sectionScores[sectionKey].correct++;
            }
        }
    });

    // Show results
    showTestResults(totalScore, testState.allQuestions.length, sectionScores);
}

function showTestResults(score, total, sectionScores) {
    // Hide test taking, show results
    document.getElementById('test-taking').classList.add('hidden');
    document.getElementById('test-results').classList.remove('hidden');

    const percentage = Math.round((score / total) * 100);

    // Update score display
    document.getElementById('test-score').textContent = score;
    document.querySelector('#test-results .score-total').textContent = `/${total}`;
    document.getElementById('test-percentage').textContent = `${percentage}%`;

    // Update section scores
    document.getElementById('part5-score').textContent =
        `${sectionScores.part5.correct}/${sectionScores.part5.total}`;
    document.getElementById('part6-score').textContent =
        `${sectionScores.part6.correct}/${sectionScores.part6.total}`;
    document.getElementById('part7-score').textContent =
        `${sectionScores.part7.correct}/${sectionScores.part7.total}`;

    // Update message
    let message = '';
    if (percentage >= 90) {
        message = 'Xuất sắc! 🌟 Bạn đã làm rất tốt!';
    } else if (percentage >= 75) {
        message = 'Tuyệt vời! 🎉 Bạn đang tiến bộ vượt bậc!';
    } else if (percentage >= 60) {
        message = 'Khá tốt! 👍 Tiếp tục luyện tập nhé!';
    } else {
        message = 'Đừng nản lòng! 💪 Hãy ôn lại và thử lại!';
    }

    document.getElementById('test-message').textContent = message;
}

function retryCurrentTest() {
    if (testState.currentTest) {
        startPracticeTest(testState.currentTest.id);
    }
}

function exitTest() {
    if (testState.timerInterval) {
        clearInterval(testState.timerInterval);
    }

    const confirm = window.confirm('Bạn có chắc muốn thoát? Tiến độ làm bài sẽ không được lưu.');
    if (confirm) {
        document.getElementById('test-taking').classList.add('hidden');
        document.getElementById('test-selection').classList.remove('hidden');
    } else {
        // Resume timer if they cancel
        startTestTimer();
    }
}

// ============================================
// PRACTICE TEST EVENT LISTENERS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Practice test button
    document.getElementById('practice-test')?.addEventListener('click', () => {
        navigateTo('test-screen');
    });

    // Back from test selection
    document.getElementById('back-from-test-selection')?.addEventListener('click', () => {
        navigateTo('home-screen');
    });

    // Start test button
    document.querySelectorAll('.start-test-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const testCard = this.closest('.test-card');
            const testId = testCard.dataset.testId;
            startPracticeTest(testId);
        });
    });

    // Test navigation
    document.getElementById('prev-test-question')?.addEventListener('click', prevTestQuestion);
    document.getElementById('next-test-question')?.addEventListener('click', nextTestQuestion);

    // Submit test
    document.getElementById('submit-test')?.addEventListener('click', () => submitTest(false));

    // Exit test
    document.getElementById('exit-test')?.addEventListener('click', exitTest);

    // Results actions
    document.getElementById('retry-test')?.addEventListener('click', retryCurrentTest);
    document.getElementById('back-home-from-test')?.addEventListener('click', () => {
        navigateTo('home-screen');
    });

    document.getElementById('review-test')?.addEventListener('click', () => {
        showReviewScreen();
    });

    document.getElementById('back-from-review')?.addEventListener('click', () => {
        document.getElementById('test-review').classList.add('hidden');
        document.getElementById('test-results').classList.remove('hidden');
    });
});

// ============================================
// QUESTION PALETTE FUNCTIONS
// ============================================

function renderQuestionPalette() {
    const paletteGrid = document.getElementById('question-palette-grid');
    if (!paletteGrid) return;

    paletteGrid.innerHTML = '';

    // Group questions by section (Part)
    const sections = {};
    testState.allQuestions.forEach((question, index) => {
        const sectionName = question.sectionName || 'Questions';
        if (!sections[sectionName]) {
            sections[sectionName] = [];
        }
        sections[sectionName].push({ question, index });
    });

    // Render each section
    Object.keys(sections).forEach(sectionName => {
        const partDiv = document.createElement('div');
        partDiv.className = 'palette-part';

        const partTitle = document.createElement('div');
        partTitle.className = 'palette-part-title';
        partTitle.textContent = sectionName;
        partDiv.appendChild(partTitle);

        const questionsDiv = document.createElement('div');
        questionsDiv.className = 'palette-part-questions';

        sections[sectionName].forEach(({ question, index }) => {
            const btn = document.createElement('button');
            btn.className = 'palette-question-btn';
            btn.textContent = index + 1;
            btn.dataset.questionIndex = index;

            if (index === testState.currentQuestionIndex) {
                btn.classList.add('current');
            } else if (testState.userAnswers[index] !== null) {
                btn.classList.add('answered');
            }

            btn.addEventListener('click', () => {
                goToQuestion(index);
            });

            questionsDiv.appendChild(btn);
        });

        partDiv.appendChild(questionsDiv);
        paletteGrid.appendChild(partDiv);
    });
}

function updateQuestionPalette() {
    const buttons = document.querySelectorAll('.palette-question-btn');
    buttons.forEach((btn, index) => {
        btn.classList.remove('current', 'answered');

        if (index === testState.currentQuestionIndex) {
            btn.classList.add('current');
        } else if (testState.userAnswers[index] !== null) {
            btn.classList.add('answered');
        }
    });
}

function goToQuestion(questionIndex) {
    if (questionIndex >= 0 && questionIndex < testState.allQuestions.length) {
        testState.currentQuestionIndex = questionIndex;
        renderTestQuestion();
    }
}

// ============================================
// REVIEW SCREEN FUNCTIONS
// ============================================

function showReviewScreen() {
    document.getElementById('test-results').classList.add('hidden');
    document.getElementById('test-review').classList.remove('hidden');

    renderReviewContent();
}

function renderReviewContent() {
    const reviewContent = document.getElementById('review-content');
    if (!reviewContent) return;

    reviewContent.innerHTML = '';

    testState.allQuestions.forEach((question, index) => {
        const userAnswer = testState.userAnswers[index];
        const correctAnswer = question.correctAnswer;
        const isCorrect = userAnswer === correctAnswer;

        const questionDiv = document.createElement('div');
        questionDiv.className = `review-question ${isCorrect ? 'correct' : 'incorrect'}`;

        let html = `
            <div class="review-question-header">
                <div class="review-question-number">Câu ${index + 1}</div>
                <div class="review-status ${isCorrect ? 'correct' : 'incorrect'}">
                    ${isCorrect ? '✓ Đúng' : '✗ Sai'}
                </div>
            </div>
        `;

        // Show passage if exists
        if (question.passageText) {
            html += `
                <div class="review-passage">
                    ${question.passageTitle ? `<strong>${question.passageTitle}</strong><br><br>` : ''}
                    ${question.passageText}
                </div>
            `;
        }

        // Show question text
        if (question.question) {
            html += `<div class="review-question-text">${question.question}</div>`;
        } else if (question.questionNumber) {
            html += `<div class="review-question-text">Câu ${question.questionNumber}</div>`;
        }

        // Show options
        html += '<div class="review-options">';
        question.options.forEach((option, optIndex) => {
            const isUserAnswer = userAnswer === optIndex;
            const isCorrectOption = correctAnswer === optIndex;

            let optionClass = 'review-option';
            if (isCorrectOption) {
                optionClass += ' correct-answer';
            } else if (isUserAnswer && !isCorrect) {
                optionClass += ' wrong-answer';
            } else if (isUserAnswer) {
                optionClass += ' user-answer';
            }

            const prefix = isCorrectOption ? '✓ ' : (isUserAnswer && !isCorrect ? '✗ ' : '');
            html += `
                <div class="${optionClass}">
                    ${prefix}${String.fromCharCode(65 + optIndex)}. ${option}
                </div>
            `;
        });
        html += '</div>';

        // Show explanation
        if (question.explanation) {
            html += `
                <div class="review-explanation">
                    <strong>💡 Giải thích:</strong> ${question.explanation}
                </div>
            `;
        }

        questionDiv.innerHTML = html;
        reviewContent.appendChild(questionDiv);
    });
}
