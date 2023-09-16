import { useState, useEffect } from 'react';

type Task = {
  id: number,
  title: string,
  description: string
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [displayUpdateForm, setDisplayUpdateForm] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({id: 0, title: '', description: ''});

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:8000/tasks')
    const tasks = await response.json();
    setTasks(tasks.data);
  };

  /* Complete the following functions to hit endpoints on your server */
  const createTask = async () => {
    await fetch('http://localhost:8000/tasks', { 
      headers: {
        "Content-Type": "application/json",
      }, 
      method: 'POST', 
      body: JSON.stringify({'title': formData.title, 'description': formData.description})
    });
    await fetchTasks();
  };

  const updateTask = async (id: number) => {
    await fetch(`http://localhost:8000/tasks/${id}`, { 
      headers: {
        "Content-Type": "application/json",
      }, 
      method: 'PUT', 
      body: JSON.stringify({'title': updatedTask.title, 'description': updatedTask.description})
    });
    await fetchTasks();
  }

  const deleteTask = async (id: number) => {
    await fetch(`http://localhost:8000/tasks/${id}`, { 
      headers: {
        "Content-Type": "application/json",
      }, 
      method: 'DELETE', 
    });
    await fetchTasks();
  };


  return (
    <div>
      <h1>Task Management App</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            <button onClick={() => {
              setDisplayUpdateForm(true);
              setUpdatedTask({id: task.id, title: task.title, description: task.description})
            }}>Edit</button>
          </li>
        ))}
        {displayUpdateForm && <div>
          <h2>Update Task</h2>
          <input
            type="text"
            placeholder="Title"
            value={updatedTask.title}
            onChange={e => setUpdatedTask({ ...updatedTask, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={updatedTask.description}
            onChange={e => setUpdatedTask({ ...updatedTask, description: e.target.value })}
          />
          <button onClick={() => updateTask(updatedTask.id)}>Create</button>
        </div>
        }
      </ul>
      <div>
        <h2>Create Task</h2>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
        />
        <button onClick={createTask}>Create</button>
      </div>
    </div>
  );
}

export default App;
