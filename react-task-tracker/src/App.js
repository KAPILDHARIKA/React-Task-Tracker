import Header from './components/Header';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Tasks from './components/Tasks';
import { useState, useEffect } from 'react'; 
import Footer from './components/Footer';
import About from './components/About';
import EditTask from './components/EditTask';



function App() {
   const [showAddTask, setShowAddTask] = useState(false)
   const [tasks, setTasks] = useState([]);

   useEffect(()=>{
      const getTasks = async () => {
         const tasksFromServer = await fetchTasks()
        setTasks(tasksFromServer)
       }
      getTasks()
   }, [])

    const fetchTasks = async ()=>{
       const res = await fetch('http://localhost:5000/tasks')
       const data = await res.json()
       return data
     }

    const fetchTask = async (id)=>{
       const res = await fetch(`http://localhost:5000/tasks/${id}`)
       const data = await res.json()
       return data
     }
 
  const addTask =  async (task) => {
      //const id = Math.floor(Math.random()*10000) + 1
     //setTasks([...tasks,{id, ...task}])
     console.log('in Add')
     const res = await fetch(`http://localhost:5000/tasks`,{
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)  //javascript obj to json string
    })

     const data = await res.json()
     setTasks([...tasks,data])
  }

  
  const deleteTask = async (id) => {
     await fetch(`http://localhost:5000/tasks/${id}`, {
     method: 'DELETE',
      })
     setTasks(tasks.filter((task)=>task.id !== id))
  }

  const editTask = async (task) => {
     console.log('in Edit')
     const taskToEdit = await fetchTask(task.id)
     let upTask = {...taskToEdit, ...task}
     //if (task.day) {upTask = {...taskToEdit, day:task.day}}
     //if (task.reminder !== taskToEdit.reminder) {upTask = {...taskToEdit, reminder:task.reminder}}
     console.log('upTask',upTask)
     const res = await fetch(`http://localhost:5000/tasks/${task.id}`,{
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(upTask)  //javascript obj to json string
    })

     const data = await res.json()
     console.log(data)
     setTasks(tasks.map((task)=>tasks.id===task.id? {...task, task:data}: task))
  }

  //toogle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const upTask = {...taskToToggle, reminder:!taskToToggle.reminder}
    const res = await fetch(`http://localhost:5000/tasks/${id} `,{
      method: 'PUT',
     headers:  {'Content-type': 'application/json'
    },
     body: JSON.stringify(upTask)
    })
    const data = await res.json()
    setTasks(tasks.map((task)=>tasks.id===id? {...task, reminder:data.reminder}: task))
  }

  return (
    <div className="container">
      <Header showAdd={showAddTask} onAdd={()=>setShowAddTask(!showAddTask)} title='Task Tracker'></Header>
      {showAddTask && <EditTask onAdd={addTask} ></EditTask>}
      {tasks.length > 0 ?<Tasks tasks={tasks} onEdit={editTask} onToggle={toggleReminder} onDelete={deleteTask}></Tasks>:' No taks to show'}
      <Footer></Footer>
    </div>
  );
}

export default App;
