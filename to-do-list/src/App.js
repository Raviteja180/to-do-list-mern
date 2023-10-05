import { useState } from "react";
import axios from "axios";
function App() {
  const [taskname, setTaskname] = useState("");
  const [listOfAllTasks, setListOfAllTasks] = useState([]);
  const addTaskToAllTasks = (taskname) => {
    console.log(taskname);
    setListOfAllTasks([...listOfAllTasks, taskname]);
    axios
      .post("https://to-do-list-mern-nine.vercel.app/", { taskname })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div className="App">
      <input
        type="text"
        name=""
        id=""
        onChange={(e) => {
          console.log(e.target.value);
          setTaskname(e.target.value);
        }}
      />
      <button onClick={(e) => addTaskToAllTasks(taskname)}>Add</button>
      <div>
        {listOfAllTasks.map((task, i) => {
          return <div key={i}>{task}</div>;
        })}
      </div>
    </div>
  );
}

export default App;
