const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());

let tasks = [];
let nextTaskId = 0;

app.get('/tasks', (req, res) => {
  res.status(200);
  res.json({
    success: true,
    data: tasks
  })
});

app.post('/tasks', (req, res) => {
  try {
    const {title, description} = req.body;
    if (!title) {
      throw new Error('property title is missing')
    }
  
    if (!description) {
      throw new Error('property description is missing')
    }
  
    const newTask = {
      id: nextTaskId + 1,
      title: req.body.title,
      description: req.body.description,
    };
  
    tasks.push(newTask);
    nextTaskId++;
    res.status(200)
    res.json({
      success: true,
      data: newTask
    })
  } catch(e) {
    const errorMessage = e.message;
    if (errorMessage === 'property title is missing' || 'property description is missing') {
      res.status(422);
      res.json({
        success: false,
        status: 422,
        message: errorMessage
      })
      return
    }
    next(e);
  }
});


app.delete('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const findTask = tasks.find(task => task.id === id);

  if (!findTask) {
    res.status(404);
    res.json({
      success: false,
      status: 404,
      message: 'sorry, task not found :('
    })
    return;
  }

  const result = tasks.filter(task => task.id !== id);
  tasks = result;
  res.status(201);
  res.json({
    success: true,
  })
  res.end()
});

const ErrorHandler = (err, req, res, next) => {
  res.status(500);
  res.json({
    success: false,
    status: 500,
    message: 'Something went wrong',
  })
}

app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
