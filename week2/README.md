# Interactive Task Manager

## Project Overview

Interactive Task Manager is a responsive web application built using
HTML, CSS and vanilla JavaScript.

The application allows users to create, edit, delete and complete tasks.
Task information is stored in browser localStorage so that data remains
available after refreshing the page.

## Features

- Add tasks
- Edit tasks
- Delete tasks
- Mark tasks as completed
- Filter tasks
- Search tasks
- Task statistics
- Priority levels
- Form validation
- Error handling
- localStorage persistence
- Dark/light mode
- Responsive design

## Technologies Used

- HTML5
- CSS3
- JavaScript
- DOM Manipulation
- localStorage

## Project Structure

week2-task-manager/
│
├── index.html
├── css/
│   ├── style.css
│   └── theme.css
├── js/
│   ├── app.js
│   ├── storage.js
│   ├── ui.js
│   └── utils.js
├── screenshots/
├── README.md
└── .gitignore

## How to Run

1. Download or clone the repository.
2. Open the week2-task-manager folder.
3. Open index.html in a browser.
4. Start adding tasks.

## How to Use

1. Enter a task in the input field.
2. Select the priority.
3. Click Add Task.
4. Use the checkbox to complete a task.
5. Use Edit to modify a task.
6. Use Delete to remove a task.
7. Use filters to view All, Active or Completed tasks.
8. Use Search to find specific tasks.
9. Use Dark Mode to change the theme.

## Technical Details

### Data Structure

Each task is represented as a JavaScript object:

{
    id: number,
    text: string,
    completed: boolean,
    priority: string,
    createdAt: string
}

Tasks are stored inside a JavaScript array.

### DOM Manipulation

JavaScript is used to dynamically create and update task elements
without refreshing the webpage.

### Event Handling

The application uses submit, click, change, input and keyboard events.

### Data Persistence

localStorage is used to save and retrieve tasks from the browser.

## Testing

| Test Case | Expected Result | Status |
|---|---|---|
| Add task | Task appears | Pass |
| Empty task | Validation message appears | Pass |
| Delete task | Task is removed | Pass |
| Complete task | Task becomes completed | Pass |
| Filter tasks | Correct tasks displayed | Pass |
| Refresh browser | Tasks remain | Pass |
| Search | Matching tasks displayed | Pass |

## Screenshots

Screenshots demonstrating the application's functionality are included
in the screenshots folder.

## Future Improvements

- Drag and drop task ordering
- Due date reminders
- Advanced analytics
- Cloud synchronization