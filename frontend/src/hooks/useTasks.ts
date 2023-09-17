import {useState, useEffect} from 'react';
import { Task } from '../App';

type ApiResponse<T> = {
  success: boolean,
  status: number,
  data?: T,
  message?: string,
}

const useTasks = () => {
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
        setFormData({ title: '', description: '' });
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
        setUpdatedTask({id: 0, title: '', description: ''});
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

  return {
    tasks,
    formData,
    formDataError,
    displayUpdateForm,
    updateFormError,
    updatedTask,
    setFormData,
    setUpdatedTask,
    setDisplayUpdateForm,
    createTask,
    updateTask,
    deleteTask,
  };
}

export default useTasks;