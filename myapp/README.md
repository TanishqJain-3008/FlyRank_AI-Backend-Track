# Task Management API with PostgreSQL and Docker

## Overview

This project is a RESTful Task Management API built with Node.js and Express. It uses PostgreSQL for persistent data storage and Docker Compose to run the application and database together.

The project demonstrates CRUD operations, database integration, containerization, and data persistence across container restarts.

## Features

- Create, read, update, and delete tasks.
- Store task data in a PostgreSQL database.
- Validate request data and handle errors.
- Run the application and database using Docker Compose.
- Automatically initialize the database schema using an SQL script.
- Preserve task data using a Docker named volume.

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Docker and Docker Compose
- `pg` PostgreSQL client

## Project Structure

```text
myapp/
├── db/
│   └── init.sql
├── repositories/
│   └── postgresTaskRepository.js
├── routes/
│   └── taskRoutes.js
├── services/
│   └── taskService.js
├── .env
├── .env.example
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── openapi.json
├── package.json
└── server.js
```

## Setup and Execution

### 1. Prerequisites

Install Docker Desktop and ensure its Docker engine is running.

### 2. Configure Environment Variables

Create a `.env` file in the project root with the required application port and database connection string.

Example configuration:

```env
PORT=3000
DATABASE_URL=postgresql://appuser:1234@db:5432/tasksdb
```

The hostname `db` refers to the PostgreSQL service defined in Docker Compose.

Keep `.env` out of version control. Use `.env.example` to document the required variables without exposing real credentials.

### 3. Start the Application

Run the following command from the project directory:

```bash
docker compose up --build
```

Docker Compose builds the Node.js application image, starts PostgreSQL, waits for the database health check, and then starts the application.

### 4. Access the API

The API is available at:

```text
http://localhost:3000/tasks
```

To stop the containers, run:

```bash
docker compose down
```

The database volume is retained when using this command, so stored tasks survive container restarts.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/tasks` | Retrieve all tasks |
| GET | `/tasks/:id` | Retrieve a task by ID |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

### Example: Create a Task

Request:

```http
POST /tasks
Content-Type: application/json
```

Request body:

```json
{
  "title": "Learn PostgreSQL"
}
```

A successful request returns HTTP `201 Created` with the created task.

### Example: Update a Task

Request body:

```json
{
  "title": "Learn PostgreSQL",
  "done": true
}
```

A successful update returns HTTP `200 OK`.

## Error Handling

The API validates incoming data and handles missing resources.

- `400 Bad Request`: Invalid input.
- `404 Not Found`: Requested task does not exist.
- `201 Created`: Task created successfully.
- `200 OK`: Request or update completed successfully.
- `204 No Content`: Task deleted successfully.

## Database and Persistence

The `db/init.sql` script creates the `tasks` table in PostgreSQL. The database repository performs SQL queries using the `pg` client and parameterized queries.

Docker Compose uses a named volume, `postgres_data`, to persist PostgreSQL's data independently of the database container's lifecycle.

**Persistence verification:** Task data was retained after stopping and restarting the containers.

Note: PostgreSQL initialization scripts run automatically only when the database data directory is first initialized.

## Testing

The following functionality was verified:

- Creating and retrieving tasks.
- Updating task details and completion status.
- Deleting tasks.
- Handling invalid input and missing task IDs.
- Connecting the Node.js application to PostgreSQL.
- Retaining database records across container restarts.

## Security and Configuration

- Environment-specific settings are stored in `.env`.
- `.env` should be excluded from version control.
- `.env.example` documents the required configuration.
- Database queries use parameterized SQL to help prevent SQL injection.

For production deployments, use strong database credentials and manage secrets securely.

## Learning Outcomes

This project helped develop practical understanding of:

- REST API development using Express.js.
- Separating routes, services, and repository logic.
- Connecting Node.js applications to PostgreSQL.
- Using Docker and Docker Compose.
- Database initialization and persistent storage.
- Input validation, HTTP status codes, and error handling.

## Running the Project

```bash
docker compose up --build
```

Open `http://localhost:3000/tasks` to access the task collection endpoint.