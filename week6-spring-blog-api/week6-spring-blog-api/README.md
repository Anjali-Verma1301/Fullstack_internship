# Blog Management REST API

A RESTful Blog Management API built using Spring Boot. It supports creating, retrieving, updating, and deleting blog posts, with input validation and custom error handling.

## Features

- Create a blog post
- Retrieve all blog posts
- Retrieve a blog post by ID
- Update an existing blog post
- Delete a blog post
- Validate required fields
- Return custom error messages for missing posts
- Automatically manage creation and update timestamps

## Technologies Used

- Java 21
- Spring Boot
- Spring Data JPA
- Maven
- H2 Database
- PostgreSQL dependency
- Bean Validation
- REST API
- Git and GitHub

## Project Setup

### Prerequisites

Install Java 21 and Maven, and ensure they are available in your terminal.

### Run the application

1. Clone or download the project.
2. Open the project folder in VS Code.
3. Open a terminal in the directory containing `pom.xml`.
4. Run:

```bash
mvn clean package
mvn spring-boot:run
```

The application runs at `http://localhost:8080`.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/posts` | Create a post |
| GET | `/api/posts` | Retrieve all posts |
| GET | `/api/posts/{id}` | Retrieve a post by ID |
| PUT | `/api/posts/{id}` | Update a post |
| DELETE | `/api/posts/{id}` | Delete a post |

## Example Request

### Create a post

**POST** `/api/posts`

```json
{
  "title": "My First Blog Post",
  "content": "This is my first blog post.",
  "author": "Anjali"
}
```

### Validation error example

If the title is blank, the API returns HTTP 400 Bad Request:

```json
{
  "title": "Title is required"
}
```

### Not-found error example

If a requested post does not exist, the API returns HTTP 404 Not Found with an error message.

## Learning Outcomes

- Building REST APIs using Spring Boot
- Implementing CRUD operations
- Using Spring Data JPA repositories
- Applying request validation
- Handling exceptions globally
- Testing APIs using HTTP requests

## Author

Anjali Verma