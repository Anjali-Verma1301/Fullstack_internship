function generateId() {
    return Date.now();
}

function validateTask(text) {
    if (!text || text.trim() === "") {
        return "Task cannot be empty.";
    }

    if (text.trim().length < 3) {
        return "Task must contain at least 3 characters.";
    }

    return "";
}