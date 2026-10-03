const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

const tasks = [
  { id: 1, title: "Learn Node.js", done: false }, 
  { id: 2, title: "Build a REST API", done: false }, 
  { id: 3, title: "test the API", done: false }
];

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


app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find(task => task.id === id);

  if(!task){
    return res.status(400).json({
      error: `Task ${id} not found`
    });
  }

  res.json(task);
});

app.post("/tasks", (req, res) => {
  const title = req.body.title;
  
  if(!title || title.trim() === ""){
    res.status(400).json({
      error : "The title is missing or empty."
    });
  };

  const newId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
  const newTask = {
    id : newId,
    title : title.trim(),
    done : false
  }

  tasks.push(newTask);

  res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const newTask = tasks.find(task => task.id === id);
  
  if(!newTask){
    return res.status(404).json({
      error : "Unknown id"
    });
  }

  const title = req.body.title.trim();
  const done = req.body.done;
  if(!title || title.trim() === "" || typeof title !== "string"){
    return res.status(400).json({
      error : "Empty/invalid title"
    });
  }

  if(typeof done !== "boolean"){
    return res.status(400).json({
      error : "Done must have boolean datatype"
    })
  }

  newTask.title = title;
  newTask.done = done;

  res.status(200).json(newTask);  
});

app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === id);

  if(taskIndex === -1){
    return res.status(404).json({
      error : "Unknown Task ID"
    })
  }

  tasks.splice(taskIndex, 1);

  res.status(204).send();
});