import express from "express";
import Question from "../models/questionModel";
import Logging from "../library/Logging";

const router = express.Router();

// returns all questions
router.get("/", async (req, res) => {
  try {
    Logging.info(`A request was made for all questions.`);
    const questions = await Question.find({});
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// returns a single question by ID (assigned by MongoDB)
router.get("/question/:id", async (req, res) => {
  try {
    const { id } = req.params;
    Logging.info(`The request was for question of id ${id}`);
    const question = await Question.findById(id);
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// pushes any submitted questions to MongoDB. currently only works for a single question.
router.post("/create", async (req, res) => {
  Logging.info("A POST request was made to create a question.");
  try {
    const question = await Question.create(req.body);
    Logging.info(
      "A POST request was approved, and the question has been added to the database."
    );
    res.status(200).json(question);
  } catch (error) {
    console.log(error.message);
    Logging.error("The POST request was denied.");
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  Logging.info(`A DELETE request was made for the question of ID: ${id}`);
  try {
    const text = await Question.deleteOne({ _id: id });
    Logging.info(
      "The DELETE request was approved, and one question has been deleted."
    );
    res.status(200).json(text);
  } catch (error) {
    console.log(error.message);
    Logging.error("The DELETE request was denied.");
    res.status(500).json({ message: error.message });
  }
});

// route for testing. useful to ensure that loading animations on the frontend do what they should.
router.get("/test", async (req, res) => {
  const question = await Question.findById("64d54281bb92565a518d672d");
  setTimeout(() => {
    res.status(200).json(question);
  }, 1000);
});

export default router;
