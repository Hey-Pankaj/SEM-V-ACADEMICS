# Automated Project Documentation: AI Conversational Chatbot

**Target Application:** WebTech AI Website Chatbot (`WTL/EXP4`)  
**Experiment Context:** Web Technology Lab — Experiment 9 (Automated Documentation, Test Cases, and Code Comments)  
**Curriculum Alignment Note:** *The laboratory syllabus assigns automated project documentation, test cases, and code comments to both Experiments 8 and 9. Experiment 8 targets the multi-page security dashboard (EXP2), while Experiment 9 applies this automated testing and documentation workflow independently to the conversational AI chatbot (EXP4), as a distinct verified implementation pending faculty confirmation.*

---

## 1. System Overview & Architecture

The **WebTech AI Website Chatbot** is an interactive, browser-based conversational agent designed to assist engineering students with web technology topics. It utilizes an offline natural language intent classification engine paired with asynchronous UI lifecycles (typing bubbles, markdown parsing, and event-driven DOM rendering).

```
[User Input Event] ---> [Input Validation & Sanitization]
                                  |
                                  +---> [Append User Message Bubble]
                                  |
                                  +---> [Show Typing Indicator (600-900ms)]
                                  |
                                  v
                    [Intent Resolution Heuristic]
                    (Keyword matching against Knowledge Matrix)
                                  |
                                  v
                    [Markdown Parser & Entity Escaper]
                                  |
                                  v
                    [Append Bot Response Bubble & Scroll]
```

---

## 2. Technical Stack & Component Inventory

| Component | Technology | Role & Description |
| :--- | :--- | :--- |
| **Document Canvas** | Semantic HTML5 | Structured layout using `<aside>`, `<main>`, `<header>`, `<footer>`, `<form>` |
| **Design System** | Modern CSS3 | Custom CSS variables (`--bg-primary`, `--accent`), Flexbox, CSS Grid, Glassmorphism |
| **Logic Engine** | Vanilla JavaScript | ES6+ event handling, regex parsing, simulated async latency (`setTimeout`) |
| **Typography** | Inter & Fira Code | Dual Google Font stack for natural conversation and monospace code snippets |

---

## 3. Core Engine Mechanics

### A. Intent Resolution Engine (`resolveIntent`)
- Scans user query against array of keyword vectors (`KNOWLEDGE_BASE`).
- Matches technical domains: CSS Layout (Flexbox vs Grid), REST APIs, JavaScript Promises/Async, Web Security (XSS/CSRF/CSP), Semantic HTML.
- Unmapped queries trigger a structured `FALLBACK_RESPONSE` outlining available topics and pointing to quick suggestion chips.

### B. Cognitive Latency & Typing Indicator
- Real-world AI engines exhibit processing latency. The client emulates this with a randomized delay between 600ms and 900ms.
- Displays an animated three-dot pulsing bubble (`#typingIndicator`), automatically scrolling the container to keep it in view.

### C. Markdown Parsing & Security Sanitization
- Replaces triple-backtick blocks with `<pre><code>` wrappers.
- Converts inline backticks to `<code>`.
- Converts `**bold**` asterisks to `<strong>` tags.
- Converts bullet points (`•` / `-`) into semantic `<ul><li>` structures.
- Crucially passes all raw user strings through `escapeHtml()` to neutralize potential XSS script injections.

---

## 4. Responsive Viewport Strategy
- **Desktop (>860px):** Two-pane layout with 320px persistent sidebar on the left and primary chat stream on the right.
- **Mobile (<=860px):** Sidebar collapses completely (`display: none`), expanding the chat feed and input dock to 100% viewport width.

---

## 5. Execution & Verification Steps
1. Open [commented-source-code/index.html](file:///c:/Users/panka/OneDrive/Desktop/ACADEMICS/SEM-V-ACADEMICS/WTL/EXP9/commented-source-code/index.html) or `WTL/EXP4/index.html` in any web browser.
2. Enter inquiries via keyboard or click sidebar suggestion chips.
3. Observe typing indicator animation followed by formatted response.
