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

function getAllTests() {
    const tests = [];
    if (typeof fullTests !== 'undefined') tests.push(...fullTests.tests);
    if (typeof listeningTests !== 'undefined') tests.push(...listeningTests.tests);
    return tests;
}

function findTestById(testId) {
    return getAllTests().find(t => t.id === testId);
}

function renderTestSelectionList() {
    const testList = document.querySelector('.test-list');
    if (!testList) return;

    testList.innerHTML = '';
    const tests = getAllTests();

    tests.forEach(test => {
        const div = document.createElement('div');
        div.className = 'test-card';
        div.dataset.testId = test.id;

        // Count parts
        const partsInfo = test.sections.map(s => `
            <span class="test-part">${s.name} (${s.questionCount} câu)</span>
        `).join('');

        div.innerHTML = `
            <div class="test-header">
                <h3>${test.name}</h3>
                <span class="test-duration">⏱️ ${test.duration} phút</span>
            </div>
            <p class="test-description">${test.description}</p>
            <div class="test-parts">
                ${partsInfo}
            </div>
            <button class="start-test-btn">Bắt đầu thi</button>
        `;

        // Add event listener directly
        div.querySelector('.start-test-btn').addEventListener('click', () => {
            startPracticeTest(test.id);
        });

        testList.appendChild(div);
    });
}

function startPracticeTest(testId) {
    const test = findTestById(testId);
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
                        passageTitle: passageTitle,
                        // Pass audio script from passage if exists
                        audioScript: q.audioScript || passage.audioScript
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
    let passageHtml = '';

    // Check if question has audio (Part 1, 2) or moved from passage
    if (question.audioScript) {
        passageHtml += `
            <div class="audio-control">
                <button class="play-audio-btn" data-audio="${encodeURIComponent(question.audioScript)}" onclick="playAudio(this)">
                    🔊 Nghe phát âm
                </button>
                <div class="audio-script hidden">
                    <strong>Transcript:</strong><br>
                    ${question.audioScript.replace(/\n/g, '<br>')}
                </div>
                <button class="toggle-script-btn" onclick="this.previousElementSibling.classList.toggle('hidden')">
                    👁️ Xem/Ẩn Transcript
                </button>
            </div>
        `;
    }

    // Check if question has image (Part 1)
    if (question.imageUrl) {
        passageHtml += `
            <div class="question-image">
                <img src="${question.imageUrl}" alt="Question Image" style="max-width: 100%; border-radius: 8px; margin-bottom: 1rem;">
            </div>
        `;
    }

    if (question.passageText) {
        passageHtml += `
            ${question.passageTitle ? `<div class="passage-title">${question.passageTitle}</div>` : ''}
            <div class="passage-text">${question.passageText}</div>
        `;
    }

    // Audio for passage (Part 3, 4) - Usually attached to the first question of the set, 
    // but we can check if the current question's passage has an audioScript property 
    // (requires modifying the flattening logic or just checking here if we had access to passage).
    // In our flattening logic, we didn't explicitly pass passage audio. 
    // Let's rely on the fact that if a passage has audio, it should be rendered.
    // However, the flatten logic copied text. Let's assume for now listening data puts audioScript on the question or we need to fix flattening.

    // FIX: The flattening logic in startPracticeTest needs to carry over audioScript from passage to questions.
    // I will assume for now that I updated listening-data to put audioScript on questions OR 
    // I should update startPracticeTest flattening logic. 
    // Let's just output what we have.

    passageColumn.innerHTML = passageHtml;

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
        part7: { correct: 0, total: 0 },
        part1: { correct: 0, total: 0 },
        part2: { correct: 0, total: 0 },
        part3: { correct: 0, total: 0 },
        part4: { correct: 0, total: 0 }
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

    // Sync result to backend database if logged in
    if (typeof authState !== 'undefined' && authState.user) {
        const percentage = Math.round((totalScore / testState.allQuestions.length) * 100);
        fetch('/api/results', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader()
            },
            body: JSON.stringify({
                test_id: testState.currentTest.name || testState.currentTest.id,
                score: totalScore,
                total: testState.allQuestions.length,
                percentage: percentage,
                date: new Date().toLocaleString('vi-VN')
            })
        }).then(res => {
            if (res.ok && typeof loadPracticeHistory === 'function') {
                loadPracticeHistory();
            }
        }).catch(err => console.error('Failed to sync test result to backend:', err));
    }

    // Show results
    showTestResults(totalScore, testState.allQuestions.length, sectionScores, testState.currentTest);
}

function showTestResults(score, total, sectionScores, test) {
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
        `${sectionScores.part7 ? sectionScores.part7.correct : 0}/${sectionScores.part7 ? sectionScores.part7.total : 0}`;

    // Dynamic sections (for listening)
    const breakdown = document.querySelector('.results-breakdown');
    if (test && test.type === 'listening') {
        breakdown.innerHTML = `
            <div class="breakdown-item">
                <span class="breakdown-label">Part 1 (Photographs)</span>
                <span class="breakdown-score">${sectionScores.part1 ? sectionScores.part1.correct : 0}/${sectionScores.part1 ? sectionScores.part1.total : 0}</span>
            </div>
            <div class="breakdown-item">
                <span class="breakdown-label">Part 2 (Q&A)</span>
                <span class="breakdown-score">${sectionScores.part2 ? sectionScores.part2.correct : 0}/${sectionScores.part2 ? sectionScores.part2.total : 0}</span>
            </div>
            <div class="breakdown-item">
                <span class="breakdown-label">Part 3 (Conversations)</span>
                <span class="breakdown-score">${sectionScores.part3 ? sectionScores.part3.correct : 0}/${sectionScores.part3 ? sectionScores.part3.total : 0}</span>
            </div>
            <div class="breakdown-item">
                <span class="breakdown-label">Part 4 (Talks)</span>
                <span class="breakdown-score">${sectionScores.part4 ? sectionScores.part4.correct : 0}/${sectionScores.part4 ? sectionScores.part4.total : 0}</span>
            </div>
        `;
    } else {
        breakdown.innerHTML = `
            <div class="breakdown-item">
                <span class="breakdown-label">Part 5 (Grammar)</span>
                <span class="breakdown-score">${sectionScores.part5 ? sectionScores.part5.correct : 0}/${sectionScores.part5 ? sectionScores.part5.total : 0}</span>
            </div>
            <div class="breakdown-item">
                <span class="breakdown-label">Part 6 (Text Completion)</span>
                <span class="breakdown-score">${sectionScores.part6 ? sectionScores.part6.correct : 0}/${sectionScores.part6 ? sectionScores.part6.total : 0}</span>
            </div>
            <div class="breakdown-item">
                <span class="breakdown-label">Part 7 (Reading)</span>
                <span class="breakdown-score">${sectionScores.part7 ? sectionScores.part7.correct : 0}/${sectionScores.part7 ? sectionScores.part7.total : 0}</span>
            </div>
        `;
    }

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
        renderTestSelectionList();
        navigateTo('test-screen');
    });

    // Back from test selection
    document.getElementById('back-from-test-selection')?.addEventListener('click', () => {
        navigateTo('home-screen');
    });

    // Start test button - Now handled in renderTestSelectionList
    // But we keep this for any static buttons if they exist
    document.querySelectorAll('.start-test-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const testCard = this.closest('.test-card');
            if (testCard) {
                const testId = testCard.dataset.testId;
                startPracticeTest(testId);
            }
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

    // Review filter buttons logic
    document.querySelectorAll('.review-filters .filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.review-filters .filter-btn').forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.dataset.filter; // 'all', 'incorrect', 'correct'
            filterReviewQuestions(filterValue);
        });
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

    // Reset filter buttons to default 'all'
    document.querySelectorAll('.review-filters .filter-btn').forEach(b => {
        if (b.dataset.filter === 'all') {
            b.classList.add('active');
        } else {
            b.classList.remove('active');
        }
    });

    renderReviewContent();
}

function filterReviewQuestions(filterValue) {
    const questions = document.querySelectorAll('.review-content .review-question');
    questions.forEach(q => {
        if (filterValue === 'all') {
            q.style.display = 'block';
        } else if (filterValue === 'incorrect') {
            if (q.classList.contains('incorrect')) {
                q.style.display = 'block';
            } else {
                q.style.display = 'none';
            }
        } else if (filterValue === 'correct') {
            if (q.classList.contains('correct')) {
                q.style.display = 'block';
            } else {
                q.style.display = 'none';
            }
        }
    });
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

        // Show Image (Part 1)
        if (question.imageUrl) {
            html += `
                <div class="review-image" style="margin-bottom: 1rem;">
                    <img src="${question.imageUrl}" alt="Question Image" style="max-width: 100%; border-radius: 8px;">
                </div>
            `;
        }

        // Show Audio & Transcript (Listening Parts)
        if (question.audioScript) {
            html += `
                <div class="review-audio" style="margin-bottom: 1rem; padding: 15px; background: #f8f9fa; border-radius: 8px; border: 1px solid #e5e7eb;">
                    <button class="play-audio-btn" data-audio="${encodeURIComponent(question.audioScript)}" style="margin-bottom: 10px; padding: 8px 16px; background: #4f46e5; color: white; border-radius: 6px; border: none; cursor: pointer; display: flex; align-items: center; gap: 8px;" onclick="playAudio(this)">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                        Nghe lại phát âm
                    </button>
                    <div class="audio-script" style="margin-top: 10px; font-size: 0.95rem; line-height: 1.5; color: #374151;">
                        <strong>Transcript:</strong><br>
                        ${question.audioScript.replace(/\n/g, '<br>')}
                    </div>
                </div>
            `;
        }

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
// Audio Helper
let currentSpeech = null;

function playAudio(btn) {
    const text = decodeURIComponent(btn.dataset.audio);
    speakText(btn, text);
}

function speakText(btn, text) {
    if (currentSpeech) {
        window.speechSynthesis.cancel();
        currentSpeech = null;
        if (btn) btn.textContent = '🔊 Nghe phát âm';
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;

    utterance.onend = () => {
        currentSpeech = null;
        if (btn) btn.textContent = '🔊 Nghe phát âm';
    };

    if (btn) btn.textContent = '⏹️ Dừng';
    currentSpeech = utterance;
    window.speechSynthesis.speak(utterance);
}
