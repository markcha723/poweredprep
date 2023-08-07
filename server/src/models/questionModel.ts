import mongoose, { Document, Schema } from "mongoose";

export const QuestionSchema: Schema = new Schema(
  {
    body: {
      type: String,
      required: [true, "There is no data here."],
    },
    question: {
      type: String,
      required: [true, "There is no question text."],
    },
    answerChoices: {
      type: Array,
      required: [true, "There are no answer choices."],
    },
    section: {
      type: String,
      required: [true, "Section has not been set."],
    },
    difficulty: {
      type: String,
      required: [true, "Difficulty has not been set."],
    },
    subject: {
      type: String,
      required: [true, "Subject has not been set."],
    },
    style: {
      type: String,
      required: [true, "Style has not been set."],
    },
  },
  { timestamps: true, versionKey: false }
);

const Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;
