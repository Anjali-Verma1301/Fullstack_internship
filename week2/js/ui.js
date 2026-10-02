function renderTasks(tasks) {

    const taskList = document.getElementById("taskList");

    if (tasks.length === 0) {
        taskList.innerHTML = `
            <li class="task-item">
                No tasks found.
            </li>
        `;

        return;
    }

    taskList.innerHTML = tasks.map(task => {

        return `
            <li
                class="task-item ${task.completed ? "completed" : ""}"
                data-id="${task.id}"
            >

                <input
                    type="checkbox"
                    class="complete-checkbox"
                    data-id="${task.id}"
                    ${task.completed ? "checked" : ""}
                >

                <span class="task-text">
                    ${escapeHTML(task.text)}
                </span>

                <span class="priority">
                    ${task.priority}
                </span>

                <button
                    class="edit-btn"
                    data-id="${task.id}"
                >
                    Edit
                </button>

                <button
                    class="delete-btn"
                    data-id="${task.id}"
                >
                    Delete
                </button>

            </li>
        `;

    }).join("");
}


function updateStatistics(tasks) {

    const total = tasks.length;

    const completed =
        tasks.filter(task => task.completed).length;

    const active = total - completed;

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("activeTasks").textContent = active;
    document.getElementById("completedTasks").textContent = completed;
}


function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}