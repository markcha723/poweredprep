import { QuestionConfigurations } from "../interfaces";
import { GptPrompt } from "../interfaces";

const generateGptPrompt = (incomingRequest: QuestionConfigurations) => {
  const {
    section,
    questionTypes,
    passageTopics,
    passageStyles,
    numberOfQuestions,
    difficulty,
    wordsToUse,
  } = incomingRequest;
  let prompts: GptPrompt;
  let userPrompt = "";
  let systemMessage =
    "You are an SAT teacher. Each SAT question contains a paragraph-long excerpt, followed by a prompt, and followed by four answer choices only one of which can be correct. Use the following format:\n<<passage>>\npassage goes here\n<</passage>><<prompt>>\nWhich of the following is true about...\n<</prompt>>\n\n<<answers>>\na)\nb)\nc)\nd)\n<</answers>>\n\nNote that the text inside of <<prompt>> and <<answers>> should be of a consistent tone and style to the SAT, and should NOT follow the style of the <<passage>>.";

  userPrompt += generateSectionText(section);
  userPrompt += generateQuestionTypeText(section, questionTypes);
  userPrompt += generatePassageStylesText(passageStyles);
  userPrompt += generatePassageTopicsText(passageTopics);
  userPrompt += generateDifficultyText(difficulty);
  userPrompt += generateWordsToUseText(wordsToUse);
  // wip, implementation should be rethought. token-heavier approach may be more effective.
  const textForNumberOfQuestions = `Write a question. `;
  userPrompt += textForNumberOfQuestions;

  prompts = {
    system: systemMessage,
    userPrompt: userPrompt,
  };

  return prompts;
};

const generateSectionText = (section: string) => {
  let textForSection = "";
  switch (section) {
    case "reading":
      textForSection =
        "You are designing reading comprehension section questions ";
      break;
    case "writing":
      textForSection = "You are designing writing & grammar section questions ";
      break;
  }
  return textForSection;
};

const generateQuestionTypeText = (section: string, questionTypes: string) => {
  let textForQuestionTypes = "";
  if (section === "reading") {
    switch (questionTypes) {
      case "explicit meaning":
        textForQuestionTypes =
          "that test students for their understanding of explicit meaning. ";
        break;
      case "main idea":
        textForQuestionTypes =
          "that test students for their understanding of main idea. ";
        break;
      case "purpose":
        textForQuestionTypes =
          "that test students for their understanding of the purpose of specific lines in the paragraph. ";
        break;
      case "words in context":
        textForQuestionTypes =
          "that test students for their understanding of the meaning of words in context. ";
        break;
      case "inference":
        textForQuestionTypes =
          "that test students' ability to infer information from details in the paragraph. ";
        break;
      case "organization":
        textForQuestionTypes =
          "that test students for their understanding of the structure of the paragraph. ";
        break;
    }
  }
  if (section === "writing") {
    throw new Error(
      "An attempt was made to create a writing type question. This is under development."
    );
  }
  return textForQuestionTypes;
};

// assigning passage style text.
// WIP FEATURE: see above. same applies.
const generatePassageStylesText = (passageStyles: string[]) => {
  let textForPassageStyles = "";
  if (passageStyles.includes("varied")) {
    textForPassageStyles =
      "The passages should be written in a variety of styles, such as in more modern English, or some in 1800s English. ";
  } else {
    switch (passageStyles[0]) {
      case "modern":
        textForPassageStyles =
          "The passages should be written in a modern style. ";
        break;
      case "argument":
        textForPassageStyles =
          "The passages should be written in an argumentative style. ";
        break;
      case "old (1900s)":
        textForPassageStyles =
          "The passages should be written in the style of 1900s English. ";
        break;
      case "old (1800s)":
        textForPassageStyles =
          "The passages should be written in the style of 1800s English. ";
        break;
      case "flowery":
        textForPassageStyles =
          "The passages should be written in a verbose, flowery style. ";
        break;
      case "political":
        textForPassageStyles =
          "The passages should be written in the style of a speech. ";
        break;
    }
  }
  return textForPassageStyles;
};

// assigning topic text.
// WIP FEATURE: currently, this only really works for the FIRST item of the array, and doesn't work with more than one option. improve this.
// moreover, this may be where we'd need to change a part of the system message to force GPT to pick what topic it thinks its passages
// are when "varied" is enabled.
const generatePassageTopicsText = (passageTopics: string[]) => {
  let textForPassageTopics = "";
  if (passageTopics.includes("varied")) {
    textForPassageTopics =
      "The passages should be on a variety of topics including social studies, literature, poetry, psychology, earth science, chemistry, culture, and politics. ";
  } else {
    switch (passageTopics[0]) {
      case "history":
        textForPassageTopics =
          "The passages should focus on topics related to history. ";
        break;
      case "earth science":
        textForPassageTopics =
          "The passages should focus on topics related to earth science. ";
        break;
      case "chemistry":
        textForPassageTopics =
          "The passages should focus on topics related to chemistry. ";
        break;
      case "social studies":
        textForPassageTopics =
          "The passages should focus on topics related to social studies. ";
        break;
      case "psychology":
        textForPassageTopics =
          "The passages should focus on topics related to psychology. ";
        break;
      case "literature":
        textForPassageTopics =
          "The passages should focus on topics related to literature. ";
        break;
    }
  }
  return textForPassageTopics;
};

const generateDifficultyText = (difficulty: string[]) => {
  let textForDifficulty = "";
  if (difficulty.includes("varied")) {
    textForDifficulty =
      "The passages should be of varying difficulty, from 8th grade level to more challenging 12th grade level topics, vocabulary, syntax, and structure. ";
  } else {
    switch (difficulty[0]) {
      case "easy":
        textForDifficulty =
          "The passages should be of 8th-9th grade level topics, vocabulary, syntax, and structure. ";
        break;
      case "medium":
        textForDifficulty =
          "The passages should be of 10th-11th grade level topics, vocabulary, syntax, and structure. ";
        break;
      case "hard":
        textForDifficulty =
          "The passages should be of 12th grade level topics, vocabulary, syntax, and structure. ";
        break;
    }
  }
};

const generateWordsToUseText = (wordsToUse: string[]) => {
  let textForWordsToUse: string;
  if (wordsToUse.length === 0) {
    textForWordsToUse = "";
  } else {
    const words = wordsToUse.map((item: String) => `${item} `);
    textForWordsToUse = `The students have requested that the following words be used in the questions: ${words}. `;
  }
  return textForWordsToUse;
};

// unused, might not use this implementation at all.
const generateQuestionNumberText = (questionNumber: number) => {};
export default generateGptPrompt;
