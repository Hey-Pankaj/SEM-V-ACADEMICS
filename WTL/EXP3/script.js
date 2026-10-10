const STORAGE_KEY = 'daymark.tasks.v1';
const filters = {
    all: { title: 'All tasks', eyebrow: 'YOUR LIST' },
    active: { title: 'To do', eyebrow: 'IN PROGRESS' },
    completed: { title: 'Completed', eyebrow: 'LOOK WHAT YOU DID' }
};

const taskList = document.getElementById('task-list');
const taskDialog = document.getElementById('task-dialog');
const taskForm = document.getElementById('task-form');
const taskTitleInput = document.getElementById('task-title');
const taskPriorityInput = document.getElementById('task-priority');
const taskDueDateInput = document.getElementById('task-due-date');
const liveMessage = document.getElementById('live-message');
let tasks = readTasks();
let currentFilter = 'all';
let searchQuery = '';
let editingTaskId = null;

function readTasks() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        if (!Array.isArray(saved)) return [];
        return saved.filter(task => task && typeof task.id === 'string' && typeof task.title === 'string')
            .map(task => ({
                id: task.id,
                title: task.title,
                priority: ['low', 'normal', 'high'].includes(task.priority) ? task.priority : 'normal',
                dueDate: typeof task.dueDate === 'string' ? task.dueDate : '',
                completed: Boolean(task.completed),
                createdAt: Number(task.createdAt) || Date.now()
            }));
    } catch {
        return [];
    }
}

function saveTasks() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        return true;
    } catch {
        announce('Could not save changes in this browser.');
        return false;
    }
}

function announce(message) {
    liveMessage.textContent = '';
    window.requestAnimationFrame(() => { liveMessage.textContent = message; });
}

function makeElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
}

function makeIcon(name) {
    const paths = {
        edit: '<path d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"></path>',
        delete: '<path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="m19 6-1 14H6L5 6"></path><path d="M10 11v5M14 11v5"></path>'
    };
    const icon = document.createElement('svg');
    icon.setAttribute('viewBox', '0 0 24 24');
    icon.setAttribute('aria-hidden', 'true');
    icon.innerHTML = paths[name];
    return icon;
}

function formatToday(date = new Date()) {
    return new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'long', day: 'numeric' }).format(date);
}

function getLocalDateValue(date = new Date()) {
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return localDate.toISOString().slice(0, 10);
}

function getDueDateLabel(dueDate) {
    if (!dueDate) return null;
    const due = new Date(`${dueDate}T12:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDay = new Date(due);
    dueDay.setHours(0, 0, 0, 0);
    const label = dueDay.getTime() === today.getTime()
        ? 'Due today'
        : new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(due);
    return { label, overdue: dueDay < today };
}

function visibleTasks() {
    return tasks
        .filter(task => {
            const matchesFilter = currentFilter === 'all'
                || (currentFilter === 'active' && !task.completed)
                || (currentFilter === 'completed' && task.completed);
            return matchesFilter && task.title.toLocaleLowerCase().includes(searchQuery);
        })
        .sort((first, second) => Number(first.completed) - Number(second.completed)
            || (first.dueDate || '9999-12-31').localeCompare(second.dueDate || '9999-12-31')
            || first.createdAt - second.createdAt);
}

function renderTask(task) {
    const item = makeElement('li', `task-item${task.completed ? ' is-complete' : ''}`);
    const checkLabel = makeElement('label', 'task-check');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.setAttribute('aria-label', `${task.completed ? 'Mark' : 'Complete'} ${task.title}`);
    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        saveTasks();
        render();
        announce(checkbox.checked ? `Completed: ${task.title}` : `Reopened: ${task.title}`);
    });
    checkLabel.append(checkbox, makeElement('span', 'check-mark'));

    const copy = makeElement('div', 'task-copy');
    copy.append(makeElement('div', 'task-title', task.title));
    const meta = makeElement('div', 'task-meta');
    const priority = makeElement('span', `priority-badge priority-${task.priority}`, `${task.priority} priority`);
    meta.append(priority);
    const due = getDueDateLabel(task.dueDate);
    if (due) meta.append(makeElement('span', `due-badge${due.overdue && !task.completed ? ' is-overdue' : ''}`, due.label));
    copy.append(meta);

    const actions = makeElement('div', 'task-actions');
    const editButton = makeElement('button', 'icon-button');
    editButton.type = 'button';
    editButton.setAttribute('aria-label', `Edit ${task.title}`);
    editButton.title = 'Edit task';
    editButton.append(makeIcon('edit'));
    editButton.addEventListener('click', () => openTaskDialog(task));
    const deleteButton = makeElement('button', 'icon-button delete-button');
    deleteButton.type = 'button';
    deleteButton.setAttribute('aria-label', `Delete ${task.title}`);
    deleteButton.title = 'Delete task';
    deleteButton.append(makeIcon('delete'));
    deleteButton.addEventListener('click', () => {
        tasks = tasks.filter(itemToKeep => itemToKeep.id !== task.id);
        saveTasks();
        render();
        announce(`Deleted: ${task.title}`);
    });
    actions.append(editButton, deleteButton);
    item.append(checkLabel, copy, actions);
    return item;
}

function render() {
    const completedCount = tasks.filter(task => task.completed).length;
    const activeCount = tasks.length - completedCount;
    document.getElementById('all-count').textContent = tasks.length;
    document.getElementById('active-count').textContent = activeCount;
    document.getElementById('completed-count').textContent = completedCount;

    const progress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;
    document.getElementById('progress-percent').textContent = `${progress}%`;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    const progressBar = document.getElementById('progress-bar');
    progressBar.setAttribute('aria-valuenow', progress);
    document.getElementById('progress-caption').textContent = tasks.length
        ? `${completedCount} of ${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'} complete.`
        : 'A fresh start. Pick one thing to begin.';

    document.querySelectorAll('[data-filter]').forEach(button => {
        const selected = button.dataset.filter === currentFilter;
        button.classList.toggle('is-selected', selected);
        button.setAttribute('aria-pressed', selected);
    });
    document.getElementById('view-title').textContent = filters[currentFilter].title;
    document.getElementById('view-eyebrow').textContent = filters[currentFilter].eyebrow;
    document.getElementById('task-summary').textContent = tasks.length
        ? `${activeCount} ${activeCount === 1 ? 'task' : 'tasks'} left to do.`
        : 'Make room for what matters.';
    document.getElementById('clear-completed').hidden = completedCount === 0;
    document.getElementById('list-date').textContent = formatToday();
    document.getElementById('today-label').textContent = formatToday();

    const matches = visibleTasks();
    taskList.replaceChildren(...matches.map(renderTask));
    const emptyState = document.getElementById('empty-state');
    emptyState.hidden = matches.length > 0;
    taskList.hidden = matches.length === 0;
    if (!matches.length) {
        const hasTasks = tasks.length > 0;
        document.getElementById('empty-title').textContent = searchQuery
            ? 'No matching tasks'
            : hasTasks ? `No ${currentFilter === 'active' ? 'open' : 'completed'} tasks` : 'Nothing on your list yet';
        document.getElementById('empty-description').textContent = searchQuery
            ? 'Try a different word or clear your search.'
            : hasTasks ? 'This view is clear for now.' : 'Start with one small task. You can always add the next later.';
        document.getElementById('empty-add-button').hidden = hasTasks || Boolean(searchQuery);
    }
}

function openTaskDialog(task = null) {
    editingTaskId = task ? task.id : null;
    taskForm.reset();
    document.getElementById('dialog-title').textContent = task ? 'Edit task' : 'New task';
    document.getElementById('save-task-button').textContent = task ? 'Save changes' : 'Add task';
    if (task) {
        taskTitleInput.value = task.title;
        taskPriorityInput.value = task.priority;
        taskDueDateInput.value = task.dueDate;
    } else {
        taskPriorityInput.value = 'normal';
    }
    taskDialog.showModal();
    taskTitleInput.focus();
}

function closeTaskDialog() {
    taskDialog.close();
    editingTaskId = null;
}

document.getElementById('new-task-button').addEventListener('click', () => openTaskDialog());
document.getElementById('empty-add-button').addEventListener('click', () => openTaskDialog());
document.getElementById('set-today-button').addEventListener('click', () => {
    taskDueDateInput.value = getLocalDateValue();
});
document.getElementById('close-dialog').addEventListener('click', closeTaskDialog);
document.getElementById('cancel-dialog').addEventListener('click', closeTaskDialog);
document.getElementById('task-search').addEventListener('input', event => {
    searchQuery = event.target.value.trim().toLocaleLowerCase();
    render();
});
document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
        currentFilter = button.dataset.filter;
        render();
    });
});
document.getElementById('clear-completed').addEventListener('click', () => {
    const count = tasks.filter(task => task.completed).length;
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    render();
    announce(`Cleared ${count} completed ${count === 1 ? 'task' : 'tasks'}.`);
});
taskDialog.addEventListener('click', event => {
    if (event.target === taskDialog) closeTaskDialog();
});
taskDialog.addEventListener('close', () => { editingTaskId = null; });
taskForm.addEventListener('submit', event => {
    event.preventDefault();
    const title = taskTitleInput.value.trim();
    if (!title) {
        taskTitleInput.focus();
        return;
    }

    if (editingTaskId) {
        const task = tasks.find(item => item.id === editingTaskId);
        if (task) {
            task.title = title;
            task.priority = taskPriorityInput.value;
            task.dueDate = taskDueDateInput.value;
        }
    } else {
        tasks.push({
            id: window.crypto && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
            title,
            priority: taskPriorityInput.value,
            dueDate: taskDueDateInput.value,
            completed: false,
            createdAt: Date.now()
        });
    }

    const message = editingTaskId ? 'Task updated.' : 'Task added.';
    closeTaskDialog();
    saveTasks();
    render();
    announce(message);
});

render();
