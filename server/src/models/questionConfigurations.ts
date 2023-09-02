import mongoose, { Document, Schema } from "mongoose";

export const requestConfigurationSchema: Schema = new Schema(
  {
    requestType: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    questionTypes: {
      type: String,
      required: true,
    },
    passageTopics: [String],
    passageStyles: [String],
    numberOfQuestions: {
      type: Number,
      required: true,
    },
    difficulty: [String],
    wordsToUse: [String],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const RequestConfigurationsDB = mongoose.model(
  "request-configurations-tests",
  requestConfigurationSchema
);

export default RequestConfigurationsDB;
