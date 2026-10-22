const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

function formatTask(task) {
  if (!task) {
    return null;
  }

  return {
    id: task.id,
    title: task.title,
    done: task.done
  };
}

async function getAllTasks() {
  const result = await pool.query(
    'SELECT id, title, done FROM tasks ORDER BY id'
  );

  return result.rows.map(formatTask);
}

async function getTaskById(id) {
  const result = await pool.query(
    'SELECT id, title, done FROM tasks WHERE id = $1',
    [id]
  );

  return formatTask(result.rows[0]);
}

async function createTask(title) {
  const result = await pool.query(
    `INSERT INTO tasks (title, done)
     VALUES ($1, $2)
     RETURNING id, title, done`,
    [title, false]
  );

  return formatTask(result.rows[0]);
}

async function updateTask(id, title, done) {
  const result = await pool.query(
    `UPDATE tasks
     SET title = $1, done = $2
     WHERE id = $3
     RETURNING id, title, done`,
    [title, done, id]
  );

  return formatTask(result.rows[0]);
}

async function deleteTask(id) {
  const result = await pool.query(
    'DELETE FROM tasks WHERE id = $1 RETURNING id',
    [id]
  );

  return result.rowCount > 0;
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
