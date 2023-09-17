import { Task as TaskType } from '../App';
import DeleteIcon from '../assets/delete.svg';
import EditIcon from '../assets/edit.svg';


interface TaskProps {
  task: TaskType;
  onDelete: (id: number) => void;
  onEdit: () => void;
}

const Task = ({task, onDelete, onEdit}: TaskProps) => {
  return (
    <>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div className='options'>
        <button 
          className='delete-button' 
          onClick={() => onDelete(task.id)}
        >
          <img src={DeleteIcon} height={20} width={20} />
        </button>
        <button 
          className='edit-button' 
          onClick={() => {
            onEdit()
          }}
        >
          <img src={EditIcon} height={20} width={20} />
        </button>
      </div>
    </>
  )
}

export default Task