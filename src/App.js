import React, { useState, useEffect } from "react";
import  "./App.css"
import TaskList from "./TaskList"
import InputBox from "./InputBox";

const LOCAL_STORAGE_KEY = 'taskApp.tasks'

function App() {

  const [tasks, setTasks] = useState([])
  const [listInistialised, initialiseList] = useState(false)
  const [taskName, setTaskName] = useState('')
  const [taskID, setTaskID] = useState(1)

  //First load any saved list from local storage
  useEffect(() => {
    const stroredTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (stroredTasks) {
      console.log("loading")
      setTasks(stroredTasks)
    }
    initialiseList(true)
  }, [])

  //If list changed, store the change to local storage (only if initial loading done)
  useEffect(() => {
    if(listInistialised) {
      console.log("saving")
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks))
    }
  }, [tasks])

  //Add new task to list
  function saveTask() {
    console.log("adding task " + taskID)
    const task =  {
      id: taskID,
      text: taskName
    }
    setTaskID(taskID + 1)
    setTasks([...tasks, task])
    setTaskName('')
  }

  //make sure input field == taskName
  useEffect(() => {
    document.getElementById("taskText").value = taskName
  }, [taskName])

  //Update list excluding removed task
  function removeTask(id) {
    console.log("removing task " + id)
    const newlist = tasks.filter(task => task.id !== id)
    setTasks(newlist)
  }

  return (
    <>
    <h1 className="text-text">Welcome to your tasklist!</h1>
      <div id="controls">
          <h2 className="sub-text">Add a new task</h2>
          <InputBox query={taskName} update={setTaskName} save={saveTask}/>
      </div>
      
      <div id="list">
        <div id="list-items">
          <h2 className="sub-text">Your tasks:</h2>
          <TaskList tasks={tasks} remove={removeTask}/>
        </div>
      </div>

      <div id="list-background-pattern"></div>
    </>
  );

}

export default App;
