import express, { NextFunction, Request, Response } from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./library/Logging";

const Question = require("./models/questionModel");

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

  /* ROUTES */

  /* HEALTHCHECK */
  router.get("/ping", (req, res, next) =>
    res.status(200).json({ message: "pong" })
  );

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

/* 
  ROUTES
*/
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

router.post("/question", async (req: Request, res: Response) => {
  try {
    const question = await Question.create(req.body);
    res.status(200).json(question);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
