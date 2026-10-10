/**
 * Nexus Quiz Engine - Functional Reactive Architecture (Solution B)
 */

const QUESTIONS = [
    {
        id: 1,
        category: "HTML5 & Semantic Web",
        question: "Which HTML5 element represents self-contained, independently distributable content?",
        options: ["<section>", "<article>", "<aside>", "<main>"],
        answer: 1,
        explanation: "<article> represents a self-contained composition intended to be independently distributable."
    },
    {
        id: 2,
        category: "CSS Layout & Flexbox",
        question: "In CSS Flexbox, which property aligns items along the cross-axis?",
        options: ["justify-content", "align-items", "flex-direction", "align-content"],
        answer: 1,
        explanation: "'align-items' controls alignment along the cross axis."
    },
    {
        id: 3,
        category: "JavaScript Asynchrony",
        question: "What is the return type of an 'async' JavaScript function?",
        options: ["Callback function", "Observable", "Promise", "Generator"],
        answer: 2,
        explanation: "Async functions return a Promise by specification."
    },
    {
        id: 4,
        category: "Web Security & Headers",
        question: "Which HTTP header is strictly utilized to defend against Clickjacking attacks?",
        options: ["X-Frame-Options", "X-Content-Type-Options", "Content-Security-Policy", "Both X-Frame-Options & CSP frame-ancestors"],
        answer: 3,
        explanation: "Both X-Frame-Options: DENY and CSP frame-ancestors block unauthorized iframe embedding."
    },
    {
        id: 5,
        category: "RESTful Web APIs",
        question: "Which REST HTTP method is designed to be idempotent and safe for data retrieval?",
        options: ["POST", "GET", "PUT", "DELETE"],
        answer: 1,
        explanation: "GET requests are read-only, safe, and idempotent."
    }
];

// Reactive Application State Store
const state = {
    currentIndex: 0,
    score: 0,
    streak: 0,
    timeLeft: 30,
    timerActive: true,
    userAnswers: [],
    isFinished: false,
    showReview: false
};

let timerInterval = null;

// Pure Mutation Functions
function startTimer() {
    clearInterval(timerInterval);
    state.timeLeft = 30;
    state.timerActive = true;
    updateTimerDOM();

    timerInterval = setInterval(() => {
        if (state.timeLeft > 0 && state.timerActive) {
            state.timeLeft--;
            updateTimerDOM();
        } else if (state.timeLeft <= 0) {
            clearInterval(timerInterval);
            selectOption(-1);
        }
    }, 1000);
}

function updateTimerDOM() {
    const el = document.getElementById('timerValue');
    if (el) el.textContent = `${state.timeLeft}s`;
}

function selectOption(idx) {
    state.timerActive = false;
    clearInterval(timerInterval);

    const q = QUESTIONS[state.currentIndex];
    const isCorrect = idx === q.answer;

    if (isCorrect) {
        state.score += 20;
        state.streak++;
    } else {
        state.streak = 0;
    }

    state.userAnswers.push({
        qIndex: state.currentIndex,
        selected: idx,
        correct: q.answer,
        isCorrect
    });

    renderOptionSelection(idx, q.answer, isCorrect);
}

function advanceNext() {
    if (state.currentIndex < QUESTIONS.length - 1) {
        state.currentIndex++;
        renderQuestionStage();
        startTimer();
    } else {
        state.isFinished = true;
        renderResults();
    }
}

function restart() {
    state.currentIndex = 0;
    state.score = 0;
    state.streak = 0;
    state.userAnswers = [];
    state.isFinished = false;
    state.showReview = false;
    document.getElementById('resultStage').classList.add('hidden');
    document.getElementById('quizStage').classList.remove('hidden');
    renderQuestionStage();
    startTimer();
}

function toggleReview() {
    state.showReview = !state.showReview;
    const ledger = document.getElementById('reviewLedger');
    const btn = document.getElementById('reviewTriggerBtn');
    if (state.showReview) {
        renderReviewLedger();
        ledger.classList.remove('hidden');
        btn.textContent = 'Hide Review';
    } else {
        ledger.classList.add('hidden');
        btn.textContent = 'Detailed Review';
    }
}

// Renderers
function renderQuestionStage() {
    const q = QUESTIONS[state.currentIndex];
    document.getElementById('qCategory').textContent = q.category;
    document.getElementById('qIndicator').textContent = `Question ${state.currentIndex + 1} / ${QUESTIONS.length}`;
    document.getElementById('scoreTracker').textContent = `Score: ${state.score} XP`;
    document.getElementById('streakPill').textContent = `🔥 Streak: ${state.streak}`;
    document.getElementById('trackFill').style.width = `${((state.currentIndex + 1) / QUESTIONS.length) * 100}%`;
    document.getElementById('qText').textContent = q.question;

    const stream = document.getElementById('optionsStream');
    stream.innerHTML = '';

    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'glass-opt-btn';
        btn.innerHTML = `<span class="opt-prefix">${String.fromCharCode(65 + idx)}</span> <span>${opt}</span>`;
        btn.addEventListener('click', () => selectOption(idx));
        stream.appendChild(btn);
    });

    document.getElementById('feedbackBanner').classList.add('hidden');
    document.getElementById('nextActionBtn').classList.add('hidden');
}

function renderOptionSelection(selectedIdx, correctIdx, isCorrect) {
    const stream = document.getElementById('optionsStream');
    const buttons = stream.querySelectorAll('.glass-opt-btn');
    buttons.forEach(b => b.disabled = true);

    if (selectedIdx >= 0) {
        buttons[selectedIdx].classList.add(isCorrect ? 'correct' : 'wrong');
    }
    buttons[correctIdx].classList.add('correct');

    const banner = document.getElementById('feedbackBanner');
    banner.textContent = isCorrect ? '✓ Exceptional! Correct Answer.' : '✗ Incorrect Response.';
    banner.className = `feedback-banner ${isCorrect ? 'correct' : 'wrong'}`;
    banner.classList.remove('hidden');

    document.getElementById('nextActionBtn').classList.remove('hidden');
}

function renderResults() {
    document.getElementById('quizStage').classList.add('hidden');
    const stage = document.getElementById('resultStage');
    stage.classList.remove('hidden');

    const total = QUESTIONS.length * 20;
    const percent = Math.round((state.score / total) * 100);

    document.getElementById('orbPercent').textContent = `${percent}%`;
    document.getElementById('resultHeading').textContent = `Performance: ${state.score} / ${total} XP`;

    const blurb = document.getElementById('resultBlurb');
    if (percent >= 80) {
        blurb.textContent = 'Master Level Achieved! Stellar grasp of advanced web engineering, HTTP standards, and async JavaScript.';
    } else if (percent >= 60) {
        blurb.textContent = 'Competent Practitioner! Solid frontend fundamentals with room for optimization in protocols and layouts.';
    } else {
        blurb.textContent = 'Apprentice Stage. Review semantic HTML5, modern flexbox layouts, and HTTP security headers.';
    }
}

function renderReviewLedger() {
    const ledger = document.getElementById('reviewLedger');
    ledger.innerHTML = '';

    state.userAnswers.forEach((ans, idx) => {
        const q = QUESTIONS[ans.qIndex];
        const card = document.createElement('div');
        card.className = 'review-card';
        card.innerHTML = `
            <div class="review-q-title">${idx + 1}. ${q.question}</div>
            <div style="font-size: 0.85rem; color: var(--text-mid); margin-top: 4px;">
                <span style="color: ${ans.isCorrect ? 'var(--emerald)' : 'var(--rose)'}; font-weight: 700;">
                    ${ans.isCorrect ? '✓ Your Choice: ' : '✗ Your Choice: '} ${ans.selected >= 0 ? q.options[ans.selected] : 'Timed Out'}
                </span><br>
                <strong style="color: #fff;">Correct:</strong> ${q.options[ans.correct]}<br>
                <em style="color: var(--text-low);">${q.explanation}</em>
            </div>
        `;
        ledger.appendChild(card);
    });
}

// Lifecycle Init
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('nextActionBtn').addEventListener('click', advanceNext);
    document.getElementById('retryTriggerBtn').addEventListener('click', restart);
    document.getElementById('reviewTriggerBtn').addEventListener('click', toggleReview);

    renderQuestionStage();
    startTimer();

    // Support URL param demo=1 for automated test interaction
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('demo') === '1') {
        selectOption(1);
    }
});
