/**
 * Web Technology Lab - EXP 4: Website Chatbot using AI Services
 * Client-Side Conversational Interface Engine & Knowledge Base
 */

// Knowledge Base for Intelligent Local AI Demonstration Mode
const KNOWLEDGE_BASE = [
    {
        keywords: ['flexbox', 'grid', 'difference between flexbox and grid', 'layout'],
        title: "CSS Flexbox vs. CSS Grid",
        response: `**Flexbox vs. CSS Grid Comparison:**\n\n• **CSS Flexbox (1D Layout):** Designed for one-dimensional layouts (either a row OR a column). Ideal for navigation bars, button groups, and aligning child elements along an axis.\n\`\`\`css\n.container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\`\`\`\n\n• **CSS Grid (2D Layout):** Designed for two-dimensional layouts (rows AND columns simultaneously). Best suited for whole-page layouts, dashboards, and photo galleries.\n\`\`\`css\n.dashboard {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1.5rem;\n}\n\`\`\`\n\n*Rule of thumb:* Use Flexbox for component-level alignment; use Grid for structural layout grids!`
    },
    {
        keywords: ['rest', 'api', 'restful', 'endpoints', 'http methods'],
        title: "RESTful API Architecture",
        response: `**Understanding REST APIs:**\n\nREST (Representational State Transfer) is an architectural style for networked web applications that communicates over HTTP.\n\n**Core HTTP Methods:**\n• \`GET\`: Retrieve data from server (idempotent, safe)\n• \`POST\`: Submit new data or create resources\n• \`PUT / PATCH\`: Update entire resource or partial update\n• \`DELETE\`: Remove a resource\n\n**Key Principles:**\n1. **Statelessness:** Every client request contains all context needed by the server.\n2. **Client-Server Separation:** UI concerns are divorced from data storage.\n3. **Uniform Interface:** Standard URIs (e.g., \`/api/users/42\`) and standardized JSON response payloads.`
    },
    {
        keywords: ['promise', 'promises', 'async', 'await', 'asynchronous'],
        title: "JavaScript Promises & Async/Await",
        response: `**JavaScript Asynchronous Programming:**\n\nA **Promise** represents an eventual completion (or failure) of an asynchronous operation and its resulting value.\n\n**Three States:** \`Pending\`, \`Fulfilled\`, \`Rejected\`.\n\n\`\`\`javascript\n// Modern Async/Await Pattern\nasync function fetchStudentData(id) {\n  try {\n    const response = await fetch(\`/api/students/\${id}\`);\n    if (!response.ok) throw new Error('Network error');\n    const data = await response.json();\n    console.log('Success:', data);\n  } catch (error) {\n    console.error('Fetch failed:', error.message);\n  }\n}\n\`\`\`\n\nAsync/Await is syntactic sugar over Promises, making asynchronous code read synchronously and cleanly.`
    },
    {
        keywords: ['security', 'xss', 'csrf', 'web security', 'sanitize', 'vulnerabilities'],
        title: "Web Application Security Essentials",
        response: `**Core Web Application Security Principles:**\n\n1. **Cross-Site Scripting (XSS):** Malicious scripts injected into benign web pages. *Defense:* Never trust user input. Use \`textContent\` instead of \`innerHTML\`, and implement a strict **Content Security Policy (CSP)**.\n2. **Cross-Site Request Forgery (CSRF):** Unauthorized commands submitted on behalf of authenticated users. *Defense:* Implement anti-CSRF tokens and set cookies with \`SameSite=Strict\`.\n3. **Transport Security:** Enforce HTTPS (TLS 1.3) with HTTP Strict Transport Security (\`HSTS\`).\n4. **SQL/NoSQL Injection:** Always use parameterized queries and ORMs with automatic escaping.`
    },
    {
        keywords: ['semantic', 'html', 'semantic html', 'seo', 'accessibility', 'a11y'],
        title: "Semantic HTML & Accessibility",
        response: `**Why Semantic HTML Matters:**\n\nSemantic HTML introduces tags that describe their meaning to both the browser and developer, rather than just purely visual rendering (\`<div>\` or \`<span>\`).\n\n**Essential Semantic Elements:**\n• \`<header>\`, \`<nav>\`: Document header and primary navigational pathways.\n• \`<main>\`: The dominant content unique to this document.\n• \`<article>\`, \`<section>\`: Self-contained syndicatable units and thematic groupings.\n• \`<aside>\`: Tangentially related side content.\n• \`<footer>\`: Authorship, copyright, and auxiliary links.\n\n**Benefits:** Dramatic boosts in screen-reader accessibility (WCAG compliance) and SEO crawling fidelity.`
    },
    {
        keywords: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon'],
        title: "Greetings",
        response: `Hello there! 👋 Welcome to the Web Technology Lab AI interface.\n\nI can assist you with web architecture, frontend styling, JavaScript algorithms, API security, and practical lab experiments. What would you like to explore today?`
    },
    {
        keywords: ['wtl', 'experiment', 'lab', 'aim', 'syllabus', 'exp4', 'exp 4'],
        title: "WTL Experiment 4 Overview",
        response: `**Experiment 4: Website Chatbot Using AI Services**\n\n• **Aim:** Develop an interactive website chatbot utilizing conversational interfaces and AI principles.\n• **Frontend:** Semantic HTML5 layout, CSS3 responsive dark glass theme, Vanilla JavaScript message dispatcher.\n• **Security Notice:** API keys must never be hardcoded into frontend client scripts. This environment uses a secure zero-leak local demonstration engine with fallback intent classification.`
    }
];

// Fallback response for unmapped topics
const FALLBACK_RESPONSE = `I'm an AI assistant specialized in **Web Technologies**. While I didn't find an exact match for your query, here are some topics I can answer in detail:\n\n• **CSS Flexbox vs Grid**\n• **RESTful APIs & HTTP Verbs**\n• **JavaScript Promises & Async/Await**\n• **Web Application Security (XSS, CSRF, CSP)**\n• **Semantic HTML & WCAG Accessibility**\n\nTry clicking one of the suggested quick inquiry chips on the left panel!`;

// DOM Element References
const messagesContainer = document.getElementById('messagesContainer');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const typingIndicator = document.getElementById('typingIndicator');
const clearChatBtn = document.getElementById('clearChatBtn');
const suggestionChips = document.getElementById('suggestionChips');

// Initialize timestamps
document.addEventListener('DOMContentLoaded', () => {
    const initialTime = document.getElementById('initialTime');
    if (initialTime) {
        initialTime.textContent = getCurrentTime();
    }
});

// Format current time HH:MM AM/PM
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Simple Markdown-to-HTML formatter
function formatMarkdown(text) {
    let formatted = text;

    // Code blocks ```code```
    formatted = formatted.replace(/```([\s\S]*?)```/g, function(match, code) {
        return `<pre><code>${escapeHtml(code.trim())}</code></pre>`;
    });

    // Inline code `code`
    formatted = formatted.replace(/`([^`]+)`/g, function(match, code) {
        return `<code>${escapeHtml(code)}</code>`;
    });

    // Bold **text**
    formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Bullet points
    const lines = formatted.split('\n');
    let inList = false;
    let result = [];

    for (let line of lines) {
        if (line.trim().startsWith('• ') || line.trim().startsWith('- ')) {
            if (!inList) {
                result.push('<ul>');
                inList = true;
            }
            result.push(`<li>${line.trim().substring(2)}</li>`);
        } else {
            if (inList) {
                result.push('</ul>');
                inList = false;
            }
            if (line.trim().length > 0 && !line.startsWith('<pre>') && !line.startsWith('</pre>')) {
                result.push(`<p>${line}</p>`);
            } else if (line.trim().length > 0) {
                result.push(line);
            }
        }
    }
    if (inList) result.push('</ul>');

    return result.join('');
}

function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

// Append a message to the chat window
function appendMessage(sender, text, isUser = false) {
    const row = document.createElement('div');
    row.className = `message-row ${isUser ? 'user-row' : 'bot-row'}`;

    const avatar = document.createElement('div');
    avatar.className = 'msg-avatar';
    avatar.textContent = isUser ? '👤' : '🤖';

    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';

    const authorHeader = document.createElement('div');
    authorHeader.className = 'msg-author';
    authorHeader.innerHTML = `${sender} <span class="msg-time">${getCurrentTime()}</span>`;

    const content = document.createElement('div');
    content.className = 'msg-content';
    content.innerHTML = isUser ? `<p>${escapeHtml(text)}</p>` : formatMarkdown(text);

    bubble.appendChild(authorHeader);
    bubble.appendChild(content);

    row.appendChild(avatar);
    row.appendChild(bubble);

    messagesContainer.appendChild(row);
    scrollToBottom();
}

// Scroll chat container to bottom
function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Intent resolution engine
function resolveIntent(query) {
    const clean = query.toLowerCase().trim();

    for (const item of KNOWLEDGE_BASE) {
        for (const kw of item.keywords) {
            if (clean.includes(kw)) {
                return item.response;
            }
        }
    }
    return FALLBACK_RESPONSE;
}

// Main Send Message Handler
function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return; // Prevent empty message submission

    // Display user message
    appendMessage('You', text, true);
    userInput.value = '';

    // Show typing indicator
    showTyping(true);

    // Realistic cognitive response latency (600ms - 900ms)
    const simulatedDelay = Math.floor(Math.random() * 300) + 600;

    setTimeout(() => {
        showTyping(false);
        const botReply = resolveIntent(text);
        appendMessage('WebTech Bot', botReply, false);
    }, simulatedDelay);
}

// Toggle typing indicator visibility
function showTyping(show) {
    if (show) {
        typingIndicator.classList.remove('hidden');
        messagesContainer.appendChild(typingIndicator);
        scrollToBottom();
    } else {
        typingIndicator.classList.add('hidden');
    }
}

// Clear Chat Action
clearChatBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear the conversation?')) {
        messagesContainer.innerHTML = '';
        appendMessage('WebTech Bot', 'Conversation cleared. How can I help you today?', false);
    }
});

// Quick suggestion chips handler
if (suggestionChips) {
    suggestionChips.addEventListener('click', (e) => {
        const chip = e.target.closest('.chip');
        if (chip) {
            const prompt = chip.getAttribute('data-prompt');
            userInput.value = prompt;
            sendMessage();
        }
    });
}

// Keyboard shortcuts: Enter to send
userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Automated interaction demonstration check (for automated headless verification & screenshots)
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('demo') === '1') {
    appendMessage('You', 'What is the difference between Flexbox and Grid?', true);
    appendMessage('WebTech Bot', resolveIntent('flexbox vs grid'), false);
}

