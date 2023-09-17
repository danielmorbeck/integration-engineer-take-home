import { useRef } from 'react';
import CreateIcon from '../assets/add.svg';


interface TaskFormProps {
  title?: string;
  description?: string;
  errorMessage: string;
  onSubmit: (title: string, description: string) => void;
}

const TaskForm = ({title, description, errorMessage, onSubmit}: TaskFormProps) => {
  const titleRef = useRef<{value: string}>({value: title || ''});
  const descriptionRef = useRef<{value: string}>({value: description || ''});

  return (
    <>
      <input
        type="text"
        placeholder="Title"
        defaultValue={title}
        ref={titleRef as React.MutableRefObject<HTMLInputElement>}
      />
      <input
        type="text"
        placeholder="Description"
        defaultValue={description}
        ref={descriptionRef as React.MutableRefObject<HTMLInputElement>}
      />
      <p className='error-message'>{errorMessage}</p>
      <button 
        className='edit-button' 
        onClick={() => onSubmit(titleRef.current.value, descriptionRef.current.value)}
      >
        <img src={CreateIcon} height={20} width={20} />
      </button>
    </> 
  )
}

export default TaskForm