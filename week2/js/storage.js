const STORAGE_KEY = "taskManagerTasks";

function saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
    const storedTasks = localStorage.getItem(STORAGE_KEY);

    if (!storedTasks) {
        return [];
    }

    try {
        return JSON.parse(storedTasks);
    } catch (error) {
        console.error("Unable to load tasks:", error);
        return [];
    }
}