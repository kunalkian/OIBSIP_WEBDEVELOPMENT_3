const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const pendingList = document.getElementById('pending-list');
const completedList = document.getElementById('completed-list');

let tasks = [];

function formatDateTime(dt) {
  return dt.toLocaleString();
}

function renderTasks() {
  pendingList.innerHTML = '';
  completedList.innerHTML = '';

  tasks.forEach((task, idx) => {
    const li = document.createElement('li');
    const row = document.createElement('div');
    row.className = 'task-row';

    const text = document.createElement('span');
    text.className = 'task-text';
    text.textContent = task.text;
    if (task.completed) text.classList.add('completed');

    row.appendChild(text);

    const actions = document.createElement('div');
    actions.className = 'actions';
    if (!task.completed) {
      const completeBtn = document.createElement('button');
      completeBtn.textContent = 'Complete';
      completeBtn.className = 'complete';
      completeBtn.onclick = () => markComplete(idx);
      actions.appendChild(completeBtn);
    }
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit';
    editBtn.onclick = () => editTask(idx);
    actions.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete';
    deleteBtn.onclick = () => deleteTask(idx);
    actions.appendChild(deleteBtn);

    row.appendChild(actions);
    li.appendChild(row);

    const dt = document.createElement('span');
    dt.className = 'task-datetime';
    dt.textContent = task.completed ? `Completed: ${formatDateTime(task.completedAt)}` : `Added: ${formatDateTime(task.addedAt)}`;
    li.appendChild(dt);

    if (task.completed) completedList.appendChild(li);
    else pendingList.appendChild(li);
  });
}

form.onsubmit = (e) => {
  e.preventDefault();
  const value = input.value.trim();
  if (!value) return;
  tasks.push({
    text: value,
    addedAt: new Date(),
    completed: false
  });
  input.value = '';
  renderTasks();
};

function markComplete(idx) {
  tasks[idx].completed = true;
  tasks[idx].completedAt = new Date();
  renderTasks();
}

function editTask(idx) {
  const newText = prompt('Edit your task:', tasks[idx].text);
  if (newText !== null && newText.trim() !== '') {
    tasks[idx].text = newText.trim();
    renderTasks();
  }
}

function deleteTask(idx) {
  tasks.splice(idx, 1);
  renderTasks();
}

renderTasks();