import { useActionState, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  // const [completed, setCompleted] = useState(false);

  return (
    <>
      <h1>PK's Todo App</h1>
      <h2>Today's Task</h2>
      <h2>Count : {count} </h2>
      <button onClick={handleClick}>+1</button>
      <input value={task} onChange={handleChange}></input>
      <h2>task : {task}</h2>
      <button onClick={addTask}>ADD List</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <input type="checkbox" onChange={() => toggleCheck(index)}></input>
            {task.text}
            <button onClick={() => deleteClick(index)}>DELETE</button>
          </li>
        ))}
      </ul>
    </>
  );
  function handleClick() {
    setCount(count + 1);
    console.log("count : " + count);
  }

  function handleChange(event) {
    setTask(event.target.value);
    // console.log("task 2 : "+ event.target.value);
  }

  function addTask() {
    const taskObject = { text: task, completed: false };
    if (task.trim() == "") return;
    setTasks([...tasks, taskObject]);
    setTask("");
  }

  function deleteClick(index) {
    setTasks(tasks.filter((_, i) => i != index));
  }

  function toggleCheck(targetIndex) {
    setTasks(
      tasks.map((task, index) =>
        index === targetIndex ? { ...task, completed: !task.completed } : task,
      ),
    );
  }
}
export default App;
