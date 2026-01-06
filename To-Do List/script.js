const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-section button");
const taskCounter = document.getElementById("taskCounter");
const clearCompletedBtn = document.getElementById("clearCompleted");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

renderTasks();

// Add task
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") addTask();
});

// Filter tasks
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

// Clear completed
clearCompletedBtn.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.completed);
  saveAndRender();
});

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return alert("Please enter a task!");
  tasks.push({ text, completed: false });
  taskInput.value = "";
  saveAndRender();
}

function renderTasks() {
  taskList.innerHTML = "";
  let filteredTasks = tasks.filter((task) => {
    if (currentFilter === "all") return true;
    if (currentFilter === "pending") return !task.completed;
    if (currentFilter === "completed") return task.completed;
  });

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.draggable = true;
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <span>${task.text}</span>
      <div class="task-buttons">
        <button class="complete-btn"><i class="fa ${
          task.completed ? "fa-undo" : "fa-check"
        }"></i></button>
        <button class="edit-btn"><i class="fa fa-pencil"></i></button>
        <button class="delete-btn"><i class="fa fa-trash"></i></button>
      </div>
    `;

    // Complete/Undo
    li.querySelector(".complete-btn").addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveAndRender();
    });

    // Edit task inline
    li.querySelector(".edit-btn").addEventListener("click", () => {
      const span = li.querySelector("span");
      const input = document.createElement("input");
      input.type = "text";
      input.value = task.text;
      span.replaceWith(input);
      input.focus();
      input.addEventListener("blur", () => {
        if (input.value.trim() !== "") {
          task.text = input.value.trim();
        }
        saveAndRender();
      });
      input.addEventListener("keyup", (e) => {
        if (e.key === "Enter") input.blur();
      });
    });

    // Delete task
    li.querySelector(".delete-btn").addEventListener("click", () => {
      tasks.splice(index, 1);
      saveAndRender();
    });

    // Drag & Drop
    li.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("index", index);
    });
    li.addEventListener("dragover", (e) => e.preventDefault());
    li.addEventListener("drop", (e) => {
      const draggedIndex = e.dataTransfer.getData("index");
      const temp = tasks[draggedIndex];
      tasks.splice(draggedIndex, 1);
      tasks.splice(index, 0, temp);
      saveAndRender();
    });

    taskList.appendChild(li);
  });

  // Update counter
  const pendingCount = tasks.filter((t) => !t.completed).length;
  taskCounter.textContent = `${pendingCount} task${
    pendingCount !== 1 ? "s" : ""
  } left`;
}

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}
