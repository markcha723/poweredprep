import express from "express";
import {
  Question,
  GptQuestionDB,
  GptQuestionsApprovedDB,
  QuestionsWithErrorsDB,
  HUMAN_QUESTIONS_COLLECTION,
} from "../models/questionModel";
import RequestConfigurationsDB from "../models/questionConfigurations";
import GptCompletionDB from "../models/gptCompletionModel";
import Logging from "../library/Logging";
import { DELETE_PASSWORD } from "../config/config";

const router = express.Router();

// GET
// returns all questions
router.get("/", async (req, res) => {
  try {
    Logging.info(`A request was made for all questions.`);
    const questions = await Question.find({});
    setTimeout(() => {
      res.status(200).json(questions);
    }, 500);
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

// POST
// pushes any submitted questions to MongoDB. currently only works for a single question.
router.post("/", async (req, res) => {
  Logging.info(
    "A POST request was made to push new questions to the database."
  );
  try {
    const { creationType } = req.body;
    if (creationType === undefined) {
      Logging.error(
        "Request was malformed, and did not contain property 'questionType'."
      );
      throw new Error("Request must contain property 'creationType'.", {
        cause: { code: 400 },
      });
    }

    switch (creationType) {
      case "generated":
        Logging.info("Creation type is 'generated'.");
        await GptQuestionsApprovedDB.insertMany(req.body.questions);
        Logging.info(
          `A POST request was approved, and the questions have been added to collection ${GptQuestionsApprovedDB.collection.collectionName}`
        );
        res.status(200).json({
          message:
            "Thank you for approving some questions! They have been saved.",
        });
      case "written":
        Logging.info("Creation type is 'written'.");
        await HUMAN_QUESTIONS_COLLECTION.insertMany(req.body.questions);
        Logging.info(
          `A POST request was approved, and the questions have been added to collection ${HUMAN_QUESTIONS_COLLECTION.collection.collectionName}`
        );
        res.status(200).json({
          message:
            "Thank you for writing some questions! They have been saved.",
        });
    }
  } catch (error) {
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

// a dummy route, used for clearly processing data
// and making sure that the flow of info from client to the backend is clean.
// using a POST request because this should take a password to actually delete!
router.post("/delete", async (req, res) => {
  Logging.info(
    "A POST request was made to wipe the database. Verifying password..."
  );
  try {
    if (DELETE_PASSWORD === req.body.password) {
      Logging.info("Password confirmed. Deleting...");
      await GptQuestionsApprovedDB.deleteMany({});
      await GptCompletionDB.deleteMany({});
      await RequestConfigurationsDB.deleteMany({});
      await GptQuestionDB.deleteMany({});
      Logging.info("Deleted all the relevant data.");
      res.status(200).json({ message: "Successful deletions." });
    } else {
      Logging.info("Wrong password. Sending back failure.");
      res.status(403).json({ message: "Wrong password." });
    }
  } catch (error) {
    Logging.error("Something went wrong.");
    res.status(500).json({ message: "Something went wrong" });
  }
});

// route for testing. useful to ensure that loading animations on the frontend do what they should.
router.get("/test", async (req, res) => {
  const question = await Question.findById("64d54281bb92565a518d672d");
  setTimeout(() => {
    res.status(200).json(question);
  }, 10000);
});

export default router;
