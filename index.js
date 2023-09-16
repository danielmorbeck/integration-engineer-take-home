const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

let tasks = [];
let nextTaskId = 0;

// Middlewares
const validateTask = (req, res, next) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(422).json({
      success: false,
      status: 422,
      message: 'Both title and description are required',
    });
  }
  next();
};

const findTaskById = (req, res, next) => {
  const id = Number(req.params.id);
  const task = tasks.find(task => task.id === id);

  if (!task) {
    return res.status(404).json({
      success: false,
      status: 404,
      message: 'Task not found',
    });
  }

  req.task = task;
  next();
};

// Routes
app.get('/tasks', (req, res) => {
  res.status(200).json({
    success: true,
    data: tasks,
  });
});

app.post('/tasks', validateTask, (req, res) => {
  const { title, description } = req.body;
  const newTask = {
    id: ++nextTaskId,
    title,
    description,
  };
  tasks.push(newTask);
  res.status(201).json({
    success: true,
    data: newTask,
  });
});

app.put('/tasks/:id', findTaskById, (req, res) => {
  const { title, description } = req.body;
  if (title) req.task.title = title;
  if (description) req.task.description = description;
  res.status(200).json({
    success: true,
    data: req.task,
  });
});

app.delete('/tasks/:id', findTaskById, (req, res) => {
  tasks = tasks.filter(task => task.id !== req.task.id);
  res.status(204).end();
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    status: 500,
    message: 'Something went wrong',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
