import express from "express";
import OpenAI from "openai";
import Logging from "../library/Logging";
import { CreateRequest, StudyRequest } from "../models/requestModel";
import GptCompletionDB from "../models/gptCompletionModel";
import RequestConfigurationsDB from "../models/questionConfigurations";
import { GptQuestionDB } from "../models/questionModel";
import { RequestConfigurations } from "../interfaces";
import { GptPrompt } from "../interfaces";
import generateGptPrompts from "../middleware/generateGptPrompts";
import { parseGptCompletion } from "../middleware/parseGptCompletions";
import { evaluateReadingDifficulty } from "../middleware/utils";
import { OPENAI_KEY, OPENAI_MODEL, OPENAI_MAX_TOKENS } from "../config/config";

//this is only here for testing
import { Question } from "../models/questionModel";

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
    const { requestType, numberOfQuestions, section } = req.body;
    Logging.info(`The request type is ${requestType}`);

    switch (requestType) {
      case "CREATE":
        await RequestConfigurationsDB.create(req.body);
        Logging.info(`storing request configurations in db.`);
        const prompts = generateGptPrompts(req.body);
        Logging.info(`parsed request.`);
        Logging.info(`sending request to openai with prompts.`);
        const completion = await openai.chat.completions.create({
          messages: [
            { role: "system", content: prompts.system },
            { role: "user", content: prompts.userPrompt },
          ],
          model: OPENAI_MODEL,
          presence_penalty: 1.5,
          n: numberOfQuestions,
          frequency_penalty: 0.3,
        });
        Logging.info(
          `gpt completion successful. storing completion(s) to the db.`
        );
        await GptCompletionDB.create(completion);
        Logging.info(`parsing completion.`);
        let parsedCompletions = parseGptCompletion(completion, section);
        Logging.info(`pushing parsed questions to the db.`);
        await GptQuestionDB.create(parsedCompletions);
        Logging.info("responding to request with parsed completions.");
        res.status(200).json(parsedCompletions);
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

// dummy route to ensure that evaluateReadingDifficulty is working
router.post("/test-difficulty-evaluator", async (req, res) => {
  try {
    Logging.info(
      "A POST request was made to the endpoint /test-difficulty-evaluator."
    );
    const { body } = req;
    res.status(200).send(evaluateReadingDifficulty(body.testString));
  } catch (error) {
    if (error.cause.code) {
      res.status(error.cause.code).send(error.message);
    }
    res.status(500).send(error.message);
  }
});
export default router;
