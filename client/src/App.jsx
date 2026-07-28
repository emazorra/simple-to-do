import { useState, useEffect } from "react";
import "./App.css";
import TaskComponent from "./TaskCard";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetch("/tasks", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((taskData) => setTasks(taskData))
      .catch((err) => console.error(err.message));
  }, []);

  const handleSubmit = ((e) => {

    e.preventDefault();

    fetch("/tasks", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ task: newTask })
    })
      .then((data) => data.json())
      .then((taskData) => setTasks([...tasks, taskData]))
      .then(() => setNewTask(""))

  })

  const handleToggleComplete = (taskId) => {

   tasks.find 

    fetch(`/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify
    })
  }

  return (
    <div>
      {" "}
      {tasks.map((task) => (
        <TaskComponent
          key={task._id}
          task={task.task}
          date={task.date}
          completed={task.completed}
          handleToggleComplete={handleToggleComplete}
        />
      ))}
      <div>
        <form onSubmit={handleSubmit}>
          <label>Input New Task: </label>
          <input type="text" name="new task" value={newTask} onChange={(e) => setNewTask(e.target.value)}></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
