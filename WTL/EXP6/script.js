/**
 * Web Technology Lab - EXP 6: Deploy an AI-Enabled Web Application
 * Production-Optimized Client Engine
 */

const CLOUD_KNOWLEDGE_BASE = [
    {
        keywords: ['cdn', 'caching', 'cloud cdn', 'edge caching'],
        title: "Cloud CDN Caching Architecture",
        response: `**How Cloud CDNs Accelerate Web Delivery:**\n\n• **Edge Node PoPs:** CDNs (e.g. Cloudflare, AWS CloudFront, Fastly) cache static HTML, CSS, JavaScript, and media at Points of Presence geographically adjacent to end users.\n• **Latency Reduction:** TTFB (Time to First Byte) drops from 400ms+ round trips down to <25ms.\n• **Cache-Control Directives:**\n\`\`\`http\nCache-Control: public, max-age=31536000, immutable\n\`\`\`\nStatic content with cryptographic hashes can be cached forever, eliminating redundant origin fetches.`
    },
    {
        keywords: ['headers', 'security headers', 'http security', 'hsts', 'csp'],
        title: "Essential HTTP Security Headers",
        response: `**Standard Cloud Security Headers:**\n\n1. **Content-Security-Policy (CSP):** Restricts script sources to defend against XSS:\n\`\`\`http\nContent-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://fonts.googleapis.com;\n\`\`\`\n2. **X-Frame-Options: DENY:** Prevents clickjacking by blocking iframe rendering.\n3. **Strict-Transport-Security (HSTS):** Enforces HTTPS:\n\`\`\`http\nStrict-Transport-Security: max-age=63072000; includeSubDomains; preload\n\`\`\`\n4. **X-Content-Type-Options: nosniff:** Blocks MIME type sniffing.`
    },
    {
        keywords: ['serverless', 'edge', 'edge functions', 'backend'],
        title: "Serverless & Edge Compute",
        response: `**Serverless Edge Functions Explained:**\n\nUnlike traditional long-running VMs, **Edge Functions** execute micro-logic directly inside CDN edge workers (V8 isolates):\n\n• **Zero Cold Starts:** Startup latency is under 5ms.\n• **Global Distribution:** Code runs across 300+ worldwide data centers simultaneously.\n• **Use Cases:** Dynamic routing, authentication validation, geo-targeted personalization, and secure AI API proxying.`
    },
    {
        keywords: ['vitals', 'core web vitals', 'performance', 'lcp', 'fid', 'cls', 'inp'],
        title: "Core Web Vitals Optimization",
        response: `**Optimizing Core Web Vitals (CWV):**\n\n1. **LCP (Largest Contentful Paint) < 2.5s:** Preload hero assets, optimize font loading with \`font-display: swap\`.\n2. **INP (Interaction to Next Paint) < 200ms:** Offload heavy JavaScript execution to Web Workers or requestIdleCallback.\n3. **CLS (Cumulative Layout Shift) < 0.1:** Always define explicit width/height on images and reserve space for dynamic DOM elements.`
    }
];

const FALLBACK_CLOUD_RESPONSE = `I'm your **WebTech Cloud AI Assistant**. I can assist you with cloud hosting architectures, CDN configuration, HTTP security policies, and performance tuning.\n\nTry asking:\n• **How do cloud CDNs improve web performance?**\n• **What are standard HTTP security headers?**\n• **Explain Serverless Edge Functions vs Traditional Backends.**\n• **What are essential Core Web Vitals metrics?**`;

const messagesContainer = document.getElementById('messagesContainer');
const userInput = document.getElementById('userInput');
const typingIndicator = document.getElementById('typingIndicator');
const clearChatBtn = document.getElementById('clearChatBtn');
const suggestionChips = document.getElementById('suggestionChips');

document.addEventListener('DOMContentLoaded', () => {
    const initialTime = document.getElementById('initialTime');
    if (initialTime) initialTime.textContent = getCurrentTime();

    // Check query params for automated demonstration / screenshot generation
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('demo') === '1') {
        appendMessage('You', 'How do cloud CDNs improve web performance?', true);
        appendMessage('WebTech Edge Bot', resolveCloudIntent('cdn caching'), false);
    }
});

function getCurrentTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function formatMarkdown(text) {
    let formatted = text;
    formatted = formatted.replace(/```([\s\S]*?)```/g, (match, code) => `<pre><code>${escapeHtml(code.trim())}</code></pre>`);
    formatted = formatted.replace(/`([^`]+)`/g, (match, code) => `<code>${escapeHtml(code)}</code>`);
    formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    const lines = formatted.split('\n');
    let inList = false;
    let result = [];
    for (let line of lines) {
        if (line.trim().startsWith('• ') || line.trim().startsWith('- ')) {
            if (!inList) { result.push('<ul>'); inList = true; }
            result.push(`<li>${line.trim().substring(2)}</li>`);
        } else {
            if (inList) { result.push('</ul>'); inList = false; }
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

function appendMessage(sender, text, isUser = false) {
    const row = document.createElement('div');
    row.className = `message-row ${isUser ? 'user-row' : 'bot-row'}`;

    const avatar = document.createElement('div');
    avatar.className = 'msg-avatar';
    avatar.textContent = isUser ? '👤' : '🌐';

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
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function resolveCloudIntent(query) {
    const clean = query.toLowerCase().trim();
    for (const item of CLOUD_KNOWLEDGE_BASE) {
        for (const kw of item.keywords) {
            if (clean.includes(kw)) return item.response;
        }
    }
    return FALLBACK_CLOUD_RESPONSE;
}

function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    appendMessage('You', text, true);
    userInput.value = '';

    showTyping(true);
    setTimeout(() => {
        showTyping(false);
        const reply = resolveCloudIntent(text);
        appendMessage('WebTech Edge Bot', reply, false);
    }, 700);
}

function showTyping(show) {
    if (show) {
        typingIndicator.classList.remove('hidden');
        messagesContainer.appendChild(typingIndicator);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    } else {
        typingIndicator.classList.add('hidden');
    }
}

clearChatBtn.addEventListener('click', () => {
    messagesContainer.innerHTML = '';
    appendMessage('WebTech Edge Bot', 'Chat cleared. Ask any cloud or deployment question!', false);
});

if (suggestionChips) {
    suggestionChips.addEventListener('click', (e) => {
        const chip = e.target.closest('.chip');
        if (chip) {
            userInput.value = chip.getAttribute('data-prompt');
            sendMessage();
        }
    });
}

userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});
