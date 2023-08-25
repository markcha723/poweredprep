import mongoose, { Document, Schema } from "mongoose";

export const RequestSchema: Schema = new Schema(
  {
    requestType: {
      type: String,
      required: [true, "No request type has been specified."],
    },
    section: {
      type: String,
      required: [true, "No section type has been specified."],
    },
    questionTypes: {
      type: String,
      required: [true, "No question type has been specified."],
    },
    passageTopics: [
      {
        type: String,
        required: [true, "No question type has been specified."],
      },
    ],
    passageStyles: [
      { type: String, required: [true, "No style has been specified."] },
    ],
    numberOfQuestions: {
      type: Number,
      required: [true, "Question number has not been specified."],
    },
    difficulty: [
      { type: String, required: [true, "Difficulty has not been specified."] },
    ],
    wordsToUse: [{ type: String, required: [false] }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const CreateRequest = mongoose.model("create-requests", RequestSchema);
const StudyRequest = mongoose.model("study-requests", RequestSchema);

export { CreateRequest, StudyRequest };
