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
    answerChoices: [
      {
        choiceLetter: { type: String, required: "true" },
        choiceText: { type: String, required: "true" },
        correct: { type: Boolean, required: true },
      },
    ],
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

export const Question = mongoose.model("questionsver2", QuestionSchema);
export const GptQuestionsApprovedDB = mongoose.model(
  "gpt-questions-approved",
  QuestionSchema
);
export const QuestionsWithErrorsDB = mongoose.model(
  "questions-with-errors",
  QuestionSchema
);
export const GptQuestionDB = mongoose.model("gpt-questions", QuestionSchema);
export const HUMAN_QUESTIONS_COLLECTION = mongoose.model(
  "human-questions",
  QuestionSchema
);
