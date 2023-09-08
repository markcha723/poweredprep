export const readingQuestionTypes = [
  "explicit meaning",
  "main idea",
  "purpose",
  "words in context",
  "inference",
  "organization",
];
export const writingQuestionTypes = [
  "supporting detail",
  "YYNN",
  "punctuation",
  "parallelism",
  "modifiers",
  "verbs",
  "word choice",
  "organization",
];
export const topicOptions = [
  "varied",
  "history",
  "earth science",
  "chemistry",
  "social studies",
  "psychology",
  "literature",
];
export const styleOptions = [
  "varied",
  "modern",
  "argument",
  "old (1900s)",
  "old (1800s)",
  "flowery",
  "political",
];
export const difficultyOptions = ["varied", "easy", "medium", "hard"];
const invalidString = "invalid entry";

export const useConfigValidator = (configs) => {
  // deconstructs the configuration variable,
  // allowing each of its properties to be read and validated.
  const {
    section,
    questionTypes,
    passageTopics,
    passageStyles,
    difficulty,
    numberOfQuestions,
    wordsToUse,
  } = configs;

  // parse all configs to make sure their data is valid.
  const {
    sectionIsValid,
    sectionDisplayText,
    questionTypeIsValid,
    questionTypeDisplayText,
  } = validateSectionAndQuestion(section, questionTypes);

  const { topicsIsValid, topicsDisplayText } =
    validatePassageTopics(passageTopics);

  const { stylesIsValid, stylesDisplayText } =
    validatePassageStyles(passageStyles);

  const { difficultyIsValid, difficultyDisplayText } =
    validateDifficulty(difficulty);

  const { questionNumberIsValid, questionNumberDisplayText } =
    validateQuestionNum(numberOfQuestions);

  const { vocabularyIsValid, vocabularyDisplayText } =
    validateVocabulary(wordsToUse);

  return {
    sectionIsValid,
    sectionDisplayText,
    questionTypeIsValid,
    questionTypeDisplayText,
    topicsIsValid,
    topicsDisplayText,
    stylesIsValid,
    stylesDisplayText,
    difficultyIsValid,
    difficultyDisplayText,
    questionNumberDisplayText,
    questionNumberIsValid,
    vocabularyIsValid,
    vocabularyDisplayText,
  };
};

const validateSectionAndQuestion = (section, questionTypes) => {
  let sectionDisplayText = "not selected";
  let sectionIsValid = false;
  let questionTypeDisplayText = "not selected";
  let questionTypeIsValid = false;

  if (section === null) {
    sectionIsValid = false;
    sectionDisplayText = "not selected";
  }

  if (questionTypes === null) {
    questionTypeIsValid = false;
    questionTypeIsValid = "not selected";
  }

  if (typeof section !== "string" || typeof questionTypes !== "string") {
    sectionIsValid = false;
    sectionDisplayText = invalidString;
    questionTypeIsValid = false;
    questionTypeIsValid = invalidString;
  }

  if (typeof section === "string" && (section !== "reading" || "writing")) {
    sectionIsValid = false;
    sectionDisplayText = invalidString;
  }

  // happy path evaluation
  if (section === "reading") {
    if (readingQuestionTypes.includes(questionTypes)) {
      sectionIsValid = true;
      sectionDisplayText = section;
      questionTypeIsValid = true;
      questionTypeDisplayText = questionTypes;
    } else {
      sectionIsValid = false;
      sectionDisplayText = section;
      questionTypeIsValid = false;
      questionTypeDisplayText = invalidString;
    }
  }
  if (section === "writing") {
    if (writingQuestionTypes.includes(questionTypes)) {
      sectionIsValid = true;
      sectionDisplayText = section;
      questionTypeIsValid = true;
      questionTypeDisplayText = questionTypes;
    } else {
      sectionIsValid = false;
      sectionDisplayText = section;
      questionTypeIsValid = false;
      questionTypeDisplayText = invalidString;
    }
  }

  return {
    sectionDisplayText,
    sectionIsValid,
    questionTypeDisplayText,
    questionTypeIsValid,
  };
};

const validatePassageTopics = (passageTopics) => {
  let topicsDisplayText = "not selected";
  let topicsIsValid = false;

  if (Object.prototype.toString.call(passageTopics) === "[object Array]") {
    const isContained = passageTopics.every((item) =>
      topicOptions.includes(item)
    );
    const containsVaried = passageTopics.includes("varied");
    if (isContained) {
      topicsIsValid = true;
      topicsDisplayText = containsVaried ? "varied" : passageTopics.join(", ");
    } else {
      topicsIsValid = false;
      topicsDisplayText = invalidString;
    }
  } else {
    topicsIsValid = false;
    topicsDisplayText = invalidString;
  }

  return {
    topicsDisplayText,
    topicsIsValid,
  };
};

const validatePassageStyles = (passageStyles) => {
  let stylesIsValid = false;
  let stylesDisplayText = "not selected";

  if (Object.prototype.toString.call(passageStyles) === "[object Array]") {
    const isContained = passageStyles.every((item) =>
      styleOptions.includes(item)
    );
    const containsVaried = passageStyles.includes("varied");
    if (isContained) {
      stylesIsValid = true;
      stylesDisplayText = containsVaried ? "varied" : passageStyles.join(", ");
    } else {
      stylesIsValid = false;
      stylesDisplayText = invalidString;
    }
  } else {
    stylesIsValid = false;
    stylesDisplayText = invalidString;
  }

  return {
    stylesIsValid,
    stylesDisplayText,
  };
};

const validateDifficulty = (difficulty) => {
  let difficultyIsValid = false;
  let difficultyDisplayText = "not selected";

  if (Object.prototype.toString.call(difficulty) === "[object Array]") {
    const isContained = difficulty.every((item) =>
      difficultyOptions.includes(item)
    );
    const containsVaried = difficulty.includes("varied");
    if (isContained) {
      difficultyIsValid = true;
      difficultyDisplayText = containsVaried ? "varied" : difficulty.join(", ");
    } else {
      difficultyIsValid = false;
      difficultyDisplayText = invalidString;
    }
  } else {
    difficultyIsValid = false;
    difficultyDisplayText = invalidString;
  }

  return {
    difficultyIsValid,
    difficultyDisplayText,
  };
};

const validateQuestionNum = (questionNum) => {
  let questionNumberIsValid = false;
  let questionNumberDisplayText = "not selected";

  if (questionNum === 5 || questionNum === 10 || questionNum === 15) {
    questionNumberIsValid = true;
    questionNumberDisplayText = questionNum;
  } else {
    questionNumberIsValid = false;
    questionNumberDisplayText = invalidString;
  }

  return {
    questionNumberIsValid,
    questionNumberDisplayText,
  };
};

const validateVocabulary = (wordsToUse) => {
  let vocabularyIsValid = false;
  let vocabularyDisplayText = "--";

  if (Object.prototype.toString.call(wordsToUse) === "[object Array]") {
    if (wordsToUse.length === 0) {
      vocabularyIsValid = true;
      vocabularyDisplayText = "--";
    } else {
      vocabularyIsValid = true;
      vocabularyDisplayText = wordsToUse.join(", ");
    }
  } else {
    vocabularyIsValid = false;
    vocabularyDisplayText = invalidString;
  }

  return {
    vocabularyIsValid,
    vocabularyDisplayText,
  };
};
