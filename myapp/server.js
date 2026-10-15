const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

const swaggerUi = require("swagger-ui-express");
const openapiDocument = require("./openapi.json");
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiDocument));

const Database = require("better-sqlite3");
const db = new Database("tasks.db");
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done BOOLEAN NOT NULL DEFAULT 0
  )
`);

//Assign-1
// const tasks = [
//   { id: 1, title: "Learn Node.js", done: false }, 
//   { id: 2, title: "Build a REST API", done: false }, 
//   { id: 3, title: "test the API", done: false }
// ];

app.get('/', (req, res) => {
  res.send({
    "name": "Task API",
    "version": "1.0",
    "endpoints": ["/tasks"]
});
});

app.get('/health', (req, res) => {
  res.send({"status": "ok"});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


// app.get('/tasks', (req, res) => {
//   res.json(tasks);
// });

// app.get('/tasks/:id', (req, res) => {
//   const id = Number(req.params.id);
//   const task = tasks.find(task => task.id === id);

//   if(!task){
//     return res.status(400).json({
//       error: `Task ${id} not found`
//     });
//   }

//   res.json(task);
// });

// app.post("/tasks", (req, res) => {
//   const title = req.body.title;
  
//   if(!title || title.trim() === ""){
//     res.status(400).json({
//       error : "The title is missing or empty."
//     });
//   };

//   const newId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
//   const newTask = {
//     id : newId,
//     title : title.trim(),
//     done : false
//   }

//   tasks.push(newTask);

//   res.status(201).json(newTask);
// });

// app.put("/tasks/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const newTask = tasks.find(task => task.id === id);
  
//   if(!newTask){
//     return res.status(404).json({
//       error : "Unknown id"
//     });
//   }

//   const title = req.body.title.trim();
//   const done = req.body.done;
//   if(!title || title.trim() === "" || typeof title !== "string"){
//     return res.status(400).json({
//       error : "Empty/invalid title"
//     });
//   }

//   if(typeof done !== "boolean"){
//     return res.status(400).json({
//       error : "Done must have boolean datatype"
//     })
//   }

//   newTask.title = title;
//   newTask.done = done;

//   res.status(200).json(newTask);  
// });

// app.delete("/tasks/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const taskIndex = tasks.findIndex(task => task.id === id);

//   if(taskIndex === -1){
//     return res.status(404).json({
//       error : "Unknown Task ID"
//     })
//   }

//   tasks.splice(taskIndex, 1);

//   res.status(204).send();
// });

const taskCount = db.prepare("SELECT COUNT(*) AS count FROM tasks").get();
if(taskCount.count === 0){
  const insert = db.prepare(`
    INSERT INTO tasks (title, done)
    VALUES (?, ?)
  `);

  insert.run("Learn JavaScript", 0);
  insert.run("Build my first API", 0);
  insert.run("Learn Git", 1);
}

app.get("/tasks", (req, res) => {
  const rows = db.prepare("SELECT * FROM tasks").all();

  const tasks = rows.map(task => ({
    id : task.id,
    title : task.title,
    done : Boolean(task.done)
  }));

  res.json(tasks);
})

app.get("/tasks/:id", (req, res) => {
  const id = req.params.id;

  const task = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);

  if(!task){
    return res.status(404).json({
      error : "Task not found"
    });
  }

  res.json({
    id : task.id,
    title : task.title,
    done : Boolean(task.done)
  });
});