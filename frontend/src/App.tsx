import './App.css'
import TaskComponent from './components/Task';
import TaskForm from './components/TaskForm';
import useTasks from './hooks/useTasks';

export type Task = {
  id: number,
  title: string,
  description: string
}

function App() {
  const {
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
    deleteTask
  } = useTasks();

  return (
    <div className='card'>
      <div className='card'>
        <h2>Create Task</h2>
        <TaskForm 
          title={formData.title} 
          onTitleChange={title => setFormData({ ...formData, title })} 
          description={formData.description}
          onDescriptionChange={description => setFormData({...formData, description})}
          errorMessage={formDataError.message}
          onCreate={createTask}
        />
      </div>
      <h2>My tasks:</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
           {updatedTask.id === task.id && displayUpdateForm ? 
            <TaskForm 
              title={updatedTask.title} 
              onTitleChange={title => setUpdatedTask({ ...updatedTask, title })} 
              description={updatedTask.description}
              onDescriptionChange={description => setUpdatedTask({...updatedTask, description})}
              errorMessage={updateFormError.message}
              onCreate={() => updateTask({id: updatedTask.id, title: updatedTask.title, description: updatedTask.description})}
            />
          : 
            <TaskComponent 
              task={task} 
              onDelete={() => deleteTask(task.id)} 
              onEdit={() => {
                setDisplayUpdateForm(true);
                setUpdatedTask({
                  id: task.id, 
                  title: task.title, 
                  description: task.description
                })
              }} 
            />
          }
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
