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
    formDataError, 
    displayUpdateForm, 
    updateFormError, 
    updatedTask,
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
          errorMessage={formDataError.message}
          onSubmit={(title, description) => {
            createTask({title, description});
          }}
        />
      </div>
      <h2>My tasks:</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
           {updatedTask.id === task.id && displayUpdateForm ? 
            <TaskForm 
              title={task.title}
              description={task.description}
              errorMessage={updateFormError.message}
              onSubmit={(title, description) => {
                updateTask({id: task.id, title, description});
              }}
            />
          : 
            <TaskComponent 
              task={task} 
              onDelete={() => deleteTask(task.id)} 
              onEdit={() => {
                setDisplayUpdateForm(true);
                setUpdatedTask({
                  id: task.id, 
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
