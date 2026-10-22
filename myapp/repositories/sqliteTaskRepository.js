
const Database = require('better-sqlite3');

const db = new Database('tasks.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done BOOLEAN NOT NULL DEFAULT 0
  )
`);

const taskCount = db.prepare(
  "SELECT COUNT(*) AS count FROM tasks"
).get();

if(taskCount.count === 0){
  const insert = db.prepare(`
    INSERT INTO tasks (title, done)
    VALUES (?, ?)
  `);

  insert.run("Learn JavaScript", 0);
  insert.run("Build my first API", 0);
  insert.run("Learn Git", 1);
}

function formatTask(task){
  if(!task){
    return null;
  }

  return {
    id: task.id,
    title: task.title,
    done: Boolean(task.done)
  };
}

function getAllTasks(){
  const rows = db.prepare(
    "SELECT * FROM tasks ORDER BY id"
  ).all();

  return rows.map(task => formatTask(task));
}

function getTaskById(id){
  const task = db.prepare(
    "SELECT * FROM tasks WHERE id = ?"
  ).get(id);

  return formatTask(task);
}

function createTask(title){
  const result = db.prepare(`
    INSERT INTO tasks (title, done)
    VALUES (?, ?)
  `).run(title, 0);

  return getTaskById(Number(result.lastInsertRowid));
}

function updateTask(id, title, done){
  const result = db.prepare(`
    UPDATE tasks
    SET title = ?, done = ?
    WHERE id = ?
  `).run(title, done ? 1 : 0, id);

  if(result.changes === 0){
    return null;
  }

  return getTaskById(id);
}

function deleteTask(id){
  const result = db.prepare(
    "DELETE FROM tasks WHERE id = ?"
  ).run(id);

  return result.changes > 0;
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
