require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Question = require("./models/questionModel");
const app = express();

app.use(express.json());

/* 
  ROUTES
*/
app.get("/api", (req, res) => {
  res.json({ users: ["userOne", "userTwo", "userThree"] });
});

app.get("/blog", (req, res) => {
  res.send("lol!");
});

app.post("/question", async (req, res) => {
  try {
    const question = await Question.create(req.body);
    res.status(200).json(question);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(process.env.MONGO_DB_CONNECTION_URI_TEST)
  .then(() => {
    console.log("connected to mongodb");
    app.listen(process.env.PORT, () => {
      console.log("Server started on port 8080");
    });
  })
  .catch((error) => console.log(error));
