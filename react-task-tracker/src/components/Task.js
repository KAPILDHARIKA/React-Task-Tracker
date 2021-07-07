import {FaTimes} from 'react-icons/fa';
import EditTask from './EditTask';
import Button from './Button';
import { useState } from 'react';


const Task = ({ task, onDelete,  onToggle, onEdit}) => {
     const [showEditTask, setShowEditTask] = useState(false)
  return (
       <div className={`task ${task.reminder?'reminder':''}`} onDoubleClick={()=>onToggle(task.id)}>
         <h3>{task.text}
         <Button text="Edit" onClick={()=>setShowEditTask(!showEditTask)}></Button> 
         <FaTimes style={{color:'red', cursor:'pointer'}} onClick={()=>onDelete(task.id)}/></h3>      
         <p>{task.day}</p>
          {showEditTask && <EditTask onEdit={onEdit} id={task.id}></EditTask>}
      </div>
   )
}

export default Task;