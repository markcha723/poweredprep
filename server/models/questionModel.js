const mongoose = require("mongoose");

const questionSchema = mongoose.Schema(
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
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
