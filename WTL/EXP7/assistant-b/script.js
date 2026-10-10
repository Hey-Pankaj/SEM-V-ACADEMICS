/**
 * Zenith Budget - Functional Reactive Architecture (Assistant B: Claude Style)
 */

// Initial Seed Dataset
const SEED_DATA = [
    { id: 101, desc: 'Web Engineering Fellowship', amount: 950.00, type: 'income', category: 'Salary', date: '2026-10-02' },
    { id: 102, desc: 'College Textbooks & Supplies', amount: 80.00, type: 'expense', category: 'Education', date: '2026-10-04' },
    { id: 103, desc: 'High-Speed Broadband Internet', amount: 45.00, type: 'expense', category: 'Utilities', date: '2026-10-06' },
    { id: 104, desc: 'Organic Groceries & Produce', amount: 110.00, type: 'expense', category: 'Food', date: '2026-10-08' }
];

const CATEGORY_ICONS = {
    Salary: '💼',
    Food: '🍜',
    Utilities: '⚡',
    Entertainment: '🎬',
    Education: '📚'
};

// Application State Store
const state = {
    transactions: JSON.parse(localStorage.getItem('wtl_exp7_transactions_b')) || SEED_DATA,
    activeFilter: 'all'
};

// State Mutations (Pure Functions)
function setFilter(newFilter) {
    state.activeFilter = newFilter;
    render();
}

function addTransaction(tx) {
    state.transactions = [tx, ...state.transactions];
    persist();
    render();
}

function removeTransaction(id) {
    state.transactions = state.transactions.filter(t => t.id !== id);
    persist();
    render();
}

function persist() {
    localStorage.setItem('wtl_exp7_transactions_b', JSON.stringify(state.transactions));
}

// Selectors
function getFilteredTransactions() {
    if (state.activeFilter === 'all') return state.transactions;
    return state.transactions.filter(t => t.type === state.activeFilter);
}

function getSummaryMetrics() {
    let income = 0;
    let expense = 0;
    let incomeCount = 0;
    let expenseCount = 0;

    state.transactions.forEach(t => {
        if (t.type === 'income') {
            income += t.amount;
            incomeCount++;
        } else {
            expense += t.amount;
            expenseCount++;
        }
    });

    return {
        balance: income - expense,
        income,
        expense,
        incomeCount,
        expenseCount
    };
}

function getCategoryBreakdown() {
    const breakdown = {};
    let totalExpense = 0;

    state.transactions.forEach(t => {
        if (t.type === 'expense') {
            breakdown[t.category] = (breakdown[t.category] || 0) + t.amount;
            totalExpense += t.amount;
        }
    });

    return { breakdown, totalExpense };
}

// Currency Formatter
function formatCurrency(val) {
    return '$' + Number(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Render Functions
function renderMetrics() {
    const metrics = getSummaryMetrics();
    document.getElementById('balanceDisplay').textContent = formatCurrency(metrics.balance);
    document.getElementById('incomeDisplay').textContent = `+${formatCurrency(metrics.income)}`;
    document.getElementById('expenseDisplay').textContent = `-${formatCurrency(metrics.expense)}`;
    document.getElementById('incomeCount').textContent = `${metrics.incomeCount} inflows`;
    document.getElementById('expenseCount').textContent = `${metrics.expenseCount} payments`;
}

function renderAnalytics() {
    const container = document.getElementById('budgetBarsContainer');
    const { breakdown, totalExpense } = getCategoryBreakdown();
    container.innerHTML = '';

    const categories = ['Food', 'Utilities', 'Education', 'Entertainment'];
    categories.forEach(cat => {
        const spent = breakdown[cat] || 0;
        const percentage = totalExpense > 0 ? Math.round((spent / totalExpense) * 100) : 0;

        const barEl = document.createElement('div');
        barEl.className = 'budget-bar-item';
        barEl.innerHTML = `
            <div class="bar-meta">
                <span>${CATEGORY_ICONS[cat] || '📦'} ${cat}</span>
                <span><strong>${formatCurrency(spent)}</strong> (${percentage}%)</span>
            </div>
            <div class="bar-track">
                <div class="bar-fill" style="width: ${Math.min(percentage, 100)}%"></div>
            </div>
        `;
        container.appendChild(barEl);
    });
}

function renderFeed() {
    const feed = document.getElementById('feedList');
    const list = getFilteredTransactions();
    feed.innerHTML = '';

    if (list.length === 0) {
        feed.innerHTML = `<div style="text-align:center; padding: 24px; color: var(--text-low);">No records under "${state.activeFilter}" filter.</div>`;
        return;
    }

    list.forEach(item => {
        const isInc = item.type === 'income';
        const itemEl = document.createElement('div');
        itemEl.className = 'feed-item';
        itemEl.innerHTML = `
            <div class="item-left">
                <span class="cat-emoji">${CATEGORY_ICONS[item.category] || '💸'}</span>
                <div>
                    <div class="item-desc">${escapeHtml(item.desc)}</div>
                    <div class="item-meta">${item.category} &bull; ${item.date}</div>
                </div>
            </div>
            <div class="item-right">
                <span class="item-amount ${isInc ? 'text-emerald' : 'text-rose'}">
                    ${isInc ? '+' : '-'}${formatCurrency(item.amount)}
                </span>
                <button class="btn-item-del" title="Delete" onclick="removeTransaction(${item.id})">✕</button>
            </div>
        `;
        feed.appendChild(itemEl);
    });
}

function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, m => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[m]));
}

function render() {
    renderMetrics();
    renderAnalytics();
    renderFeed();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('expenseForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const desc = document.getElementById('itemDesc').value.trim();
        const amount = parseFloat(document.getElementById('itemAmount').value);
        const type = document.getElementById('flowType').value;
        const category = document.getElementById('categorySelect').value;

        if (!desc || isNaN(amount) || amount <= 0) return;

        addTransaction({
            id: Date.now(),
            desc,
            amount,
            type,
            category,
            date: new Date().toISOString().split('T')[0]
        });

        form.reset();
    });

    const filterPills = document.getElementById('filterPills');
    filterPills.addEventListener('click', (e) => {
        const btn = e.target.closest('.pill');
        if (btn) {
            document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            setFilter(btn.getAttribute('data-filter'));
        }
    });

    render();
});
