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
    origin: "https://to-do-list-mern-frontend2.vercel.app",
    methods: ["GET", "POST"],
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
  name: String,
};

const data = mongoose.model("userdetails", schema);
app.get("/", function (req, res) {
  res.send("express is working and everything is fine for now");
});
app.post("/api", (req, res) => {
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
