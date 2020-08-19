const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");

const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
} = require("./Controllers");

const app = express();
const port = 3000;

mongoose.connect(
  "mongodb+srv://yaswanth:YaswanthDB@cluster0-n1x8n.mongodb.net/todo-app?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "db connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("connected to database");
});

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app
  .route("/api/todo")
  .get(getTodos)
  .post(createTodo)
  .put(updateTodo)
  .delete(deleteTodo);

app.use((req, res, next) => {
  res.status(404).type("text").send("Not Found");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
