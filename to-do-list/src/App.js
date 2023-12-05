import { useState } from "react";
import axios from "axios";
function App() {
  const [taskname, setTaskname] = useState("");
  const [listOfAllTasks, setListOfAllTasks] = useState([]);
  const addTaskToAllTasks = async (taskname) => {
    console.log(taskname);
    // setListOfAllTasks([...listOfAllTasks, taskname]);
    axios.defaults.withCredentials = true;
    let res = await axios.post("http://localhost:3001/addTask", { taskname });
    // .post("https://to-do-list-mern-nine.vercel.app/api", { taskname })
    setListOfAllTasks([...listOfAllTasks, res.data]);
    console.log("list of All tasks ", listOfAllTasks);
  };
  const editTask = async () => {};
  const deleteTask = async (id) => {
    axios.defaults.withCredentials = true;
    let res = await axios.delete(`http://localhost:3001/deleteTask/${id}`);
    console.log("after deleting the data is", res);
    setListOfAllTasks(res.data);
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
      <button onClick={(e) => addTaskToAllTasks(taskname)}>Add12</button>
      <div>
        {listOfAllTasks.map((task, i) => {
          return (
            <div key={i}>
              {task.taskname}
              {/* <i className="fa-solid fa-check"></i>
              <i className="fa-sharp fa-regular fa-trash"></i>
              <i className="fa-regular fa-pen-to-square"></i> */}
              {/* <ion-icon name="heart"></ion-icon> */}
              <ion-icon
                name="checkmark-outline"
                onClick={() => console.log("working")}
              ></ion-icon>
              <ion-icon
                name="create-outline"
                onClick={() => editTask(task, i)}
              ></ion-icon>
              <ion-icon
                name="trash-outline"
                onClick={() => deleteTask(task._id)}
              ></ion-icon>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
