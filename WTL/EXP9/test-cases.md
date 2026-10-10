# Automated Test Suite: AI Conversational Chatbot

**Target System:** `WTL/EXP4` (Website Chatbot Using AI Services)  
**Experiment Context:** Web Technology Lab — Experiment 9  
**Execution Environment:** Edge Headless & Interactive Browser Engine  
**Suite Status:** 10 / 10 Tests Passed (100% Pass Rate)

---

## Comprehensive Test Execution Matrix

| Test ID | Category | Objective | Pre-conditions | Test Steps | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-EXP9-01** | Interface Init | Verify Welcome Bubble & Layout | Page loaded | 1. Load `index.html`<br>2. Check initial DOM | Bot welcome message displayed with avatar and timestamp | Welcome bubble displayed; input focused | **PASS** |
| **TC-EXP9-02** | Message Dispatch | Enter Key Form Submission | Chat open | 1. Type "What is REST API?"<br>2. Press Enter key | User bubble appended to log; input clears; typing indicator appears | Message sent immediately; input field cleared | **PASS** |
| **TC-EXP9-03** | Message Dispatch | Send Button Click | Chat open | 1. Type "Explain Flexbox vs Grid"<br>2. Click arrow button | Message submitted to conversation stream | Message submitted successfully | **PASS** |
| **TC-EXP9-04** | Input Guard | Prevent Empty / Whitespace Messages | Chat open | 1. Leave input blank<br>2. Click Send button<br>3. Hit Enter key | Submission aborted; no empty bubbles added | Blank submissions strictly prevented | **PASS** |
| **TC-EXP9-05** | Latency Feedback | Typing Indicator Lifecycle | Query dispatched | 1. Observe chat container during 600-900ms window | Animated 3-dot typing bubble appears then hides when reply renders | Indicator displayed and removed on reply | **PASS** |
| **TC-EXP9-06** | Chip Delegation | Suggestion Chip Action Trigger | Sidebar visible | 1. Click "Web Security Basics" chip in sidebar | Chip text transferred to input and automatically dispatched | Query dispatched and answered | **PASS** |
| **TC-EXP9-07** | Markdown Parser | Code Block & Formatting Rendering | Query on Flexbox sent | 1. Inspect response bubble DOM structure | Syntax-formatted `<pre><code>` block and bold highlights rendered | Clean code block displayed | **PASS** |
| **TC-EXP9-08** | Security / A11y | XSS Input Sanitization | Chat open | 1. Type `<script>alert('xss')</script>`<br>2. Submit | Raw HTML tags encoded as safe entity text; no script executed | Rendered as plain text: `&lt;script&gt;` | **PASS** |
| **TC-EXP9-09** | Session Reset | Clear Chat History | Messages in history | 1. Click "Clear Conversation"<br>2. Confirm dialog | History erased; initial greeting re-rendered | History cleared successfully | **PASS** |
| **TC-EXP9-10** | Responsiveness | Mobile Drawer Auto-Collapse | Viewport > 860px | 1. Resize viewport to 375px mobile width | Sidebar collapses cleanly; chat occupies full width | Chat expands to 100% width on mobile | **PASS** |

---

## Test Execution Summary
- **Total Test Cases Executed:** 10
- **Total Passed:** 10
- **Total Failed:** 0
- **Pass Rate:** 100%
- **Verification Statement:** All test cases in this suite were executed against the actual application DOM in the local browser environment and verified as passing.
