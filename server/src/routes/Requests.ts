import express from "express";
import OpenAI from "openai";
import Logging from "../library/Logging";
import { CreateRequest, StudyRequest } from "../models/requestModel";
import GptCompletionDB from "../models/gptCompletionModel";
import Question from "../models/questionModel";
import { QuestionConfigurations } from "../interfaces";
import { GptPrompt } from "../interfaces";
import generateGptPrompts from "../middleware/generateGptPrompts";
import { parseGptCompletion } from "../middleware/scripts";
import { OPENAI_KEY, OPENAI_MODEL, OPENAI_MAX_TOKENS } from "../config/config";

const router = express.Router();
const openai = new OpenAI({
  apiKey: OPENAI_KEY,
});

// GET
// returns the number of requests made and which types they were
router.get("/", async (req, res) => {
  try {
    Logging.info('A "GET" request was made for all prior requests.');
    const createRequests = await CreateRequest.find({});
    const studyRequests = await StudyRequest.find({});
    const response = {
      createRequestsNumber: createRequests.length,
      studyRequestsNumber: studyRequests.length,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST
// returns a set of questions that corresponds to the user's request
// evaluates CREATE and STUDY requests
router.post("/", async (req, res) => {
  Logging.info("A POST request was made to /request/");
  try {
    const { requestType, numberOfQuestions } = req.body;
    Logging.info(`The request type is ${requestType}`);

    switch (requestType) {
      case "CREATE":
        const prompts = generateGptPrompts(req.body);
        Logging.info(`parsed -> ${prompts.system} \n-> ${prompts.userPrompt}`);
        Logging.info(`sending request...`);
        const completion = await openai.chat.completions.create({
          messages: [
            { role: "system", content: prompts.system },
            { role: "user", content: prompts.userPrompt },
          ],
          model: OPENAI_MODEL,
        });
        GptCompletionDB.create(completion);
        let parsedCompletion = parseGptCompletion(completion);
        Logging.info("responding to request...");
        res.status(200).json(parsedCompletion);
        break;
      case "STUDY":
        res.status(200).json({ message: "success!" });
        break;
      default:
        Logging.error("The request type is invalid!");
        res.status(400).json({ message: "Invalid request type!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
