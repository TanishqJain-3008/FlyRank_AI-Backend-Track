
const taskRepository = require('../repositories/postgresTaskRepository');

module.exports = {
  getAllTasks: () => taskRepository.getAllTasks(),
  getTaskById: (id) => taskRepository.getTaskById(id),
  createTask: (title) => taskRepository.createTask(title),
  updateTask: (id, title, done) =>
    taskRepository.updateTask(id, title, done),
  deleteTask: (id) => taskRepository.deleteTask(id)
};
