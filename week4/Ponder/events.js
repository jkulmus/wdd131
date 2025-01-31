let tasks = [];

// Convert to HTML temp
function taskTemplate(task) {
    return `
      <li ${task.completed ? 'class="strike"' : ""}>
        <p>${task.detail}</p>
        <div>
          <span data-function="delete">❎</span>
          <span data-function="complete">✅</span>
        </div>
      </li>`;
}

// Render list of tasks
function renderTasks(tasks) {
    const listElement = document.querySelector("#todoList");
    listElement.innerHTML = "";
    //loop through tasks array
    const html = tasks.map(taskTemplate).join("");
    listElement.innerHTML = html;
}

function newTask() {
    const taskInput = document.querySelector("#todo");
    const task = taskInput.value;
    if (task.trim() !== "") {
        tasks.push({ detail: task, completed: false });
        renderTasks(tasks);
        taskInput.value = ""; // clear field
    }
}

function removeTask(taskElement) {
    tasks = tasks.filter(
        (task) => task.detail != taskElement.querySelector('p').innerText);
    // removes the HTML element from the DOM
    taskElement.remove();
}

function completeTask(taskElement) {
    const taskIndex = tasks.findIndex(
        (task) => task.detail === taskElement.childNodes[0].innerText
    );
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    taskElement.classList.toggle("strike");
    console.log(tasks);
}

function manageTasks(e) {
    const parent = e.target.closest("li");
    if (e.target.dataset.function === "delete") {
        removeTask(parent);
    }
    if (e.target.dataset.function === "complete") {
        completeTask(parent);
    }
}

// Add event listeners
document.querySelector("#submitTask").addEventListener("click", newTask);
document.querySelector("#todoList").addEventListener("click", manageTasks);

// Render initial list
renderTasks(tasks);