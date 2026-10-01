const express = require('express');
const app = express();
const port = 3000;

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


