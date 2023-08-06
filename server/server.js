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

app.get("/questions", async (req, res) => {
  try {
    const questions = await Question.find({});
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/questions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findById(id);
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
