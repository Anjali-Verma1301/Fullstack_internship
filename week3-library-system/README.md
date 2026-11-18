# Java Console-Based Library Management System

## Project Overview

The **Java Console-Based Library Management System** is a menu-driven application developed to simplify basic library operations. It allows librarians to manage books and members, track book borrowing and returns, calculate overdue fines, and store library records locally.

The project demonstrates object-oriented programming, file handling, collections, date and time operations, and modular Java application development.

## Features

- **Book Management:** Add books, view all books, search by ISBN, title, or author, and prevent duplicate ISBN entries.
- **Member Management:** Register members, view registered members, and prevent duplicate member IDs.
- **Book Borrowing:** Allow registered members to borrow available books.
- **Book Returns:** Process returns and update book availability.
- **Loan Tracking:** Record borrowing dates and calculate due dates based on a 14-day loan period.
- **Overdue Fine Calculation:** Calculate overdue days and fines at ₹5 per day.
- **Library Statistics:** Display total books, available books, borrowed books, and registered members.
- **File-Based Storage:** Save book, member, and active loan records locally using text files.
- **Input Validation:** Handle invalid menu choices, empty inputs, duplicate records, and invalid publication years.

## Technologies Used

- Java 21
- Object-Oriented Programming (OOP)
- Java Collections Framework
- Java I/O and NIO file handling
- Java Time API (`LocalDate`)
- Maven project structure
- Git and GitHub
- Visual Studio Code

## Project Structure

```text
week3-library-system/
├── src/
│   └── main/
│       └── java/
│           └── library/
│               ├── Book.java
│               ├── Member.java
│               ├── Loan.java
│               ├── Library.java
│               ├── FileHandler.java
│               └── Main.java
├── data/
│   ├── books.txt
│   ├── members.txt
│   └── loans.txt
├── pom.xml
└── README.md
```

### Main Components

| Class | Responsibility |
|---|---|
| `Book.java` | Stores book details and availability status. |
| `Member.java` | Stores member details and borrowed book ISBNs. |
| `Loan.java` | Tracks borrowing dates, due dates, return dates, and overdue fines. |
| `Library.java` | Implements library operations and business logic. |
| `FileHandler.java` | Saves and loads book, member, and loan records. |
| `Main.java` | Provides the interactive console menu. |

## Requirements

- Java Development Kit (JDK) 21 or compatible.
- Visual Studio Code or another Java-compatible IDE.
- PowerShell, Command Prompt, or another terminal.

Verify your Java installation:

```powershell
java -version
javac -version
```

## How to Run

### 1. Open the project directory

```powershell
cd "C:\full_stack_internship\week3-library-system"
```

### 2. Compile the Java source files

```powershell
javac -d target/classes src/main/java/library/*.java
```

### 3. Run the application

```powershell
java -cp target/classes library.Main
```

### 4. Use the application menu

The application provides these options:

1. Add New Book
2. View All Books
3. Search Books
4. Register Member
5. View All Members
6. Borrow Book
7. Return Book
8. View Library Statistics
9. Exit

Follow the prompts displayed in the terminal to perform each operation.

## Data Storage

The application stores records in local text files inside the `data/` directory:

- `books.txt` — book details and availability.
- `members.txt` — registered members and their borrowed book ISBNs.
- `loans.txt` — active loan details, including borrowing and due dates.

Book and member records are loaded when the application starts. Active loan records are also restored from the saved loan file.

The `data/` directory is generated or populated as the application saves records. Local runtime data is excluded from version control.

## Business Rules

- Each book must have a unique ISBN.
- Each member must have a unique member ID.
- Only available books can be borrowed.
- A standard loan period is 14 days.
- The overdue fine is ₹5 per day.
- A book's availability is updated when it is borrowed or returned.

## Current Limitations

- The application uses a console interface rather than a graphical interface.
- Data is stored in local text files rather than a database.
- Loan persistence currently focuses on active loans; completed loan history is not retained.
- Automated unit tests and CSV report exports are not yet implemented.

## Learning Outcomes

This project provides practical experience with:

- Designing classes and objects in Java.
- Applying encapsulation and separation of responsibilities.
- Managing collections and relationships between books, members, and loans.
- Performing file-based data persistence.
- Working with dates and calculating overdue fines.
- Validating user input and handling exceptions.
- Using Git and GitHub for version control and project documentation.

## Future Enhancements

- Export book inventories and library statistics to CSV.
- Preserve complete borrowing and return history.
- Add automated unit tests.
- Introduce a database such as MySQL.
- Add book reservations and more advanced reporting.

## Author

**Anjali Verma**

Computer Science and Engineering Student

GitHub: [Anjali-Verma1301](https://github.com/Anjali-Verma1301)

LinkedIn: [Anjali Verma](https://www.linkedin.com/in/anjali-verma-28a866326/)

---

*This project was developed for learning and demonstrating Java programming, file handling, and application development skills.*
