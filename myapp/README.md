# FlyRank_AI-Backend-Track
This repo. contains the entire backend engineering stuff that I learnt and implemented during my Intern at FlyRank AI.

# Task API
A simple RESTful CRUD API built using **Node.js** and **Express.js** for managing an in-memory list of tasks.
The API supports creating, reading, updating, and deleting tasks, along with input validation and Swagger UI documentation.

## Tech Stack
* Node.js
* Express.js
* Swagger UI
* OpenAPI

## Project Structure
myapp/
├── node_modules/
├── openapi.json
├── package-lock.json
├── package.json
├── README.md
└── server.js


# Setup and Git Workflow
## 1. Initialize the Project

Create the project folder and initialize Git:
```bash
mkdir myapp
cd myapp
git init
```

Initialize the Node.js project:
```bash
npm init -y
```

Install the required dependencies:
```bash
npm install express swagger-ui-express
```
## 2. Add the Project Files
The main files are:
* `server.js` - Contains the Express server and API endpoints.
* `openapi.json` - Contains the OpenAPI specification used by Swagger UI.
* `package.json` - Contains project information and dependencies.
* `README.md` - Project documentation.

## 3. Run the API
Start the server using:
```bash
node server.js
```

The API will be available at:
```text
http://localhost:3000
```

Swagger documentation is available at:
```text
http://localhost:3000/docs
```

# API Endpoints

| Method | Endpoint     | Description         | Success |    Error |
| ------ | ------------ | ------------------- | ------: | -------: |
| GET    | `/`          | Get API information |     200 |        - |
| GET    | `/health`    | Check API health    |     200 |        - |
| GET    | `/tasks`     | Get all tasks       |     200 |        - |
| GET    | `/tasks/:id` | Get a task by ID    |     200 |      404 |
| POST   | `/tasks`     | Create a new task   |     201 |      400 |
| PUT    | `/tasks/:id` | Update a task       |     200 | 400, 404 |
| DELETE | `/tasks/:id` | Delete a task       |     204 |      404 |
| GET    | `/docs`      | Open Swagger UI     |     200 |        - |


# Example API Usage
## Create a Task

```bash
curl -i -X POST http://localhost:3000/tasks ^
  -H "Content-Type: application/json" ^
  -d "{\"title\":\"Learn Express\"}"
```

Expected status:
201 Created

Example response:
{
  "id": 4,
  "title": "Learn Express",
  "done": false
}

## Get All Tasks
```bash
curl -i http://localhost:3000/tasks
```

Expected status:
200 OK

## Get a Task by ID
```bash
curl -i http://localhost:3000/tasks/4
```

Expected status:
200 OK

If the task does not exist:
404 Not Found

## Update a Task
```bash
curl -i -X PUT http://localhost:3000/tasks/4 ^
  -H "Content-Type: application/json" ^
  -d "{\"title\":\"Learn Express properly\",\"done\":true}"
```

Expected status:text
200 OK

## Delete a Task

```bash
curl -i -X DELETE http://localhost:3000/tasks/4
```

Expected status:text
204 No Content

# Sample `curl -i` Output
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

[
  {
    "id": 1,
    "title": "Learn JavaScript",
    "done": false
  },
  {
    "id": 2,
    "title": "Build my first API",
    "done": false
  }
]
```

---

# Swagger UI
Swagger UI provides interactive documentation for all API endpoints.

Open:
http://localhost:3000/docs

The Swagger interface can be used to test the complete CRUD cycle using **Try it out**.

### Swagger Screenshot
Add your screenshot below:

markdown
![Swagger UI](swagger.png)

# Git Workflow

The project was developed incrementally using Git.
## Init

Initialize the repository:
bash
git init

## Add
Stage the project files:

bash
git add .

## Commit
Create meaningful commits after each development stage:

bash
git commit -m "Stage 0: hello server"
git commit -m "Stage 1: root and health endpoints"
git commit -m "Stage 2: add task read endpoints"
git commit -m "Stage 3: create tasks with validation"
git commit -m "Stage 4: add update and delete endpoints"
git commit -m "Stage 5: Swagger UI"
git commit -m "Stage 6: README and GitHub"
```

## Push
Connect the local repository to GitHub:

bash
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>


Set the main branch:
bash
git branch -M main

Push the project:
bash
git push -u origin main

# In-Memory Storage
This API uses an in-memory JavaScript array instead of a database.

Therefore, all task data is reset whenever the server is restarted.

This was intentional because the assignment focuses on implementing the REST API and CRUD operations without using a database.


# Status Codes
| Status Code | Meaning                                     |
| ----------: | ------------------------------------------- |
|         200 | Request successful                          |
|         201 | Task successfully created                   |
|         204 | Task successfully deleted, no response body |
|         400 | Invalid request or input                    |
|         404 | Task not found                              |


# CRUD Flow
POST /tasks
    ↓
Create Task
    ↓
GET /tasks
    ↓
PUT /tasks/:id
    ↓
Update / Mark Done
    ↓
DELETE /tasks/:id
    ↓
GET /tasks/:id
    ↓
404 Not Found


# Author
Tanishq Jain
Built as part of the FlyRank Backend Track Week 2 CRUD API assignment.
