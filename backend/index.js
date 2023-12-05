// import cors from "cors";
const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.listen(3001, () => {
  console.log("server is listening on 3001");
});
app.use(
  cors({
    // origin: "https://to-do-list-mern-frontend2.vercel.app",
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
mongoose.connect(
  "mongodb+srv://Raviteja180:Raviteja180@cluster1.dusxcml.mongodb.net/todos?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

const schema = {
  taskname: String,
};

const data = mongoose.model("listOfAllTasks", schema);
app.get("/", function (req, res) {
  res.send("express is working and everything is fine for now");
});
app.post("/addTask", (req, res) => {
  console.log(req.body);
  // res.send(req.body);
  // console.log(req.body);
  const { taskname } = req.body;
  // res.send(username);
  // const dataDoc = new data({ name: username });
  // dataDoc
  //   .save()
  //   .then((result) => res.send(result))
  //   .catch((err) => {
  //     console.log(err);
  //   });
  data
    .create({ taskname: taskname })
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
});
app.delete("/deleteTask/:id", async (req, res) => {
  console.log(req);
  const itemId = req.params.id;
  // res.json(itemId);

  const item = await data.findById(itemId);
  if (item) {
    // res.status(200).json(item);
    await data.findByIdAndRemove(itemId);
    // res.status(200).json({ message: "success" });
    let alldata = await data.find();
    res.send(alldata);
  } else {
    res.json({ message: "not found" });
  }
});
