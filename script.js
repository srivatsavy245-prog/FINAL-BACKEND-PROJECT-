function saveTask() {
  const title = document.getElementById('taskTitle').value.trim();
  const desc = document.getElementById('taskDesc').value.trim();
  const time = document.getElementById('taskTime').value;

  if (!title || !time) {
    alert("Please enter task name and due date/time.");
    return;
  }

  const task = {
    title,
    desc,
    time,
    completed: false
  };

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  alert("Task saved!");
  document.getElementById('taskTitle').value = '';
  document.getElementById('taskDesc').value = '';
  document.getElementById('taskTime').value = '';
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const list = document.getElementById("taskList");
  if (!list) return;
  list.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "done" : "";

    li.innerHTML = `
      <strong>${task.title}</strong><br/>
      ${task.desc ? `<em>${task.desc}</em><br/>` : ""}
      <small>Due: ${new Date(task.time).toLocaleString()}</small>
      <div class="task-controls">
        <button onclick="toggleDone(${index})">${task.completed ? "Undo" : "Mark Done"}</button>
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    list.appendChild(li);
  });
}

function toggleDone(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function editTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  const newTitle = prompt("Edit Task Title:", tasks[index].title);
  if (newTitle !== null) {
    tasks[index].title = newTitle;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  }
}

document.addEventListener('DOMContentLoaded', loadTasks);
