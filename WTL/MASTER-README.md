# Web Technology Lab (WTL) — Master Experiment Index (Experiments 4–10)

This master document indexes the practical implementations, automated test suites, architectural documentation, and output captures for **Experiments 4 through 10** of the Web Technology Laboratory course (Semester V, Computer Engineering).

---

## 1. Quick Navigation Table

| Experiment | Title | Core Technologies | Status | Link |
| :---: | :--- | :--- | :---: | :---: |
| **EXP 4** | Website Chatbot Using AI Services | HTML5, CSS3 Glassmorphism, Vanilla JS, Intent NLP Engine | ✅ Complete | [EXP4 README](./EXP4/README.md) |
| **EXP 5** | Identify, Debug, and Optimize Errors Using AI Tools | AST Analysis, WCAG Contrast Heuristics, HTML5/CSS3 | ✅ Complete | [EXP5 README](./EXP5/README.md) |
| **EXP 6** | Deploy an AI-Enabled Web Application | Vercel Edge CDN, Netlify, HTTP Security Headers, Jamstack | ✅ Complete | [EXP6 README](./EXP6/README.md) |
| **EXP 7** | Compare Multiple AI Coding Assistants | Modular OOP vs. Functional Reactive State, LocalStorage | ✅ Complete | [EXP7 README](./EXP7/README.md) |
| **EXP 8** | Automated Documentation & Test Cases (EXP2 Target) | Headless Browser Automation, Markdown AST, WCAG 2.1 | ✅ Complete | [EXP8 README](./EXP8/README.md) |
| **EXP 9** | Automated Documentation & Test Cases (EXP4 Chatbot) | Heuristic Testing Suite, Entity Escaping, Intent Parser | ✅ Complete | [EXP9 README](./EXP9/README.md) |
| **EXP 10** | Compare Different AI-Generated Web App Solutions | Class-based Engine vs. Functional Reactive State Machine | ✅ Complete | [EXP10 README](./EXP10/README.md) |

---

## 2. Detailed Experiment Summaries & Execution Instructions

### [Experiment 4 — Website Chatbot Using AI Services](./EXP4/README.md)
- **Aim:** Develop an interactive website chatbot using conversational interfaces and AI principles.
- **Overview:** Features an AI assistant for Web Technology topics (Flexbox/Grid, REST APIs, Promises, Web Security). Includes keyboard dispatch (`Enter`), animated typing indicator for realistic cognitive latency, quick suggestion chips, and zero-leak offline demonstration mode.
- **How to Run:** Open [WTL/EXP4/index.html](./EXP4/index.html) in any modern web browser.
- **Deliverables:** `index.html`, `style.css`, `script.js`, `README.md`, `screenshots/output.png`, `screenshots/chat-interaction.png`.

### [Experiment 5 — Identify, Debug, and Optimize Errors Using AI Tools](./EXP5/README.md)
- **Aim:** Identify, debug, and optimize errors in an existing web project using AI tools.
- **Target Project:** Reuses the multi-page website from Experiment 2 (Bank of India Security Dashboard).
- **Overview:** Systematically audited navigation desynchronization, trapped mobile drawers, WCAG color contrast violations, missing input validation patterns, and redundant CSS declarations. Preserved original in `before/` and enhanced version in `after/`.
- **How to Run:** Open [WTL/EXP5/before/index.html](./EXP5/before/index.html) and [WTL/EXP5/after/index.html](./EXP5/after/index.html).
- **Deliverables:** `debugging-report.md`, `before/`, `after/`, `README.md`, `screenshots/before.png`, `screenshots/after.png`.

### [Experiment 6 — Deploy an AI-Enabled Web Application](./EXP6/README.md)
- **Aim:** Deploy an AI-enabled web application to a cloud platform and optimize it using AI recommendations.
- **Target Project:** Production-hardened cloud package of the WebTech AI Assistant.
- **Overview:** Fully prepared for cloud hosting on Vercel and Netlify. Injects HTTP Strict Transport Security (HSTS), Content Security Policy (CSP), anti-clickjacking headers, and edge caching directives.
- **How to Run:** 
  - Local verification: `npm start` (serves on port 3000) or open [WTL/EXP6/index.html](./EXP6/index.html).
  - Cloud deployment: Run `npx vercel --prod` or `npx netlify deploy --prod --dir=.`.
- **Deliverables:** `index.html`, `style.css`, `script.js`, `vercel.json`, `netlify.toml`, `package.json`, `deployment-notes.md`, `optimization-report.md`, `screenshots/local-output.png`.

### [Experiment 7 — Compare Multiple AI Coding Assistants](./EXP7/README.md)
- **Aim:** Compare multiple AI coding assistants for web development tasks.
- **Shared Task:** Responsive Personal Finance & Budget Tracker.
- **Overview:** Implemented via Assistant A (GitHub Copilot style: modular OOP `BudgetApp`) and Assistant B (Claude style: functional reactive glassmorphic UI with dynamic category spending bars).
- **How to Run:** Open [WTL/EXP7/assistant-a/index.html](./EXP7/assistant-a/index.html) and [WTL/EXP7/assistant-b/index.html](./EXP7/assistant-b/index.html).
- **Deliverables:** `assistant-a/`, `assistant-b/`, `comparison.md`, `README.md`, `screenshots/assistant-a.png`, `screenshots/assistant-b.png`.

### [Experiment 8 — Automated Documentation, Test Cases, and Code Comments (EXP2 Target)](./EXP8/README.md)
- **Aim:** Generate automated documentation, test suites, and code comments using AI tools for the Experiment 2 multi-page website.
- **Target Project:** Bank of India Security Dashboard (`WTL/EXP2`). Original source files strictly preserved.
- **Overview:** Comprehensive architectural report, 10-point test case execution suite with 100% pass rate, and educational commented source code.
- **How to Run:** Open [WTL/EXP8/commented-source-code/index.html](./EXP8/commented-source-code/index.html).
- **Deliverables:** `documentation/project-documentation.md`, `test-cases.md`, `commented-source-code/`, `README.md`, `screenshots/` (website output, documentation, test cases, commented code).

### [Experiment 9 — Follow Actual Lab Instructions (EXP4 Chatbot Target)](./EXP9/README.md)
- **Aim:** Generate automated documentation, test suites, and code comments using AI tools.
- **Curriculum Note:** *To avoid duplicating Experiment 8, this experiment independently applies the automated testing and documentation workflow to the AI Chatbot application from Experiment 4, submitted as a distinct implementation pending faculty confirmation.*
- **Overview:** Exhaustive architectural review of the intent resolution engine, typing latency simulator, and XSS sanitization safeguards, alongside a verified 10-point test matrix.
- **How to Run:** Open [WTL/EXP9/commented-source-code/index.html](./EXP9/commented-source-code/index.html).
- **Deliverables:** `documentation/project-documentation.md`, `test-cases.md`, `commented-source-code/`, `README.md`, `screenshots/` (website output, documentation, test cases, commented code).

### [Experiment 10 — Compare Different AI-Generated Web Application Solutions](./EXP10/README.md)
- **Aim:** Develop a web application using different AI-generated code solutions and evaluate their effectiveness.
- **Shared Task:** Interactive Web Technology Quiz & Skill Assessment Portal.
- **Overview:** Solution A implements an Object-Oriented Component Architecture (`class QuizEngine`) with corporate enterprise styling; Solution B implements a Functional Reactive State Machine with ambient glassmorphism, streak counters, and a circular mastery score orb.
- **How to Run:** Open [WTL/EXP10/solution-a/index.html](./EXP10/solution-a/index.html) and [WTL/EXP10/solution-b/index.html](./EXP10/solution-b/index.html).
- **Deliverables:** `solution-a/`, `solution-b/`, `comparison.md`, `README.md`, `screenshots/solution-a.png`, `screenshots/solution-b.png`, `screenshots/test-results.png`.

---

## 3. Master Verification & Quality Checklist

| Experiment | Source Code Present | README Complete | Automated Execution | Tests Passed | Screenshots Captured | Cloud Status |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **EXP 4** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ 8 / 8 Pass | ✅ 2 PNGs | N/A (Client/Local) |
| **EXP 5** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ 5 / 5 Pass | ✅ 2 PNGs | N/A (Client/Local) |
| **EXP 6** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ 4 / 4 Pass | ✅ 1 PNG (Local) | Pending User Credentials |
| **EXP 7** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ 4 / 4 Pass | ✅ 2 PNGs | N/A (Client/Local) |
| **EXP 8** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ 10 / 10 Pass | ✅ 4 PNGs | N/A (Client/Local) |
| **EXP 9** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ 10 / 10 Pass | ✅ 4 PNGs | N/A (Client/Local) |
| **EXP 10** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ 6 / 6 Pass | ✅ 3 PNGs | N/A (Client/Local) |

---

## 4. Preservation of Prior Experiments (EXP 1–3)
In compliance with lab instructions:
- `WTL/EXP1` (AI-Assisted Personal Profile Webpages) remains completely untouched.
- `WTL/EXP2` (BOI Security Dashboard) remains completely untouched.
- `WTL/EXP3` (Interactive JavaScript To-Do List) remains completely untouched.
- All subsequent experiments were created in isolated folders (`EXP4` through `EXP10`).
