const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");
const clearAll = document.getElementById("clearAll");

const totalTask = document.getElementById("totalTask");
const completedTask = document.getElementById("completedTask");
const pendingTask = document.getElementById("pendingTask");

// Load saved tasks
window.onload = function () {
    loadTasks();
};

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

searchInput.addEventListener("keyup", searchTask);

clearAll.addEventListener("click", function () {

    if (confirm("Delete all tasks?")) {
        localStorage.removeItem("tasks");
        taskList.innerHTML = "";
        updateCount();
    }

});

function addTask() {

    let text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    createTask(text, false);

    saveTasks();

    taskInput.value = "";

}

function createTask(text, completed) {

    const li = document.createElement("li");

    li.innerHTML = `

<input type="checkbox" class="check">

<span class="task-text">${text}</span>

<div class="action-btns">

<button class="edit-btn">
<i class="fa-solid fa-pen"></i>
</button>

<button class="delete-btn">
<i class="fa-solid fa-trash"></i>
</button>

</div>

`;

    const checkbox = li.querySelector(".check");
    const taskText = li.querySelector(".task-text");

    if (completed) {
        checkbox.checked = true;
        taskText.classList.add("completed");
    }

    checkbox.addEventListener("change", function () {

        taskText.classList.toggle("completed");

        saveTasks();

        updateCount();

    });

    li.querySelector(".delete-btn").addEventListener("click", function () {

        li.remove();

        saveTasks();

        updateCount();

    });

    li.querySelector(".edit-btn").addEventListener("click", function () {

        let updated = prompt("Edit Task", taskText.textContent);

        if (updated !== null && updated.trim() !== "") {

            taskText.textContent = updated;

            saveTasks();

        }

    });

    taskList.appendChild(li);

    updateCount();

}

function updateCount() {

    const tasks = document.querySelectorAll("#taskList li");

    const completed = document.querySelectorAll(".completed");

    totalTask.textContent = tasks.length;

    completedTask.textContent = completed.length;

    pendingTask.textContent = tasks.length - completed.length;

}

function saveTasks() {

    let tasks = [];

    document.querySelectorAll("#taskList li").forEach(function (item) {

        tasks.push({

            text: item.querySelector(".task-text").textContent,

            completed: item.querySelector(".check").checked

        });

    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

function loadTasks() {

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(function (task) {

        createTask(task.text, task.completed);

    });

}

function searchTask() {

    let value = searchInput.value.toLowerCase();

    document.querySelectorAll("#taskList li").forEach(function (item) {

        let text = item.querySelector(".task-text").textContent.toLowerCase();

        if (text.includes(value)) {

            item.style.display = "flex";

        } else {

            item.style.display = "none";

        }

    });

}