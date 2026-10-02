let tasks = loadTasks();

let currentFilter = "all";
let searchText = "";


document.addEventListener("DOMContentLoaded", () => {

    render();

    setupEventListeners();

});


function render() {

    let filteredTasks = getFilteredTasks();

    renderTasks(filteredTasks);

    updateStatistics(tasks);

}


function getFilteredTasks() {

    let filtered = tasks;

    if (currentFilter === "active") {

        filtered = filtered.filter(task => !task.completed);

    }

    if (currentFilter === "completed") {

        filtered = filtered.filter(task => task.completed);

    }

    if (searchText) {

        filtered = filtered.filter(task =>
            task.text
                .toLowerCase()
                .includes(searchText.toLowerCase())
        );

    }

    return filtered;
}


function setupEventListeners() {

    const taskForm =
        document.getElementById("taskForm");

    const taskInput =
        document.getElementById("taskInput");

    const priorityInput =
        document.getElementById("priorityInput");


    /* Add Task */

    taskForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const text = taskInput.value;

        const error = validateTask(text);

        const errorMessage =
            document.getElementById("errorMessage");

        if (error) {

            errorMessage.textContent = error;

            return;
        }

        errorMessage.textContent = "";

        const newTask = {

            id: generateId(),

            text: text.trim(),

            completed: false,

            priority: priorityInput.value,

            createdAt: new Date().toISOString()

        };

        tasks.push(newTask);

        saveTasks(tasks);

        taskInput.value = "";

        render();

    });


    /* Task actions */

    document
        .getElementById("taskList")
        .addEventListener("click", handleTaskActions);


    /* Checkbox */

    document
        .getElementById("taskList")
        .addEventListener("change", function(event) {

            if (
                event.target.classList.contains(
                    "complete-checkbox"
                )
            ) {

                const id =
                    Number(event.target.dataset.id);

                toggleTask(id);

            }

        });


    /* Filters */

    document
        .querySelectorAll(".filter-btn")
        .forEach(button => {

            button.addEventListener("click", function() {

                currentFilter =
                    this.dataset.filter;

                document
                    .querySelectorAll(".filter-btn")
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );

                this.classList.add("active");

                render();

            });

        });


    /* Search */

    document
        .getElementById("searchInput")
        .addEventListener("input", function() {

            searchText = this.value;

            render();

        });


    /* Clear completed */

    document
        .getElementById("clearCompleted")
        .addEventListener("click", function() {

            tasks =
                tasks.filter(task => !task.completed);

            saveTasks(tasks);

            render();

        });


    /* Dark mode */

    document
        .getElementById("themeToggle")
        .addEventListener("click", function() {

            document.body.classList.toggle("dark");

            const darkMode =
                document.body.classList.contains("dark");

            localStorage.setItem(
                "darkMode",
                darkMode
            );

        });


    loadTheme();

}


function handleTaskActions(event) {

    const id =
        Number(event.target.dataset.id);

    if (event.target.classList.contains("delete-btn")) {

        deleteTask(id);

    }

    if (event.target.classList.contains("edit-btn")) {

        editTask(id);

    }

}


function deleteTask(id) {

    tasks =
        tasks.filter(task => task.id !== id);

    saveTasks(tasks);

    render();

}


function toggleTask(id) {

    tasks =
        tasks.map(task => {

            if (task.id === id) {

                return {
                    ...task,
                    completed: !task.completed
                };

            }

            return task;

        });

    saveTasks(tasks);

    render();

}


function editTask(id) {

    const task =
        tasks.find(task => task.id === id);

    if (!task) {
        return;
    }

    const updatedText =
        prompt("Edit your task:", task.text);

    if (updatedText === null) {
        return;
    }

    const error =
        validateTask(updatedText);

    if (error) {

        alert(error);

        return;
    }

    task.text = updatedText.trim();

    saveTasks(tasks);

    render();

}


function loadTheme() {

    const darkMode =
        localStorage.getItem("darkMode");

    if (darkMode === "true") {

        document.body.classList.add("dark");

    }

}
document.addEventListener("keydown", function(event) {

    const taskInput =
        document.getElementById("taskInput");

    if (
        event.key === "Escape" &&
        document.activeElement === taskInput
    ) {

        taskInput.value = "";

    }

});