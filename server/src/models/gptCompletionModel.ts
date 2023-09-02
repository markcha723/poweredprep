import mongoose, { Document, Schema } from "mongoose";

export const gptCompletionSchema: Schema = new Schema(
  {
    id: {
      type: String,
      required: [true],
    },
    object: {
      type: String,
      required: [true],
    },
    created: {
      type: Number,
      required: [true],
    },
    model: {
      type: String,
      required: [true],
    },
    choices: [
      {
        index: {
          type: String,
          required: true,
        },
        message: {
          role: { type: String, required: true },
          content: { type: String, required: true },
        },
        finish_reason: { type: String, required: true },
      },
    ],
    usage: {
      prompt_tokens: { type: Number, required: false },
      completion_tokens: { type: Number, required: false },
      total_tokens: { type: Number, required: false },
    },
  },
  { timestamps: true, versionKey: false }
);

const GptCompletionDB = mongoose.model(
  "gpt-completions-tests",
  gptCompletionSchema
);

export default GptCompletionDB;
