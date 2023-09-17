import CreateIcon from '../assets/add.svg';


interface TaskFormProps {
  title: string;
  description: string;
  errorMessage: string;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onCreate: () => void;
}

const TaskForm = ({title, description, errorMessage, onTitleChange, onDescriptionChange, onCreate}: TaskFormProps) => {
  return (
    <>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => onTitleChange(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={e => onDescriptionChange(e.target.value)}
      />
      <p className='error-message'>{errorMessage}</p>
      <button 
        className='edit-button' 
        onClick={() => {
          onCreate();
        }}
      >
        <img src={CreateIcon} height={20} width={20} />
      </button>
    </> 
  )
}

export default TaskForm