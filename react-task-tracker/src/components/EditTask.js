import { useState, useEffect } from 'react';

const EditTask = ({ onEdit, onAdd,id }) => {
  console.log('id',id);
  //console.log('onEdit',onEdit);
  //console.log('onAdd',onAdd);
  const [ text, setText] = useState('');
  const [ day, setDay] = useState('');
  const [ reminder, setReminder] = useState(false);
  const [ data, setData ] = useState({});
  
  useEffect(()=>{
      const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        const re = await res.json()
        setData(re)
        setReminder(data.reminder)
       }
      fetchTask(id)
   }, [id])

  const onSubmit= (e) => {
   e.preventDefault()
    if (!text){
      alert('Please add a task')
      return
    }
    id ? onEdit({id, text, day ,reminder}):onAdd({text, day, reminder});
    setText('');
    setDay('');
    setReminder(false);
}

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
       <label>Task</label>
       <input type='text' placeholder={data ? data.text:'Add Task'} value={text} onChange={(e)=>setText(e.target.value)}></input>
      </div>
      <div className='form-control'>
       <label>Day & Time</label>
       <input type='text' placeholder={data ? data.day:'Add Day & Time'} value={day} onChange={(e)=>setDay(e.target.value)}></input>
      </div>
      <div className='form-control form-control-check' >
       <label>Set Reminder</label>
       <input type='checkbox' checked={data ? data.reminder:reminder} value={reminder} onChange={(e)=>setReminder(e.currentTarget.checked)} ></input>
      </div>
      <input type='submit' value='Save Task' className='btn btn-block'></input>
    </form>
   )
}

export default EditTask;