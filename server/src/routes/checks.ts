import express from "express";
import Logging from "../library/Logging";

const router = express.Router();

/* HEALTHCHECK */
router.get("/ping", (req, res, next) => {
  res.status(200).json({ message: "pong" });
  Logging.info("A healthcheck was made.");
});

export default router;
