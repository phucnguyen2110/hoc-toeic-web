// TOEIC Speaking & Writing Logic

const speakWriteState = {
    mode: null, // 'speaking' or 'writing'
    questions: [],
    currentIndex: 0,
    
    // Timers
    timerInterval: null,
    prepTimeRemaining: 0,
    respTimeRemaining: 0,
    writeTimeRemaining: 0,
    timerState: 'idle', // 'idle', 'preparing', 'responding', 'writing'
    
    // Audio recording (Speaking)
    mediaRecorder: null,
    audioChunks: [],
    audioBlob: null,
    audioUrl: null,
    isRecording: false,
    
    // TTS Player
    currentSpeech: null
};

// Initialize listeners when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initSpeakWriteListeners();
});

function initSpeakWriteListeners() {
    // Navigate from Home Screen
    document.getElementById('start-speaking')?.addEventListener('click', () => {
        startSpeakingModule();
    });

    document.getElementById('start-writing')?.addEventListener('click', () => {
        startWritingModule();
    });

    document.getElementById('start-lessons')?.addEventListener('click', () => {
        startLessonsModule();
    });

    // Back buttons
    document.getElementById('back-from-speaking')?.addEventListener('click', () => {
        exitSpeakWriteModule();
    });

    document.getElementById('back-from-writing')?.addEventListener('click', () => {
        exitSpeakWriteModule();
    });

    document.getElementById('back-from-lessons')?.addEventListener('click', () => {
        exitSpeakWriteModule();
    });

    // Lessons tabs switching
    document.getElementById('tab-speaking-lessons')?.addEventListener('click', () => {
        switchLessonsTab('speaking');
    });

    document.getElementById('tab-writing-lessons')?.addEventListener('click', () => {
        switchLessonsTab('writing');
    });

    // Speaking buttons
    document.getElementById('sp-start-btn')?.addEventListener('click', startSpeakingWorkflow);
    document.getElementById('sp-record-btn')?.addEventListener('click', toggleSpeakingRecording);
    document.getElementById('sp-play-btn')?.addEventListener('click', playUserRecording);
    document.getElementById('sp-show-answer-btn')?.addEventListener('click', toggleSpeakingSampleAnswer);
    document.getElementById('sp-speak-sample-btn')?.addEventListener('click', speakSampleAnswerText);
    document.getElementById('sp-prev-btn')?.addEventListener('click', () => navigateQuestion(-1));
    document.getElementById('sp-next-btn')?.addEventListener('click', () => navigateQuestion(1));

    // Writing buttons
    document.getElementById('wr-start-timer-btn')?.addEventListener('click', startWritingTimer);
    document.getElementById('wr-show-answer-btn')?.addEventListener('click', toggleWritingSampleAnswer);
    document.getElementById('wr-speak-sample-btn')?.addEventListener('click', speakWritingSampleText);
    document.getElementById('wr-submit-btn')?.addEventListener('click', evaluateWriting100Percent);
    document.getElementById('wr-prev-btn')?.addEventListener('click', () => navigateQuestion(-1));
    document.getElementById('wr-next-btn')?.addEventListener('click', () => navigateQuestion(1));

    // Live word count for writing
    const textarea = document.getElementById('wr-input-area');
    if (textarea) {
        textarea.addEventListener('input', updateWritingWordCount);
    }
}

// ============================================
// MODULE ENTRY POINTS
// ============================================

function startSpeakingModule() {
    speakWriteState.mode = 'speaking';
    speakWriteState.questions = speakingData.questions;
    speakWriteState.currentIndex = 0;
    resetSpeakWriteState();
    
    navigateTo('speaking-screen');
    renderSpeakingQuestion();
}

function startWritingModule() {
    speakWriteState.mode = 'writing';
    speakWriteState.questions = writingData.questions;
    speakWriteState.currentIndex = 0;
    resetSpeakWriteState();
    
    navigateTo('writing-screen');
    renderWritingQuestion();
}

function exitSpeakWriteModule() {
    stopAllTimers();
    stopAudioRecording();
    stopTTS();
    navigateTo('home-screen');
}

function resetSpeakWriteState() {
    stopAllTimers();
    stopAudioRecording();
    stopTTS();
    
    speakWriteState.timerState = 'idle';
    speakWriteState.audioChunks = [];
    speakWriteState.audioBlob = null;
    
    if (speakWriteState.audioUrl) {
        URL.revokeObjectURL(speakWriteState.audioUrl);
        speakWriteState.audioUrl = null;
    }
}

// ============================================
// SPEAKING RENDER & WORKFLOW
// ============================================

function renderSpeakingQuestion() {
    if (speakWriteState.mode !== 'speaking') return;
    
    resetSpeakWriteState();
    
    const question = speakWriteState.questions[speakWriteState.currentIndex];
    
    // Update counter & headers
    document.getElementById('sp-question-count').textContent = `Câu ${speakWriteState.currentIndex + 1}/${speakWriteState.questions.length}`;
    document.getElementById('sp-part-title').textContent = question.partName;
    document.getElementById('sp-directions').textContent = question.directions;
    
    // Timer text reset
    document.getElementById('sp-timer-status').textContent = 'Sẵn sàng';
    document.getElementById('sp-timer-display').textContent = `Chuẩn bị: ${question.prepTime}s | Trả lời: ${question.respTime}s`;
    document.getElementById('sp-timer-display').className = 'sp-timer-text-idle';
    
    // Show/Hide Image
    const imgContainer = document.getElementById('sp-image-container');
    const imgEl = document.getElementById('sp-question-image');
    if (question.imageUrl) {
        imgEl.src = question.imageUrl;
        imgContainer.classList.remove('hidden');
    } else {
        imgContainer.classList.add('hidden');
    }

    // Show/Hide Table
    const tableContainer = document.getElementById('sp-table-container');
    if (question.hasTable && question.tableContent) {
        tableContainer.innerHTML = question.tableContent;
        tableContainer.classList.remove('hidden');
    } else {
        tableContainer.classList.add('hidden');
    }

    // Show/Hide Question Text
    const textContainer = document.getElementById('sp-text-container');
    if (question.questionText) {
        textContainer.textContent = question.questionText;
        textContainer.classList.remove('hidden');
    } else {
        textContainer.classList.add('hidden');
    }

    // Reset controls
    document.getElementById('sp-start-btn').disabled = false;
    document.getElementById('sp-record-btn').disabled = true;
    document.getElementById('sp-play-btn').disabled = true;
    document.getElementById('sp-record-btn').classList.remove('recording');
    document.getElementById('sp-record-btn').innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="8"/>
        </svg> Ghi âm tự do
    `;
    
    // Audio element
    const playback = document.getElementById('speaking-playback');
    if (playback) {
        playback.src = '';
        playback.classList.add('hidden');
    }

    // Reset sample response card
    document.getElementById('sp-sample-card').classList.add('hidden');
    document.getElementById('sp-sample-text').textContent = question.sampleResponse;
    document.getElementById('sp-tips-text').textContent = question.tips;
    document.getElementById('sp-show-answer-btn').textContent = 'Xem đáp án mẫu & Gợi ý';

    // Prev/Next buttons state
    document.getElementById('sp-prev-btn').disabled = speakWriteState.currentIndex === 0;
    document.getElementById('sp-next-btn').disabled = speakWriteState.currentIndex === speakWriteState.questions.length - 1;
}

function startSpeakingWorkflow() {
    const question = speakWriteState.questions[speakWriteState.currentIndex];
    document.getElementById('sp-start-btn').disabled = true;
    
    if (question.prepTime > 0) {
        runPrepTimer(question.prepTime, () => {
            runResponseTimer(question.respTime);
        });
    } else {
        runResponseTimer(question.respTime);
    }
}

function runPrepTimer(seconds, callback) {
    speakWriteState.timerState = 'preparing';
    speakWriteState.prepTimeRemaining = seconds;
    
    const statusEl = document.getElementById('sp-timer-status');
    const timerEl = document.getElementById('sp-timer-display');
    
    statusEl.textContent = 'Thời gian chuẩn bị';
    timerEl.className = 'sp-timer-text-preparing';
    timerEl.textContent = `${speakWriteState.prepTimeRemaining} giây`;
    
    playBeep(440, 100); // Low beep for start

    speakWriteState.timerInterval = setInterval(() => {
        speakWriteState.prepTimeRemaining--;
        timerEl.textContent = `${speakWriteState.prepTimeRemaining} giây`;
        
        if (speakWriteState.prepTimeRemaining <= 0) {
            clearInterval(speakWriteState.timerInterval);
            callback();
        }
    }, 1000);
}

function runResponseTimer(seconds) {
    speakWriteState.timerState = 'responding';
    speakWriteState.respTimeRemaining = seconds;
    
    const statusEl = document.getElementById('sp-timer-status');
    const timerEl = document.getElementById('sp-timer-display');
    
    statusEl.textContent = 'Thời gian trả lời';
    timerEl.className = 'sp-timer-text-responding';
    timerEl.textContent = `${speakWriteState.respTimeRemaining} giây`;
    
    playBeep(880, 300); // High beep for speak
    
    // Auto-start audio recording
    startAudioRecording();

    speakWriteState.timerInterval = setInterval(() => {
        speakWriteState.respTimeRemaining--;
        timerEl.textContent = `${speakWriteState.respTimeRemaining} giây`;
        
        if (speakWriteState.respTimeRemaining <= 0) {
            clearInterval(speakWriteState.timerInterval);
            stopAudioRecording();
            statusEl.textContent = 'Hoàn thành trả lời';
            timerEl.className = 'sp-timer-text-idle';
            timerEl.textContent = 'Thời gian đã hết!';
            playBeep(660, 500); // Medium end beep
            speakWriteState.timerState = 'idle';
        }
    }, 1000);
}

// ============================================
// AUDIO RECORDING LOGIC
// ============================================

function startAudioRecording() {
    if (speakWriteState.isRecording) return;
    
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            speakWriteState.audioChunks = [];
            speakWriteState.mediaRecorder = new MediaRecorder(stream);
            
            speakWriteState.mediaRecorder.ondataavailable = event => {
                if (event.data.size > 0) {
                    speakWriteState.audioChunks.push(event.data);
                }
            };
            
            speakWriteState.mediaRecorder.onstop = () => {
                speakWriteState.audioBlob = new Blob(speakWriteState.audioChunks, { type: 'audio/webm' });
                speakWriteState.audioUrl = URL.createObjectURL(speakWriteState.audioBlob);
                
                const playback = document.getElementById('speaking-playback');
                if (playback) {
                    playback.src = speakWriteState.audioUrl;
                    playback.classList.remove('hidden');
                }
                
                document.getElementById('sp-play-btn').disabled = false;
                
                // Stop all tracks in stream to release microphone
                stream.getTracks().forEach(track => track.stop());
            };
            
            speakWriteState.mediaRecorder.start();
            speakWriteState.isRecording = true;
            
            const recBtn = document.getElementById('sp-record-btn');
            recBtn.disabled = false;
            recBtn.classList.add('recording');
            recBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="6" width="12" height="12" rx="2"/>
                </svg> Dừng ghi
            `;
        })
        .catch(err => {
            console.warn("Microphone access denied or not available.", err);
            // Allow manual response if mic error
            const timerEl = document.getElementById('sp-timer-display');
            timerEl.textContent += " (Không có Micro)";
        });
}

function stopAudioRecording() {
    if (speakWriteState.mediaRecorder && speakWriteState.isRecording) {
        speakWriteState.mediaRecorder.stop();
        speakWriteState.isRecording = false;
        
        const recBtn = document.getElementById('sp-record-btn');
        recBtn.classList.remove('recording');
        recBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="8"/>
            </svg> Ghi âm lại
        `;
    }
}

function toggleSpeakingRecording() {
    if (speakWriteState.isRecording) {
        stopAudioRecording();
        if (speakWriteState.timerInterval && speakWriteState.timerState === 'responding') {
            clearInterval(speakWriteState.timerInterval);
            document.getElementById('sp-timer-status').textContent = 'Đã dừng ghi âm';
            speakWriteState.timerState = 'idle';
        }
    } else {
        // Manual recording
        startAudioRecording();
    }
}

function playUserRecording() {
    const playback = document.getElementById('speaking-playback');
    if (playback && speakWriteState.audioUrl) {
        playback.play();
    }
}

function stopAudioRecordingOnly() {
    if (speakWriteState.mediaRecorder && speakWriteState.isRecording) {
        speakWriteState.mediaRecorder.stop();
        speakWriteState.isRecording = false;
    }
}

// ============================================
// WRITING RENDER & WORKFLOW
// ============================================

function renderWritingQuestion() {
    if (speakWriteState.mode !== 'writing') return;
    
    resetSpeakWriteState();
    
    const question = speakWriteState.questions[speakWriteState.currentIndex];
    
    // Reset word count and textarea
    const textarea = document.getElementById('wr-input-area');
    if (textarea) {
        textarea.value = '';
        textarea.placeholder = getWritingPlaceholder(question.part);
    }
    document.getElementById('wr-word-count').textContent = 'Số từ: 0';
    
    // Update headers
    document.getElementById('wr-question-count').textContent = `Câu ${speakWriteState.currentIndex + 1}/${speakWriteState.questions.length}`;
    document.getElementById('wr-part-title').textContent = question.partName;
    document.getElementById('wr-directions').textContent = question.directions;
    
    // Setup Timers
    const timerStatus = document.getElementById('wr-timer-status');
    const timerDisplay = document.getElementById('wr-timer-display');
    const startBtn = document.getElementById('wr-start-timer-btn');
    
    if (question.timeLimit) {
        startBtn.classList.remove('hidden');
        startBtn.disabled = false;
        timerStatus.textContent = 'Thời gian làm bài';
        const minutes = Math.floor(question.timeLimit / 60);
        timerDisplay.textContent = `${minutes}:00`;
    } else {
        // Part 1: Write a sentence based on a picture (Untimed by default, let's keep it manual)
        startBtn.classList.add('hidden');
        timerStatus.textContent = 'Tự do';
        timerDisplay.textContent = '--:--';
    }

    // Render left panel contents
    // Image
    const imgContainer = document.getElementById('wr-image-container');
    const imgEl = document.getElementById('wr-question-image');
    if (question.imageUrl) {
        imgEl.src = question.imageUrl;
        imgContainer.classList.remove('hidden');
    } else {
        imgContainer.classList.add('hidden');
    }

    // Keywords (Part 1)
    const wordsContainer = document.getElementById('wr-words-container');
    if (question.words) {
        wordsContainer.innerHTML = `<strong>Từ gợi ý cần có:</strong> ${question.words.map(w => `<span class="wr-keyword">${w}</span>`).join(' & ')}`;
        wordsContainer.classList.remove('hidden');
    } else {
        wordsContainer.classList.add('hidden');
    }

    // Email prompt (Part 2)
    const emailContainer = document.getElementById('wr-email-container');
    if (question.emailPrompt) {
        emailContainer.innerHTML = question.emailPrompt;
        emailContainer.classList.remove('hidden');
    } else {
        emailContainer.classList.add('hidden');
    }

    // Essay question text (Part 3)
    const textContainer = document.getElementById('wr-text-container');
    if (question.questionText) {
        textContainer.textContent = question.questionText;
        textContainer.classList.remove('hidden');
    } else {
        textContainer.classList.add('hidden');
    }

    // Reset sample response card
    document.getElementById('wr-sample-card')?.classList.add('hidden');
    document.getElementById('wr-result-card')?.classList.add('hidden');
    document.getElementById('wr-sample-text').textContent = question.sampleResponse;
    document.getElementById('wr-tips-text').textContent = question.tips;
    document.getElementById('wr-show-answer-btn').textContent = 'Xem đáp án mẫu & Gợi ý';

    // Navigation buttons
    document.getElementById('wr-prev-btn').disabled = speakWriteState.currentIndex === 0;
    document.getElementById('wr-next-btn').disabled = speakWriteState.currentIndex === speakWriteState.questions.length - 1;
}

function startWritingTimer() {
    const question = speakWriteState.questions[speakWriteState.currentIndex];
    if (!question.timeLimit) return;
    
    document.getElementById('wr-start-timer-btn').disabled = true;
    speakWriteState.timerState = 'writing';
    speakWriteState.writeTimeRemaining = question.timeLimit;
    
    const timerDisplay = document.getElementById('wr-timer-display');
    
    speakWriteState.timerInterval = setInterval(() => {
        speakWriteState.writeTimeRemaining--;
        
        const minutes = Math.floor(speakWriteState.writeTimeRemaining / 60);
        const seconds = speakWriteState.writeTimeRemaining % 60;
        timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        if (speakWriteState.writeTimeRemaining < 60) {
            timerDisplay.style.color = '#ef4444';
        } else {
            timerDisplay.style.color = 'var(--color-text-primary)';
        }
        
        if (speakWriteState.writeTimeRemaining <= 0) {
            clearInterval(speakWriteState.timerInterval);
            alert("Đã hết thời gian viết bài! Hãy xem đáp án mẫu để tự đánh giá.");
            toggleWritingSampleAnswer();
            speakWriteState.timerState = 'idle';
        }
    }, 1000);
}

function updateWritingWordCount() {
    const textarea = document.getElementById('wr-input-area');
    if (!textarea) return;
    
    const text = textarea.value.trim();
    const wordCount = text === '' ? 0 : text.split(/\s+/).filter(w => w.length > 0).length;
    
    document.getElementById('wr-word-count').textContent = `Số từ: ${wordCount}`;
}

function getWritingPlaceholder(part) {
    if (part === 1) return "Nhập câu văn của bạn tại đây (sử dụng 2 từ gợi ý ở cột bên trái)...";
    if (part === 2) return "Dear [Name],\n\n[Nhập nội dung email phản hồi của bạn tại đây]...\n\nBest regards,\n[Your Name]";
    return "Write your opinion essay here. (At least 300 words recommended)...";
}

// ============================================
// SHARED NAVIGATION & ACTIONS
// ============================================

function navigateQuestion(direction) {
    speakWriteState.currentIndex += direction;
    if (speakWriteState.currentIndex < 0) speakWriteState.currentIndex = 0;
    if (speakWriteState.currentIndex >= speakWriteState.questions.length) {
        speakWriteState.currentIndex = speakWriteState.questions.length - 1;
    }
    
    if (speakWriteState.mode === 'speaking') {
        renderSpeakingQuestion();
    } else {
        renderWritingQuestion();
    }
}

function toggleSpeakingSampleAnswer() {
    const card = document.getElementById('sp-sample-card');
    const btn = document.getElementById('sp-show-answer-btn');
    if (card.classList.contains('hidden')) {
        card.classList.remove('hidden');
        btn.textContent = 'Ẩn đáp án mẫu';
    } else {
        card.classList.add('hidden');
        btn.textContent = 'Xem đáp án mẫu & Gợi ý';
        stopTTS();
    }
}

function toggleWritingSampleAnswer() {
    const card = document.getElementById('wr-sample-card');
    const btn = document.getElementById('wr-show-answer-btn');
    if (card.classList.contains('hidden')) {
        card.classList.remove('hidden');
        btn.textContent = 'Ẩn đáp án mẫu';
    } else {
        card.classList.add('hidden');
        btn.textContent = 'Xem đáp án mẫu & Gợi ý';
        stopTTS();
    }
}

// ============================================
// TEXT-TO-SPEECH (TTS) SAMPLE READERS
// ============================================

function speakSampleAnswerText() {
    const text = speakWriteState.questions[speakWriteState.currentIndex].sampleResponse;
    const btn = document.getElementById('sp-speak-sample-btn');
    speakTextHelper(btn, text);
}

function speakWritingSampleText() {
    const text = speakWriteState.questions[speakWriteState.currentIndex].sampleResponse;
    const btn = document.getElementById('wr-speak-sample-btn');
    speakTextHelper(btn, text);
}

function speakTextHelper(btn, text) {
    if (speakWriteState.currentSpeech) {
        window.speechSynthesis.cancel();
        speakWriteState.currentSpeech = null;
        btn.textContent = '🔊 Nghe bài mẫu';
        return;
    }

    // Strip out HTML markup if any in text
    const cleanText = text.replace(/<[^>]*>/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;

    utterance.onend = () => {
        speakWriteState.currentSpeech = null;
        btn.textContent = '🔊 Nghe bài mẫu';
    };

    btn.textContent = '⏹️ Dừng đọc';
    speakWriteState.currentSpeech = utterance;
    window.speechSynthesis.speak(utterance);
}

function stopTTS() {
    if (speakWriteState.currentSpeech) {
        window.speechSynthesis.cancel();
        speakWriteState.currentSpeech = null;
        
        const spBtn = document.getElementById('sp-speak-sample-btn');
        if (spBtn) spBtn.textContent = '🔊 Nghe bài mẫu';
        
        const wrBtn = document.getElementById('wr-speak-sample-btn');
        if (wrBtn) wrBtn.textContent = '🔊 Nghe bài mẫu';
    }
}

function stopAllTimers() {
    if (speakWriteState.timerInterval) {
        clearInterval(speakWriteState.timerInterval);
        speakWriteState.timerInterval = null;
    }
}

function stopAudioRecording() {
    stopAudioRecordingOnly();
}

// ============================================
// SOUND UTILITY
// ============================================

// Audio context helper for beep indicators
let audioCtx = null;
function playBeep(frequency = 440, duration = 100) {
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        // Resume context if suspended (browser security)
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration / 1000);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + duration / 1000);
    } catch (e) {
        console.warn("Web Audio API is not supported or blocked by user gesture.", e);
    }
}

// ============================================
// AUTOMATED 100% WRITING EVALUATION ENGINE
// ============================================

function evaluateWriting100Percent() {
    if (speakWriteState.mode !== 'writing') return;

    const question = speakWriteState.questions[speakWriteState.currentIndex];
    const textarea = document.getElementById('wr-input-area');
    if (!textarea) return;

    const userText = textarea.value.trim();
    if (userText === '') {
        alert("Vui lòng nhập câu trả lời trước khi chấm điểm!");
        return;
    }

    const wordCount = userText.split(/\s+/).filter(w => w.length > 0).length;

    let rawScore = 0;
    let maxRawScore = 8; // Default for Parts 1 & 2
    if (question.part === 3) maxRawScore = 24;

    const reports = [];
    let feedback = "";

    // Check capitalization and punctuation (formatting) - applies to all parts
    const startsWithCapital = /^[A-Z]/.test(userText);
    const endsWithPunctuation = /[.!?]$/.test(userText);

    // Dynamic checks based on Part
    if (question.part === 1) {
        // Part 1: Write a sentence based on a picture (0-8 raw score)
        const kw1 = question.words[0];
        const kw2 = question.words[1];

        const hasKw1 = matchKeyword(userText, kw1);
        const hasKw2 = matchKeyword(userText, kw2);

        if (hasKw1) {
            rawScore += 2;
            reports.push(`<li style="color: var(--color-success); font-weight: 500;">✓ Sử dụng từ khóa "${kw1}" (+2đ)</li>`);
        } else {
            reports.push(`<li style="color: var(--color-error); font-weight: 500;">✗ Thiếu từ khóa "${kw1}" (0đ)</li>`);
        }

        if (hasKw2) {
            rawScore += 2;
            reports.push(`<li style="color: var(--color-success); font-weight: 500;">✓ Sử dụng từ khóa "${kw2}" (+2đ)</li>`);
        } else {
            reports.push(`<li style="color: var(--color-error); font-weight: 500;">✗ Thiếu từ khóa "${kw2}" (0đ)</li>`);
        }

        // Word count check for a single sentence (should be between 5 and 35 words)
        if (wordCount >= 5 && wordCount <= 35) {
            rawScore += 2;
            reports.push(`<li style="color: var(--color-success); font-weight: 500;">✓ Độ dài câu đạt chuẩn (5-35 từ) (+2đ)</li>`);
        } else {
            reports.push(`<li style="color: var(--color-warning); font-weight: 500;">⚠ Độ dài câu chưa tối ưu (Hiện có ${wordCount} từ) (0đ)</li>`);
        }

        // Grammar & Formatting checks
        if (startsWithCapital && endsWithPunctuation) {
            rawScore += 2;
            reports.push(`<li style="color: var(--color-success); font-weight: 500;">✓ Định dạng chuẩn (Viết hoa đầu câu & có dấu chấm cuối) (+2đ)</li>`);
        } else {
            let detail = [];
            if (!startsWithCapital) detail.push("chưa viết hoa chữ đầu");
            if (!endsWithPunctuation) detail.push("thiếu dấu chấm câu cuối");
            reports.push(`<li style="color: var(--color-error); font-weight: 500;">✗ Lỗi định dạng (${detail.join(', ')}) (0đ)</li>`);
        }

        // Feedback
        if (rawScore === 8) {
            feedback = "Tuyệt vời! Câu của bạn viết đúng cấu trúc, sử dụng chính xác 2 từ gợi ý và định dạng hoàn hảo.";
        } else if (rawScore >= 4) {
            feedback = "Khá tốt! Bạn hãy chú ý thêm từ khóa còn thiếu hoặc điều chỉnh viết hoa chữ cái đầu và dấu chấm câu để đạt điểm tối đa.";
        } else {
            feedback = "Bài làm cần cải thiện. Hãy chắc chắn rằng bạn viết một câu hoàn chỉnh chứa cả hai từ khóa, có viết hoa chữ cái đầu và dấu chấm cuối câu.";
        }

    } else if (question.part === 2) {
        // Part 2: Respond to a written request (0-8 raw score)
        const lowerText = userText.toLowerCase();
        const hasGreeting = /dear|hello|hi\b/i.test(lowerText);
        const hasSignOff = /sincerely|best regards|thanks|thank you|regards/i.test(lowerText);
        const sentenceCount = userText.split(/[.!?]+/).filter(s => s.trim().length > 0).length;

        if (hasGreeting) {
            rawScore += 2;
            reports.push(`<li style="color: var(--color-success); font-weight: 500;">✓ Có lời chào đầu email trang trọng (+2đ)</li>`);
        } else {
            reports.push(`<li style="color: var(--color-error); font-weight: 500;">✗ Thiếu lời chào mở đầu (như "Dear [Name],") (0đ)</li>`);
        }

        if (hasSignOff) {
            rawScore += 2;
            reports.push(`<li style="color: var(--color-success); font-weight: 500;">✓ Có lời chúc/ký tên ở kết email (+2đ)</li>`);
        } else {
            reports.push(`<li style="color: var(--color-error); font-weight: 500;">✗ Thiếu lời chúc kết thúc (như "Best regards," hay "Sincerely,") (0đ)</li>`);
        }

        if (wordCount >= 60) {
            rawScore += 2;
            reports.push(`<li style="color: var(--color-success); font-weight: 500;">✓ Độ dài bài viết đạt chuẩn (>= 60 từ): Có ${wordCount} từ (+2đ)</li>`);
        } else if (wordCount >= 30) {
            rawScore += 1;
            reports.push(`<li style="color: var(--color-warning); font-weight: 500;">⚠ Bài viết hơi ngắn: Có ${wordCount} từ (Khuyên dùng từ 60 từ trở lên) (+1đ)</li>`);
        } else {
            reports.push(`<li style="color: var(--color-error); font-weight: 500;">✗ Bài viết quá ngắn: Có ${wordCount} từ (0đ)</li>`);
        }

        if (sentenceCount >= 4) {
            rawScore += 2;
            reports.push(`<li style="color: var(--color-success); font-weight: 500;">✓ Kết cấu luận điểm tốt (Có ít nhất 4 câu lập luận) (+2đ)</li>`);
        } else {
            reports.push(`<li style="color: var(--color-warning); font-weight: 500;">⚠ Số câu viết hơi ít: Có ${sentenceCount} câu (Khuyên dùng ít nhất 4 câu để diễn đạt đủ 2 yêu cầu).</li>`);
        }

        // Feedback
        if (rawScore === 8) {
            feedback = "Rất tốt! Email phản hồi của bạn có bố cục rõ ràng của một email giao dịch, đầy đủ thông tin yêu cầu và hành văn tự nhiên.";
        } else if (rawScore >= 4) {
            feedback = "Đầy đủ ý chính. Để email chuyên nghiệp hơn, hãy thêm lời chào trang trọng ở đầu hoặc lời kết thúc ở cuối thư.";
        } else {
            feedback = "Email quá ngắn hoặc thiếu các phần cơ bản của thư tín thương mại. Hãy chắc chắn rằng bạn đã trả lời đầy đủ cả hai câu hỏi được đặt ra trong đề bài.";
        }

    } else if (question.part === 3) {
        // Part 3: Write an opinion essay (0-24 raw score)
        // 1. Length score
        if (wordCount >= 300) {
            rawScore += 10;
            reports.push(`<li style="color: var(--color-success); font-weight: 500;">✓ Đạt độ dài tiêu chuẩn bài luận (>= 300 từ): Hiện có ${wordCount} từ (+10đ)</li>`);
        } else if (wordCount >= 200) {
            rawScore += 7;
            reports.push(`<li style="color: var(--color-warning); font-weight: 500;">⚠ Độ dài trung bình (200-299 từ): Hiện có ${wordCount} từ (+7đ)</li>`);
        } else if (wordCount >= 100) {
            rawScore += 4;
            reports.push(`<li style="color: var(--color-warning); font-weight: 500;">⚠ Bài luận còn quá ngắn (100-199 từ): Hiện có ${wordCount} từ (+4đ)</li>`);
        } else {
            reports.push(`<li style="color: var(--color-error); font-weight: 500;">✗ Bài luận quá ngắn (< 100 từ) (0đ)</li>`);
        }

        // 2. Transition words check
        const transitionList = ['first', 'second', 'third', 'addition', 'furthermore', 'therefore', 'conclusion', 'however', 'opinion', 'personally', 'example'];
        let matchedTransitions = 0;
        const lowerText = userText.toLowerCase();
        
        transitionList.forEach(word => {
            if (lowerText.includes(word)) {
                matchedTransitions++;
            }
        });

        if (matchedTransitions >= 5) {
            rawScore += 8;
            reports.push(`<li style="color: var(--color-success); font-weight: 500;">✓ Sự liên kết rất tốt: Đã dùng ${matchedTransitions} từ nối liên kết (+8đ)</li>`);
        } else if (matchedTransitions >= 3) {
            rawScore += 5;
            reports.push(`<li style="color: var(--color-success); font-weight: 500;">✓ Sự liên kết khá: Đã dùng ${matchedTransitions} từ nối liên kết (+5đ)</li>`);
        } else if (matchedTransitions >= 1) {
            rawScore += 2;
            reports.push(`<li style="color: var(--color-warning); font-weight: 500;">⚠ Bài luận ít từ nối liên kết: Có ${matchedTransitions} từ nối (+2đ)</li>`);
        } else {
            reports.push(`<li style="color: var(--color-error); font-weight: 500;">✗ Thiếu các từ nối liên kết luận điểm (0đ)</li>`);
        }

        // 3. Paragraphs and conclusion checks
        const paragraphs = userText.split(/\n+/).filter(p => p.trim().length > 20);
        const hasConclusionWord = /conclusion|to sum up|in short|summarize/i.test(lowerText);

        if (paragraphs.length >= 3) {
            rawScore += 3;
            reports.push(`<li style="color: var(--color-success); font-weight: 500;">✓ Bố cục bài luận rõ ràng gồm ${paragraphs.length} đoạn văn (+3đ)</li>`);
        } else {
            reports.push(`<li style="color: var(--color-warning); font-weight: 500;">⚠ Nên chia nhỏ bài viết thành ít nhất 3 đoạn (Mở bài, Thân bài, Kết bài).</li>`);
        }

        if (hasConclusionWord) {
            rawScore += 3;
            reports.push(`<li style="color: var(--color-success); font-weight: 500;">✓ Có phần kết luận rõ ràng bằng từ khóa chỉ dẫn (+3đ)</li>`);
        } else {
            reports.push(`<li style="color: var(--color-warning); font-weight: 500;">⚠ Chưa tìm thấy tín hiệu kết luận rõ ràng (ví dụ: 'In conclusion').</li>`);
        }

        // Feedback
        if (rawScore >= 20) {
            feedback = "Bài luận của bạn rất xuất sắc! Lập luận chặt chẽ, từ nối phong phú, độ dài đạt yêu cầu và bố cục mạch lạc.";
        } else if (rawScore >= 12) {
            feedback = "Tốt, tuy nhiên bạn cần viết dài hơn và bổ sung thêm các trạng từ chỉ luận điểm (First, Second, Therefore, For example...) để liên kết các đoạn chặt chẽ hơn.";
        } else {
            feedback = "Bài viết luận chưa đạt cấu trúc chuẩn. Bạn hãy chia bài luận ra làm các đoạn: Mở bài nêu ý kiến, Thân bài đưa ra lý do + ví dụ thực tế và Kết bài tổng kết.";
        }
    }

    // Convert raw score to scaled score (0 - 200)
    const scaledScore = Math.round((rawScore / maxRawScore) * 200);

    // Update UI elements
    const scoreBadge = document.getElementById('wr-score-badge');
    if (scoreBadge) {
        scoreBadge.textContent = `${scaledScore}/200`;
        if (scaledScore >= 160) {
            scoreBadge.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)'; // Green
        } else if (scaledScore >= 100) {
            scoreBadge.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'; // Indigo
        } else {
            scoreBadge.style.background = 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'; // Orange/Red
        }
    }

    const reportList = document.getElementById('wr-report-list');
    if (reportList) {
        reportList.innerHTML = reports.join('');
    }

    const feedbackText = document.getElementById('wr-feedback-text');
    if (feedbackText) {
        feedbackText.textContent = feedback;
    }

    // Show result card
    const resultCard = document.getElementById('wr-result-card');
    if (resultCard) {
        resultCard.classList.remove('hidden');
        resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function matchKeyword(text, word) {
    const lowerText = text.toLowerCase();
    if (root.length >= 3) {
        return lowerText.includes(root);
    }
    return false;
}

// ============================================
// STUDY GUIDE LESSONS SCREEN CONTROLLER
// ============================================

function startLessonsModule() {
    navigateTo('lessons-screen');
    switchLessonsTab('speaking');
}

function switchLessonsTab(tab) {
    const spTab = document.getElementById('tab-speaking-lessons');
    const wrTab = document.getElementById('tab-writing-lessons');
    if (!spTab || !wrTab) return;

    if (tab === 'speaking') {
        spTab.classList.add('active');
        spTab.style.background = 'var(--primary-gradient)';
        spTab.style.color = 'white';

        wrTab.classList.remove('active');
        wrTab.style.background = 'transparent';
        wrTab.style.color = 'var(--color-text-secondary)';
    } else {
        wrTab.classList.add('active');
        wrTab.style.background = 'var(--primary-gradient)';
        wrTab.style.color = 'white';

        spTab.classList.remove('active');
        spTab.style.background = 'transparent';
        spTab.style.color = 'var(--color-text-secondary)';
    }

    renderLessonsList(tab);
}

function renderLessonsList(tab) {
    const container = document.getElementById('lessons-list');
    if (!container) return;

    container.innerHTML = '';
    const lessons = lessonsData[tab];

    lessons.forEach((lesson, index) => {
        const card = document.createElement('div');
        card.className = 'lesson-card';
        card.style.background = 'var(--color-bg-card)';
        card.style.border = '1px solid var(--color-border)';
        card.style.borderRadius = 'var(--radius-lg)';
        card.style.overflow = 'hidden';
        card.style.transition = 'all var(--transition-base)';

        // Unique ID for accordion
        const bodyId = `lesson-body-${lesson.id}`;

        card.innerHTML = `
            <!-- Accordion Header -->
            <div class="lesson-header" style="padding: var(--spacing-lg); display: flex; justify-content: space-between; align-items: center; cursor: pointer; user-select: none; border-bottom: 1px solid transparent; transition: all var(--transition-base);">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: var(--font-size-xl); color: var(--color-primary); font-weight: 700;">Part ${lesson.part}</span>
                    <h3 style="font-size: var(--font-size-lg); font-weight: 700; margin: 0;">${lesson.title}</h3>
                </div>
                <div class="accordion-icon" style="font-size: 1.5rem; transition: transform var(--transition-base); color: var(--color-text-secondary);">▼</div>
            </div>

            <!-- Accordion Body -->
            <div id="${bodyId}" class="lesson-body hidden" style="padding: var(--spacing-xl); background: rgba(255, 255, 255, 0.01); display: none;">
                <!-- Overview -->
                <div style="margin-bottom: 1.5rem;">
                    <h4 style="color: var(--color-primary); margin-bottom: 0.5rem; font-size: var(--font-size-base); text-transform: uppercase; letter-spacing: 0.05em;">📌 Tổng quan:</h4>
                    <p style="color: var(--color-text-primary); line-height: 1.6; font-size: var(--font-size-base);">${lesson.overview}</p>
                </div>

                <!-- Criteria -->
                <div style="margin-bottom: 1.5rem;">
                    <h4 style="color: var(--color-success); margin-bottom: 0.5rem; font-size: var(--font-size-base); text-transform: uppercase; letter-spacing: 0.05em;">🎯 Tiêu chí chấm điểm:</h4>
                    <p style="color: var(--color-text-secondary); line-height: 1.6; font-size: var(--font-size-base);">${lesson.criteria}</p>
                </div>

                <!-- Strategies -->
                <div style="margin-bottom: 1.5rem;">
                    <h4 style="color: var(--color-accent); margin-bottom: 0.5rem; font-size: var(--font-size-base); text-transform: uppercase; letter-spacing: 0.05em;">💡 Chiến thuật ăn điểm:</h4>
                    <ul style="padding-left: 20px; color: var(--color-text-secondary); line-height: 1.6; display: flex; flex-direction: column; gap: var(--spacing-sm); font-size: var(--font-size-base);">
                        ${lesson.strategies.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                </div>

                <!-- Templates -->
                <div style="margin-bottom: 1.5rem;">
                    <h4 style="color: #fbbf24; margin-bottom: 0.5rem; font-size: var(--font-size-base); text-transform: uppercase; letter-spacing: 0.05em;">🔑 Khung mẫu câu (Templates):</h4>
                    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                        ${lesson.templates.map(t => `
                            <div style="background: rgba(251, 191, 36, 0.05); border-left: 3px solid #fbbf24; padding: var(--spacing-md); border-radius: 4px;">
                                <strong style="color: var(--color-text-primary); font-size: var(--font-size-sm);">${t.useCase}</strong>
                                <pre style="margin-top: 5px; font-family: monospace; white-space: pre-wrap; color: #fef08a; font-size: var(--font-size-base); line-height: 1.5; margin-bottom: 0;">${t.pattern}</pre>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Step examples / interactive section -->
                <div style="margin-bottom: 1.5rem;">
                    <h4 style="color: var(--color-primary-light); margin-bottom: 0.5rem; font-size: var(--font-size-base); text-transform: uppercase; letter-spacing: 0.05em;">📖 Hướng dẫn chi tiết:</h4>
                    ${lesson.examples}
                </div>

                <!-- Action Button -->
                <button class="action-btn primary" onclick="startLessonPractice('${tab}', ${lesson.part})" style="width: 100%; margin-top: 1rem; background: var(--primary-gradient);">
                    ✍️ Thực hành làm bài Part ${lesson.part} ngay
                </button>
            </div>
        `;

        // Click handler to toggle accordion
        const header = card.querySelector('.lesson-header');
        header.addEventListener('click', () => {
            toggleLessonAccordion(card, bodyId);
        });

        container.appendChild(card);
    });
}

function toggleLessonAccordion(card, bodyId) {
    const body = document.getElementById(bodyId);
    const icon = card.querySelector('.accordion-icon');
    const header = card.querySelector('.lesson-header');
    if (!body || !icon || !header) return;

    const isOpen = !body.classList.contains('hidden');

    // Close all other accordions first
    document.querySelectorAll('.lesson-body').forEach(b => {
        b.classList.add('hidden');
        b.style.display = 'none';
    });
    document.querySelectorAll('.accordion-icon').forEach(i => {
        i.style.transform = 'rotate(0deg)';
    });
    document.querySelectorAll('.lesson-header').forEach(h => {
        h.style.borderBottomColor = 'transparent';
    });

    if (!isOpen) {
        body.classList.remove('hidden');
        body.style.display = 'block';
        icon.style.transform = 'rotate(180deg)';
        header.style.borderBottomColor = 'var(--color-border)';
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function startLessonPractice(mode, part) {
    if (mode === 'speaking') {
        startSpeakingModule();
        const qIndex = speakingData.questions.findIndex(q => q.part === part);
        if (qIndex !== -1) {
            speakWriteState.currentIndex = qIndex;
            renderSpeakingQuestion();
        }
    } else {
        startWritingModule();
        const qIndex = writingData.questions.findIndex(q => q.part === part);
        if (qIndex !== -1) {
            speakWriteState.currentIndex = qIndex;
            renderWritingQuestion();
        }
    }
}

