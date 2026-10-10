/**
 * QuizEngine - Modular OOP Architecture (Solution A)
 */

const QUESTIONS_DATA = [
    {
        id: 1,
        question: "Which HTML5 element represents self-contained, independently distributable content?",
        options: ["<section>", "<article>", "<aside>", "<main>"],
        answer: 1,
        explanation: "<article> represents a self-contained composition (such as a forum post or blog article) intended to be independently distributable."
    },
    {
        id: 2,
        question: "In CSS Flexbox, which property aligns items along the cross-axis?",
        options: ["justify-content", "align-items", "flex-direction", "align-content"],
        answer: 1,
        explanation: "'align-items' aligns flex items along the cross-axis, whereas 'justify-content' aligns along the main axis."
    },
    {
        id: 3,
        question: "What is the return type of an 'async' JavaScript function?",
        options: ["Callback function", "Observable", "Promise", "Generator"],
        answer: 2,
        explanation: "An async function always implicitly returns a Promise, resolved with the value returned by the async function."
    },
    {
        id: 4,
        question: "Which HTTP header is strictly utilized to defend against Clickjacking attacks?",
        options: ["X-Frame-Options", "X-Content-Type-Options", "Content-Security-Policy", "Both X-Frame-Options & CSP frame-ancestors"],
        answer: 3,
        explanation: "Both X-Frame-Options: DENY and Content-Security-Policy: frame-ancestors 'none' protect web pages from being embedded in iframes."
    },
    {
        id: 5,
        question: "Which REST HTTP method is designed to be idempotent and safe for data retrieval?",
        options: ["POST", "GET", "PUT", "DELETE"],
        answer: 1,
        explanation: "GET requests retrieve data without altering server state, making them both safe and idempotent."
    }
];

class QuizEngine {
    constructor(questions) {
        this.questions = questions;
        this.currentIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.timer = null;
        this.timeLeft = 30;

        // Cache DOM elements
        this.quizScreen = document.getElementById('quizScreen');
        this.resultScreen = document.getElementById('resultScreen');
        this.questionTitle = document.getElementById('questionTitle');
        this.optionsContainer = document.getElementById('optionsContainer');
        this.questionCounter = document.getElementById('questionCounter');
        this.scoreTracker = document.getElementById('scoreTracker');
        this.progressBar = document.getElementById('progressBar');
        this.timerText = document.getElementById('timerText');
        this.feedbackNotice = document.getElementById('feedbackNotice');
        this.nextBtn = document.getElementById('nextBtn');
        this.finalScoreTitle = document.getElementById('finalScoreTitle');
        this.feedbackSummary = document.getElementById('feedbackSummary');
        this.reviewContainer = document.getElementById('reviewContainer');
        this.reviewList = document.getElementById('reviewList');
        this.reviewBtn = document.getElementById('reviewBtn');
        this.restartBtn = document.getElementById('restartBtn');

        this.initEvents();
        this.startQuiz();
    }

    initEvents() {
        this.nextBtn.addEventListener('click', () => this.handleNextQuestion());
        this.reviewBtn.addEventListener('click', () => this.toggleReview());
        this.restartBtn.addEventListener('click', () => this.restartQuiz());
    }

    startQuiz() {
        this.currentIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.quizScreen.classList.remove('hidden');
        this.resultScreen.classList.add('hidden');
        this.reviewContainer.classList.add('hidden');
        this.loadQuestion();
    }

    loadQuestion() {
        const q = this.questions[this.currentIndex];
        this.questionTitle.textContent = `${this.currentIndex + 1}. ${q.question}`;
        this.questionCounter.textContent = `Question ${this.currentIndex + 1} of ${this.questions.length}`;
        this.scoreTracker.textContent = `Score: ${this.score * 20} pts`;
        this.progressBar.style.width = `${((this.currentIndex + 1) / this.questions.length) * 100}%`;

        this.feedbackNotice.classList.add('hidden');
        this.nextBtn.classList.add('hidden');
        this.optionsContainer.innerHTML = '';

        q.options.forEach((optText, idx) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = `${String.fromCharCode(65 + idx)}. ${optText}`;
            btn.addEventListener('click', () => this.handleSelectOption(idx));
            this.optionsContainer.appendChild(btn);
        });

        this.resetTimer();
    }

    resetTimer() {
        clearInterval(this.timer);
        this.timeLeft = 30;
        this.updateTimerDisplay();
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();
            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                this.handleTimeout();
            }
        }, 1000);
    }

    updateTimerDisplay() {
        const secs = this.timeLeft < 10 ? `0${this.timeLeft}` : this.timeLeft;
        this.timerText.textContent = `00:${secs}`;
    }

    handleSelectOption(selectedIdx) {
        clearInterval(this.timer);
        const q = this.questions[this.currentIndex];
        const buttons = this.optionsContainer.querySelectorAll('.option-btn');
        buttons.forEach(btn => btn.disabled = true);

        const isCorrect = selectedIdx === q.answer;
        this.userAnswers.push({ question: q.question, selected: selectedIdx, correct: q.answer, explanation: q.explanation });

        if (isCorrect) {
            this.score++;
            buttons[selectedIdx].classList.add('selected-correct');
            this.feedbackNotice.textContent = '✓ Correct Answer!';
            this.feedbackNotice.className = 'feedback-notice correct';
        } else {
            buttons[selectedIdx].classList.add('selected-wrong');
            buttons[q.answer].classList.add('selected-correct');
            this.feedbackNotice.textContent = '✗ Incorrect Answer!';
            this.feedbackNotice.className = 'feedback-notice wrong';
        }

        this.feedbackNotice.classList.remove('hidden');
        this.nextBtn.classList.remove('hidden');
    }

    handleTimeout() {
        const q = this.questions[this.currentIndex];
        const buttons = this.optionsContainer.querySelectorAll('.option-btn');
        buttons.forEach(btn => btn.disabled = true);
        buttons[q.answer].classList.add('selected-correct');

        this.userAnswers.push({ question: q.question, selected: -1, correct: q.answer, explanation: q.explanation });
        this.feedbackNotice.textContent = '⏱️ Time Expired!';
        this.feedbackNotice.className = 'feedback-notice wrong';
        this.feedbackNotice.classList.remove('hidden');
        this.nextBtn.classList.remove('hidden');
    }

    handleNextQuestion() {
        this.currentIndex++;
        if (this.currentIndex < this.questions.length) {
            this.loadQuestion();
        } else {
            this.showResults();
        }
    }

    showResults() {
        clearInterval(this.timer);
        this.quizScreen.classList.add('hidden');
        this.resultScreen.classList.remove('hidden');

        const percentage = Math.round((this.score / this.questions.length) * 100);
        this.finalScoreTitle.textContent = `Your Score: ${this.score} / ${this.questions.length} (${percentage}%)`;

        if (percentage >= 80) {
            this.feedbackSummary.textContent = 'Outstanding Performance! You demonstrate advanced mastery of modern Web Technologies.';
        } else if (percentage >= 60) {
            this.feedbackSummary.textContent = 'Good Effort! You have solid foundational knowledge with minor gaps in protocols or CSS.';
        } else {
            this.feedbackSummary.textContent = 'Needs Review. Spend time exploring semantic HTML, promises, and web security concepts.';
        }
    }

    toggleReview() {
        const isHidden = this.reviewContainer.classList.contains('hidden');
        if (isHidden) {
            this.renderReviewList();
            this.reviewContainer.classList.remove('hidden');
            this.reviewBtn.textContent = 'Hide Review';
        } else {
            this.reviewContainer.classList.add('hidden');
            this.reviewBtn.textContent = 'Review Answers';
        }
    }

    renderReviewList() {
        this.reviewList.innerHTML = '';
        this.userAnswers.forEach((ans, idx) => {
            const item = document.createElement('div');
            item.className = 'review-item';
            const wasCorrect = ans.selected === ans.correct;
            const qObj = this.questions[idx];

            item.innerHTML = `
                <div class="review-q">${idx + 1}. ${ans.question}</div>
                <div class="review-ans">
                    <span style="color: ${wasCorrect ? '#16a34a' : '#dc2626'}; font-weight: 700;">
                        ${wasCorrect ? '✓ Your Answer: ' : '✗ Your Answer: '} 
                        ${ans.selected >= 0 ? qObj.options[ans.selected] : 'Timed Out'}
                    </span><br>
                    <strong>Correct:</strong> ${qObj.options[ans.correct]}<br>
                    <small><em>Explanation: ${ans.explanation}</em></small>
                </div>
            `;
            this.reviewList.appendChild(item);
        });
    }

    restartQuiz() {
        this.startQuiz();
    }
}

// Global initialization
let quiz;
document.addEventListener('DOMContentLoaded', () => {
    quiz = new QuizEngine(QUESTIONS_DATA);

    // Support URL param demo=1 for automated test interaction
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('demo') === '1') {
        quiz.handleSelectOption(1); // Select correct option for question 1
    }
});
