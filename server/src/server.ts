import express, { NextFunction, Request, Response } from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./library/Logging";
import Question from "./models/questionModel";

import questionsRoutes from "./routes/Questions";
import checksRoutes from "./routes/checks";

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

  // routes
  router.use("/questions", questionsRoutes);
  router.use("/checks", checksRoutes);

  // error handling
  router.use((req, res, next) => {
    const error = new Error("not found");
    Logging.error(error);

    return res.status(404).json({ message: error.message });
  });

  // starts the server
  http
    .createServer(router)
    .listen(config.server.port, () =>
      Logging.info(`Server is running on port ${config.server.port}`)
    );
};
