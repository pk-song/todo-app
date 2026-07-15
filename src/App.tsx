import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [inputText, setInputText] = useState("");
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <h1>PK's Todo App</h1>
      <h2>Today's Task</h2>
      <h2>Count : {count} </h2>
      <button onClick={handleClick}>+1</button>
      <input value={inputText} onChange={handleChange}></input>
      <h2>task : {inputText}</h2>
      <button onClick={editingIndex != null ? editTask : addTask}>
        {editingIndex != null ? "EDIT" : "ADD List"}
      </button>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <input type="checkbox" onChange={() => toggleCheck(index)}></input>
            {task.text}
            <button onClick={() => editClick(index)}>EDIT</button>
            <button onClick={() => deleteClick(index)}>DELETE</button>
          </li>
        ))}
      </ul>
    </>
  );

  function editTask() {
    console.log("Task inside of edit : " + inputText);
    console.log("Editing index in editTask : " + editingIndex);
    setTasks(
      tasks.map((task, index) =>
        index === editingIndex ? { ...task, text: inputText } : task,
      ),
    );
    setEditingIndex(null);
    setInputText("");
  }

  function handleClick() {
    setCount(count + 1);
  }

  function handleChange(event) {
    setInputText(event.target.value);
  }

  function addTask() {
    const taskObject = { text: inputText, completed: false };
    if (inputText.trim() == "") return;
    setTasks([...tasks, taskObject]);
    setInputText("");
  }

  function deleteClick(index) {
    setTasks(tasks.filter((_, i) => i != index));
    setInputText("");
  }

  function toggleCheck(targetIndex) {
    setTasks(
      tasks.map((task, index) =>
        index === targetIndex ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function editClick(index) {
    setInputText(tasks[index].text);
    setEditingIndex(index);
    console.log("Editing index in editClick : " + editingIndex);
  }
}
export default App;
