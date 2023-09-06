import dotenv from "dotenv";

dotenv.config();

export const OPENAI_KEY = process.env.OPENAI_API_KEY || "";
export const OPENAI_MODEL = process.env.OPENAI_MODEL || "";
export const OPENAI_MAX_TOKENS = process.env.OPENAI_MAX_TOKENS || "";
export const DELETE_PASSWORD = process.env.DELETE_PASSWORD || "";
const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@poweredprepapi.z4gjc2t.mongodb.net/Test-API`;

const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 1337;

export const config = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
  },
};
