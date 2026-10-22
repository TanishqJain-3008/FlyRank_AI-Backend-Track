
let tasks = [
  { id: 1, title: "Learn JavaScript", done: false },
  { id: 2, title: "Build my first API", done: false },
  { id: 3, title: "Learn Git", done: true }
];

function getAllTasks(){
  return tasks.map(task => ({ ...task }));
}

function getTaskById(id){
  const task = tasks.find(task => task.id === id);

  return task ? { ...task } : null;
}

function createTask(title){
  const newId = tasks.length > 0
    ? Math.max(...tasks.map(task => task.id)) + 1
    : 1;

  const newTask = {
    id: newId,
    title: title,
    done: false
  };

  tasks.push(newTask);

  return { ...newTask };
}

function updateTask(id, title, done){
  const task = tasks.find(task => task.id === id);

  if(!task){
    return null;
  }

  task.title = title;
  task.done = done;

  return { ...task };
}

function deleteTask(id){
  const taskIndex = tasks.findIndex(task => task.id === id);

  if(taskIndex === -1){
    return false;
  }

  tasks.splice(taskIndex, 1);

  return true;
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
