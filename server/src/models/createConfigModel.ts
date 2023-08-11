import mongoose, { Document, Schema } from "mongoose";

export const CreateConfigSchema: Schema = new Schema(
  {
    difficulty: {
      type: Array,
      required: [true],
    },
    numberOfQuestions: {
      type: Number,
      required: [true],
    },
    passageStyles: [String],
    passageTopics: [String],
    questionTypes: {
      type: String,
      required: [true],
    },
    section: {
      type: String,
      required: [true],
    },
    wordsToUse: [String],
  },
  {
    timestamps: true,
  }
);

const CreateConfig = mongoose.model("create-requests", CreateConfigSchema);

export default CreateConfig;
