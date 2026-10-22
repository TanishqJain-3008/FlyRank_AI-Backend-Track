const express = require('express');
const router = express.Router();

const taskService = require('../services/taskService');

router.get('/', async (req, res, next) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const task = await taskService.getTaskById(id);

    if (!task) {
      return res.status(404).json({
        error: 'Task not found'
      });
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const title = req.body.title;

    if (
      !title ||
      typeof title !== 'string' ||
      title.trim() === ''
    ) {
      return res.status(400).json({
        error: 'Title must be a non-empty string'
      });
    }

    const newTask = await taskService.createTask(title.trim());

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { title, done } = req.body;

    if (typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({
        error: 'Title must be a non-empty string'
      });
    }

    if (typeof done !== 'boolean') {
      return res.status(400).json({
        error: 'Done must be true or false'
      });
    }

    const updatedTask = await taskService.updateTask(
      id,
      title.trim(),
      done
    );

    if (!updatedTask) {
      return res.status(404).json({
        error: 'Task not found'
      });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const deleted = await taskService.deleteTask(id);

    if (!deleted) {
      return res.status(404).json({
        error: 'Task not found'
      });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
