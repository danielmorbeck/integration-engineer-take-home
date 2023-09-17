import { useState, useEffect } from 'react';
import DeleteIcon from './assets/delete.svg';
import EditIcon from './assets/edit.svg';
import CreateIcon from './assets/add.svg';
import './App.css'

type Task = {
  id: number,
  title: string,
  description: string
}

type ApiResponse<T> = {
  success: boolean,
  status: number,
  data?: T,
  message?: string,
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [formDataError, setFormDataError] = useState({message: ''});
  const [displayUpdateForm, setDisplayUpdateForm] = useState(false);
  const [updateFormError, setUpdateFormError] = useState({message: ''});
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
    try {
      const response = await fetch('http://localhost:8000/tasks', { 
        headers: {
          "Content-Type": "application/json",
        }, 
        method: 'POST', 
        body: JSON.stringify({'title': formData.title, 'description': formData.description})
      });
      const responseData: ApiResponse<Task> = await response.json();

      if (responseData.success) {
        await fetchTasks();
        setFormDataError({message: ''});
        return;
      }

      if (responseData.status === 422) {
        setFormDataError({message: responseData.message || 'Something went wrong'})
        return;
      }
      
    } catch (e) {
      console.error(e);
    }
  };

  const updateTask = async ({id, title, description}: {id: number, title: string, description: string}) => {
    try {
      const response = await fetch(`http://localhost:8000/tasks/${id}`, { 
        headers: {
          "Content-Type": "application/json",
        }, 
        method: 'PUT', 
        body: JSON.stringify({'title': title, 'description': description})
      });

      const responseData: ApiResponse<Task> = await response.json();

      if (responseData.success) {
        await fetchTasks();
        setDisplayUpdateForm(false);
        setUpdateFormError({message: ''});
        return;
      }

      if (responseData.status === 422) {
        setUpdateFormError({message: responseData.message || 'Something went wrong'})
        return;
      }
    } catch (e) {
      console.error(e);
    }
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
    <div className='card'>
      <h1>Task Manager</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
           {updatedTask.id === task.id && displayUpdateForm ? 
            <>
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
              <p className='error-message'>{updateFormError.message}</p>
              <button 
                className='edit-button' 
                onClick={() => {
                  updateTask({id: updatedTask.id, title: updatedTask.title, description: updatedTask.description});
                }}
              >
                <img src={CreateIcon} height={20} width={20} />
              </button>
            </> 
          : 
            <>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <div className='options'>
                <button 
                  className='delete-button' 
                  onClick={() => deleteTask(task.id)}
                >
                  <img src={DeleteIcon} height={20} width={20} />
                </button>
                <button 
                  className='edit-button' 
                  onClick={() => {
                    setDisplayUpdateForm(true);
                    setUpdatedTask({
                      id: task.id, 
                      title: task.title, 
                      description: task.description
                    })
                  }}
                >
                  <img src={EditIcon} height={20} width={20} />
                </button>
              </div>
            </>
          }
          </li>
        ))}
      </ul>
      <div className='card'>
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
        <p className='error-message'>{formDataError.message}</p>
        <button className='edit-button' onClick={createTask}>
          <img src={CreateIcon} height={20} width={20} />
        </button>
      </div>
    </div>
  );
}

export default App;
