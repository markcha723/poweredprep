import React, { useState, useReducer } from "react";

const readingQuestionTypes = [
  "explicit meaning",
  "main idea",
  "purpose",
  "words in context",
  "inference",
  "organization",
];
const writingQuestionTypes = [
  "supporting detail",
  "YYNN",
  "punctuation",
  "parallelism",
  "modifiers",
  "verbs",
  "word choice",
  "organization",
];
const topicOptions = [
  "varied",
  "history",
  "earth science",
  "chemistry",
  "social studies",
  "psychology",
  "literature",
];
const styleOptions = [
  "varied",
  "modern",
  "argument",
  "old (1900s)",
  "old (1800s)",
  "flowery",
  "political",
];
const difficultyOptions = ["varied", "easy", "medium", "hard"];

const useConfigValidator = (configs) => {
  const validities = {
    sectionDisplayText: "not selected",
    sectionIsValid: false,
    questionTypeDisplayText: "not selected",
    questionTypeIsValid: false,
    topicsDisplayText: "not selected",
    topicsIsValid: false,
    stylesDisplayText: "not selected",
    stylesIsValid: false,
    difficultyDisplayText: "not selected",
    difficultyIsValid: false,
    questionNumberDisplayText: "not selected",
    questionNumberIsValid: false,
    vocabularyDisplayText: "--",
    vocabularyIsValid: true,
  };
  const {
    section,
    questionTypes,
    passageTopics,
    passageStyles,
    difficulty,
    numberOfQuestions,
    wordsToUse,
  } = configs;
  const invalid = "invalid entry";

  // evaluates to see if section is valid.
  if (section === "reading" || "writing") {
    validities.sectionIsValid = true;
    validities.sectionDisplayText = section;
  } else {
    validities.sectionIsValid = false;
    validities.sectionDisplayText = invalid;
  }

  // evaluates to see if questionTypes is valid.
  if (questionTypes !== null && typeof questionTypes === "string") {
    if (section === "reading") {
      if (readingQuestionTypes.includes(questionTypes)) {
        validities.questionTypeIsValid = true;
        validities.questionTypeDisplayText = questionTypes;
      } else {
        validities.questionTypeIsValid = false;
        validities.questionTypeDisplayText = invalid;
      }
    }
    if (section === "writing") {
      if (writingQuestionTypes.includes(questionTypes)) {
        validities.questionTypeIsValid = true;
        validities.questionTypeDisplayText = questionTypes;
      } else {
        validities.questionTypeIsValid = false;
        validities.questionTypeDisplayText = invalid;
      }
    }
  }

  //evaluates to see if passageTopics is valid.
  if (Object.prototype.toString.call(passageTopics) === "[object Array]") {
    const isContained = passageTopics.every((item) =>
      topicOptions.includes(item)
    );
    const containsVaried = passageTopics.includes("varied");
    if (isContained) {
      validities.topicsIsValid = true;
      validities.topicsDisplayText = containsVaried
        ? "varied"
        : passageTopics.join(", ");
    } else {
      validities.topicsIsValid = false;
      validities.topicsDisplayText = "invalid entry";
    }
  } else {
    validities.topicsIsValid = false;
    validities.topicsDisplayText = "invalid entry";
  }

  //evaluates to see if passageStyles is valid.
  if (Object.prototype.toString.call(passageStyles) === "[object Array]") {
    const isContained = passageStyles.every((item) =>
      styleOptions.includes(item)
    );
    const containsVaried = passageStyles.includes("varied");
    if (isContained) {
      validities.stylesIsValid = true;
      validities.stylesDisplayText = containsVaried
        ? "varied"
        : passageStyles.join(", ");
    } else {
      validities.stylesIsValid = false;
      validities.stylesDisplayText = "invalid entry";
    }
  } else {
    validities.stylesIsValid = false;
    validities.stylesDisplayText = "invalid entry";
  }

  // evaluates to see if difficulty is valid.
  if (Object.prototype.toString.call(difficulty) === "[object Array]") {
    const isContained = difficulty.every((item) =>
      difficultyOptions.includes(item)
    );
    const containsVaried = difficulty.includes("varied");
    if (isContained) {
      validities.difficultyIsValid = true;
      validities.difficultyDisplayText = containsVaried
        ? "varied"
        : difficulty.join(", ");
    } else {
      validities.difficultyIsValid = false;
      validities.stylesDisplayText = "invalid entry";
    }
  } else {
    validities.difficultyIsValid = false;
    validities.difficultyDisplayText = "invalid entry";
  }

  //evaluates to see if numberOfQuestions is valid.
  if (numberOfQuestions === 5 || 10 || 15) {
    validities.questionNumberIsValid = true;
    validities.questionNumberDisplayText = numberOfQuestions;
  } else {
    validities.questionNumberIsValid = false;
    validities.questionNumberDisplayText = "invalid entry";
  }

  //evaluates to see if wordsToUse is valid
  if (Object.prototype.toString.call(wordsToUse) === "[object Array]") {
    if (wordsToUse.length === 0) {
      validities.vocabularyIsValid = true;
      validities.vocabularyDisplayText = "--";
    } else {
      validities.vocabularyIsValid = true;
      validities.vocabularyDisplayText = wordsToUse.join(", ");
    }
  } else {
    validities.vocabularyIsValid = false;
    validities.vocabularyDisplayText = "error";
  }
  return validities;
};

export default useConfigValidator;
