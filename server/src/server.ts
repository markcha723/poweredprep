import express, { NextFunction, Request, Response } from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./library/Logging";
import Question from "./models/questionModel";

const router = express();
router.use(express.json());

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    Logging.info("connected to mongoDB");
    StartServer();
  })
  .catch((error) => {
    Logging.error("unable to connect:");
    Logging.error(error);
  });

/*
  StartServer()
  used once the backend connects to mongoDB, starts the server
*/
const StartServer = () => {
  router.use((req, res, next) => {
    Logging.info(
      `Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );

    res.on("finish", () => {
      Logging.info(
        `Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
      );
    });

    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  /**
   * ROUTES
   **/
  router.get(
    "/questions",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        Logging.info(`A request was made for all questions.`);
        const questions = await Question.find({});
        res.status(200).json(questions);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  );

  router.get("/questions/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      Logging.info(`The request was for question of id ${id}`);
      const question = await Question.findById(id);
      res.status(200).json(question);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.post("/post-question", async (req: Request, res: Response) => {
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

  router.delete("/delete-question/:id", async (req: Request, res: Response) => {
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

  /* HEALTHCHECK */
  router.get("/ping", (req, res, next) => {
    res.status(200).json({ message: "pong" });
    Logging.info("A healthcheck was made.");
  });

  /* ERROR HANDLING */
  router.use((req, res, next) => {
    const error = new Error("not found");
    Logging.error(error);

    return res.status(404).json({ message: error.message });
  });

  http
    .createServer(router)
    .listen(config.server.port, () =>
      Logging.info(`Server is running on port ${config.server.port}`)
    );
};
