import './App.css';
import { useState } from "react";
import Axios from "axios";

function App() {
  const [title, setTitle] = useState('');
  const [duedate, setDueDate] = useState(0);
  const [description, setDescription] = useState('');

  const [newTitle, setNewTitle] = useState('');

  const [taskList, setTaskList] = useState([]);

  const addTask = () => {
    Axios.post('http://localhost:3001/new', {
      title: title, 
      duedate: duedate,
      description: description,
     }).then(() => {
      console.log('success');
     });
  };

  const getTask = () => {
    Axios.get('http://localhost:3001/tasks').then((response) => {
      setTaskList(response.data)
     });
  };

  const updateTaskTitle = (id) => {
    Axios.put('http://localhost:3001/update', {title: newTitle, id: id}).then(
      (response) => {
        setTaskList(
          taskList.map((val) => {
            return val.id == id 
            ? {
                id: val.id, 
                title: newTitle, 
                duedate: val.duedate, 
                description: val.description
              }
            :val;
          })
        );
      }
    );
  };

  const deleteTask = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`)
  }

  return (
    <div className="App">
      <div className="information">
        <h2>To-do App</h2>
        <label>Title:</label>
        <input 
          type="text" 
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <label>Due date:</label>
        <input 
          type='date'
          onChange={(event) => {
            setDueDate(event.target.value);
          }}
        /> 
        <label>Description:</label>
        <input 
          id='description'
          type="text" 
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <button onClick={addTask}>Add Task</button>
        _______________________________________________________
        <div className='tasks'>
          <button onClick={getTask}>Show Tasks</button>
          {taskList.map((val, key) => {
            return( 
            <div className='task'>
              <div>
                <h3> Title: {val.title} </h3>
                <h3> Due Date: {val.duedate} </h3>
                <h3> Description: {val.description} </h3>
              </div>
              <div> 
                <input type="text"
                  onChange={(event)=>{
                    setNewTitle(event.tagert.value);
                  }}
                /> 
                <button 
                  onClick={() =>{
                    updateTaskTitle(val.id);
                  }}
                >
                  {""}
                  Update
                </button>

                <button 
                  onClick={() =>{
                    deleteTask(val.id);
                  }}
                >
                  {""}
                  Delete
                </button>

              </div>
            </div>
            );
          })}
        </div>
      </div> 
    </div>
  );
}

export default App;
