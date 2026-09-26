# Personal Portfolio Website

## 1. Project Overview

This project is a responsive personal portfolio website developed as part of Week 1 of the internship.

The main goal of the project is to create a professional and accessible online portfolio that showcases personal information, technical skills, projects, education, and contact details.

The website is designed using HTML5 and CSS3 with basic JavaScript functionality. It follows responsive design principles so that the website can be viewed properly on mobile, tablet, and desktop devices.

### Project Objectives

* Create a professional personal portfolio website.
* Use semantic HTML5 elements for better structure and accessibility.
* Implement responsive layouts using CSS Grid and Flexbox.
* Create an accessible navigation system.
* Add a contact form with basic validation.
* Add hover effects and simple animations.
* Organize the project using a clear and maintainable folder structure.
* Use Git and GitHub for version control.

---

## 2. Features

The portfolio website includes the following features:

* Responsive design for mobile, tablet, and desktop.
* Semantic HTML5 structure.
* Navigation bar with links to different sections.
* Home/Hero section.
* About section.
* Skills section.
* Projects section.
* Education section.
* Contact section.
* Contact form with validation.
* CSS Grid and Flexbox layouts.
* Hover effects and simple animations.
* Accessible labels and alternative text for images.
* Mobile-friendly navigation.
* Consistent color theme and typography.

---

## 3. Technologies Used

| Technology | Purpose                                           |
| ---------- | ------------------------------------------------- |
| HTML5      | Website structure and semantic elements           |
| CSS3       | Styling, layout, animations and responsive design |
| JavaScript | Basic navigation and interactivity                |
| Git        | Version control                                   |
| GitHub     | Code repository and project submission            |

---

## 4. Project Structure

```text
week1-portfolio/
│
├── index.html
│
├── css/
│   ├── style.css
│   ├── responsive.css
│   └── variables.css
│
├── js/
│   └── navigation.js
│
├── images/
│   ├── profile.jpg
│   ├── project1.jpg
│   └── icons/
│
├── README.md
│
└── .gitignore
```

### File Description

#### `index.html`

Contains the main structure and content of the portfolio website using semantic HTML5 elements.

#### `css/style.css`

Contains the primary styling for the website, including typography, sections, buttons, cards, navigation, and other visual elements.

#### `css/responsive.css`

Contains media queries and responsive styles for different screen sizes.

#### `css/variables.css`

Contains reusable CSS variables such as colors, fonts, spacing, and other design values.

#### `js/navigation.js`

Contains JavaScript functionality for navigation and basic website interactivity.

#### `images/`

Contains profile images, project screenshots, and icons used throughout the website.

#### `README.md`

Contains project documentation, setup instructions, features, technical details, and testing information.

#### `.gitignore`

Contains files and folders that should not be tracked by Git.

---

## 5. Setup Instructions

### Prerequisites

The project does not require any backend server or external dependencies.

You only need:

* A modern web browser such as Chrome, Edge, or Firefox.
* Visual Studio Code or another code editor.
* Git, if you want to clone or contribute to the repository.

### Running the Project

#### Step 1: Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

#### Step 2: Open the project

Open the `week1-portfolio` folder in Visual Studio Code.

#### Step 3: Open the website

Open `index.html` in a web browser.

Alternatively, use the **Live Server** extension in Visual Studio Code.

#### Step 4: Test different screen sizes

Open the website in the browser and use Developer Tools to test:

* Desktop
* Tablet
* Mobile

---

## 6. Technical Details

### HTML Architecture

The website uses semantic HTML5 elements to organize the page.

Examples include:

* `<header>` for the website header.
* `<nav>` for navigation.
* `<main>` for the main content.
* `<section>` for individual portfolio sections.
* `<footer>` for footer information.
* `<form>` for the contact form.

This improves readability, accessibility, and maintainability.

### CSS Architecture

The CSS is divided into multiple files based on responsibility.

`variables.css` stores reusable design variables.

`style.css` contains the main visual styling.

`responsive.css` contains media queries for responsive layouts.

### Layout

CSS Flexbox is used for layouts where elements need to be arranged in rows or columns.

CSS Grid is used for structured layouts such as project cards and skill sections.

### Responsive Design

Media queries are used to adjust the layout according to the screen size.

The website has been tested on:

* Desktop screens
* Tablet-sized screens
* Mobile screens

### JavaScript

JavaScript is used for basic website interactivity, particularly navigation behavior on smaller screens.

---

## 7. Accessibility

Accessibility was considered during development.

The website includes:

* Semantic HTML5 elements.
* Descriptive `alt` attributes for images.
* Labels for form inputs.
* Accessible navigation links.
* Appropriate heading hierarchy.
* Keyboard-friendly interactive elements.
* Sufficient text readability.

Example:

```html
<label for="email">Email</label>
<input 
    type="email" 
    id="email" 
    name="email" 
    required
>
```

---

## 8. Contact Form Validation

The contact form contains basic validation to ensure that required information is entered correctly.

### Validation checks

* Name should not be empty.
* Email should be in a valid email format.
* Message should not be empty.
* Required fields must be completed before submission.

Example test:

| Test Case     | Input                        | Expected Result                 |
| ------------- | ---------------------------- | ------------------------------- |
| Empty name    | Name left blank              | Validation message displayed    |
| Invalid email | `abc@`                       | Invalid email message displayed |
| Empty message | Message left blank           | Validation message displayed    |
| Valid form    | All fields correctly entered | Form passes validation          |

---

## 9. Testing Evidence

The website was tested for functionality, responsiveness, navigation, and form validation.

### Navigation Testing

| Test           | Expected Result        | Status |
| -------------- | ---------------------- | ------ |
| Click Home     | Home section opens     | Pass   |
| Click About    | About section opens    | Pass   |
| Click Skills   | Skills section opens   | Pass   |
| Click Projects | Projects section opens | Pass   |
| Click Contact  | Contact section opens  | Pass   |

### Responsive Testing

| Device  | Test                                   | Result |
| ------- | -------------------------------------- | ------ |
| Desktop | Layout and navigation                  | Pass   |
| Tablet  | Layout adapts correctly                | Pass   |
| Mobile  | Navigation and content adapt correctly | Pass   |

### Form Testing

| Test Case             | Expected Result        | Result |
| --------------------- | ---------------------- | ------ |
| Empty required fields | Validation displayed   | Pass   |
| Invalid email         | Validation displayed   | Pass   |
| Valid input           | Form passes validation | Pass   |

---

## 10. Visual Documentation

Screenshots are included to demonstrate the functionality and responsive behavior of the website.

Recommended screenshots:

### Desktop View

Add a screenshot showing the complete portfolio homepage on a desktop screen.

```text
![Desktop View](images/screenshots/desktop.png)
```

### Mobile View

Add a screenshot showing the responsive mobile layout.

```text
![Mobile View](images/screenshots/mobile.png)
```

### Contact Form

Add a screenshot showing the contact form and its validation.

```text
![Contact Form](images/screenshots/contact-form.png)
```

### Project Section

Add a screenshot showing the projects section.

```text
![Projects](images/screenshots/projects.png)
```

---

## 11. Project Goals and Learning Outcomes

Through this project, the following concepts were practiced:

* HTML5 semantic structure.
* CSS selectors and properties.
* CSS Box Model.
* Flexbox.
* CSS Grid.
* Responsive design.
* Media queries.
* Basic JavaScript.
* Form validation.
* Accessibility principles.
* Git and GitHub.
* Project documentation.

---

## 12. Future Improvements

Possible future improvements include:

* Adding more project screenshots.
* Adding additional JavaScript interactions.
* Adding a downloadable resume.
* Adding a dark/light theme switcher.
* Connecting the contact form to a backend or email service.
* Adding more animations.
* Improving accessibility based on further testing.

---

## 13. Author

**Anjali Verma**

B.Tech Computer Science

Personal Portfolio Website — Week 1 Internship Task

