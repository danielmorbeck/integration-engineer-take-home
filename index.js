const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());

let tasks = [];
let nextTaskId = 0;

app.get('/tasks', (req, res) => {
  res.status(200);
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const newTask = {
    id: nextTaskId + 1,
    title: req.body.title,
    description: req.body.description,
  };

  tasks.push(newTask);
  nextTaskId++;
  res.status(200)
  res.json(newTask)
});


app.delete('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const result = tasks.filter(task => task.id !== id);
  tasks = result;
  res.status(201);
  res.end()
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
