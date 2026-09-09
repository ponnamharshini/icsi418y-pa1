const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const priorityInput = document.querySelector("#priority");
const taskList = document.querySelector("#task-list");

// Store all tasks in an array
const tasks = [];

// Display all tasks on the page
function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");

        if (task.completed) {
            taskElement.classList.add("completed");
        }

        const taskName = document.createElement("p");
        taskName.textContent = "Task: " + task.name;

        const taskPriority = document.createElement("p");
        taskPriority.textContent = "Priority: " + task.priority;

        const completeButton = document.createElement("button");
        completeButton.type = "button";
        completeButton.textContent = task.completed
            ? "Mark Incomplete"
            : "Complete";

        completeButton.addEventListener("click", function() {
            task.completed = !task.completed;
            displayTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            tasks.splice(index, 1);
            displayTasks();
        });

        taskElement.appendChild(taskName);
        taskElement.appendChild(taskPriority);
        taskElement.appendChild(completeButton);
        taskElement.appendChild(deleteButton);

        taskList.appendChild(taskElement);
    });
}

// Add a new task when the form is submitted
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const taskName = taskInput.value.trim();
    const taskPriority = priorityInput.value;

    // Do not add an empty task
    if (taskName === "") {
        alert("Please enter a task.");
        return;
    }

    // Create a task object
    const task = {
        name: taskName,
        priority: taskPriority,
        completed: false
    };

    // Add the task object to the array
    tasks.push(task);

    // Clear the input
    taskInput.value = "";

    // Display the updated task list
    displayTasks();
});