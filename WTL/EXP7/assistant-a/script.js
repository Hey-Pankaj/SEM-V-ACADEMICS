/**
 * BudgetApp - Modular OOP Architecture (Assistant A: Copilot Style)
 */
class BudgetApp {
    constructor() {
        this.STORAGE_KEY = 'wtl_exp7_transactions_a';
        this.transactions = this.loadTransactions();
        
        // Seed default demo records if empty
        if (this.transactions.length === 0) {
            this.seedInitialData();
        }

        // Cache DOM elements
        this.form = document.getElementById('transactionForm');
        this.descInput = document.getElementById('desc');
        this.amountInput = document.getElementById('amount');
        this.typeInput = document.getElementById('type');
        this.categoryInput = document.getElementById('category');
        this.categoryFilter = document.getElementById('categoryFilter');
        this.tableBody = document.getElementById('transactionBody');
        this.emptyState = document.getElementById('emptyState');
        this.netBalanceEl = document.getElementById('netBalance');
        this.totalIncomeEl = document.getElementById('totalIncome');
        this.totalExpenseEl = document.getElementById('totalExpense');

        this.initEventListeners();
        this.render();
    }

    seedInitialData() {
        this.transactions = [
            { id: 1, desc: 'Monthly Academic Stipend', amount: 850.00, type: 'income', category: 'Salary', date: '2026-10-01' },
            { id: 2, desc: 'Textbooks & Stationeries', amount: 65.50, type: 'expense', category: 'Education', date: '2026-10-03' },
            { id: 3, desc: 'Hostel Wi-Fi Internet', amount: 35.00, type: 'expense', category: 'Utilities', date: '2026-10-05' },
            { id: 4, desc: 'Cafeteria & Meals', amount: 120.00, type: 'expense', category: 'Food', date: '2026-10-08' }
        ];
        this.saveTransactions();
    }

    loadTransactions() {
        const raw = localStorage.getItem(this.STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    }

    saveTransactions() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.transactions));
    }

    initEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleAddTransaction(e));
        this.categoryFilter.addEventListener('change', () => this.renderTable());
    }

    handleAddTransaction(e) {
        e.preventDefault();
        const desc = this.descInput.value.trim();
        const amount = parseFloat(this.amountInput.value);
        const type = this.typeInput.value;
        const category = this.categoryInput.value;

        if (!desc || isNaN(amount) || amount <= 0) return;

        const newTx = {
            id: Date.now(),
            desc,
            amount,
            type,
            category,
            date: new Date().toISOString().split('T')[0]
        };

        this.transactions.unshift(newTx);
        this.saveTransactions();
        this.form.reset();
        this.render();
    }

    deleteTransaction(id) {
        this.transactions = this.transactions.filter(tx => tx.id !== id);
        this.saveTransactions();
        this.render();
    }

    calculateTotals() {
        let income = 0;
        let expense = 0;

        for (const tx of this.transactions) {
            if (tx.type === 'income') {
                income += tx.amount;
            } else {
                expense += tx.amount;
            }
        }

        const net = income - expense;
        return { income, expense, net };
    }

    formatCurrency(val) {
        return '$' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    renderMetrics() {
        const { income, expense, net } = this.calculateTotals();
        this.totalIncomeEl.textContent = `+${this.formatCurrency(income)}`;
        this.totalExpenseEl.textContent = `-${this.formatCurrency(expense)}`;
        this.netBalanceEl.textContent = this.formatCurrency(net);
        this.netBalanceEl.className = `metric-val ${net >= 0 ? 'text-green' : 'text-red'}`;
    }

    renderTable() {
        const filter = this.categoryFilter.value;
        const filtered = filter === 'all' 
            ? this.transactions 
            : this.transactions.filter(tx => tx.category === filter);

        this.tableBody.innerHTML = '';

        if (filtered.length === 0) {
            this.emptyState.classList.remove('hidden');
            return;
        }

        this.emptyState.classList.add('hidden');

        filtered.forEach(tx => {
            const tr = document.createElement('tr');
            
            const isIncome = tx.type === 'income';
            const sign = isIncome ? '+' : '-';
            const colorClass = isIncome ? 'text-green' : 'text-red';

            tr.innerHTML = `
                <td><strong>${this.escape(tx.desc)}</strong></td>
                <td><span class="badge-cat">${this.escape(tx.category)}</span></td>
                <td>${tx.date}</td>
                <td class="text-right ${colorClass}"><strong>${sign}${this.formatCurrency(tx.amount)}</strong></td>
                <td class="text-center">
                    <button class="btn-delete" title="Delete record" onclick="app.deleteTransaction(${tx.id})">🗑️</button>
                </td>
            `;
            this.tableBody.appendChild(tr);
        });
    }

    escape(str) {
        return String(str).replace(/[&<>"']/g, m => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[m]));
    }

    render() {
        this.renderMetrics();
        this.renderTable();
    }
}

// Global instance
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new BudgetApp();
});
