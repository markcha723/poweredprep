import express from "express";
import Logging from "../library/Logging";
import { CreateRequest, StudyRequest } from "../models/requestModel";

const router = express.Router();

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
    const { requestType } = req.body;
    Logging.info(`The request type is ${requestType}`);

    switch (requestType) {
      case "CREATE":
        res.status(200).json({ message: "success!" });
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
