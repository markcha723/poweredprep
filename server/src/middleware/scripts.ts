import Logging from "../library/Logging";
import { GptCompletion, Question, AnswerChoices, Answer } from "../interfaces";

export const parseGptCompletion = (
  completion: GptCompletion,
  section: string
): Array<Question> => {
  const contents = completion.choices.map((item) => {
    return item.message.content as string;
  });

  const parsedContents: Array<Question> = contents.map((rawText) => {
    return transformToQuestionFormat(rawText);
  });
  return parsedContents;
};

const transformToQuestionFormat = (text: string): Question => {
  // attempts to immediately parse the GPT completion assuming that
  // GPT's response was formatted properly.
  let passage = getStringBetween("<<passage>>", "<</passage>>", text).trim();
  let prompt = getStringBetween("<<prompt>>", "<</prompt>>", text).trim();
  let rawAnswers = getStringBetween("<<answers>>", "<</answers>>", text).trim();

  // the following handles failure cases for each of the major sections of Question
  if (rawAnswers === "failed") {
    try {
      rawAnswers = text.split("<<answers>>")[1];
    } catch (error) {
      rawAnswers = "a)ab)bc)cd)d";
    }
  }
  let correctAnswer = getStringBetween("<correct>>", "<</correct>>", text)
    .trim()
    .charAt(0) as string;
  let parsedAnswers = parseRawAnswerText(rawAnswers, correctAnswer);

  if (passage === "failed") {
    passage = getStringBetween("<<passage>>", "<<prompt>>", text).trim();
  }
  if (prompt === "failed") {
    prompt = getStringBetween("<<prompt>>", "<<answers>>", text).trim();
  }
  if (correctAnswer === "failed") {
    correctAnswer = "a";
  }

  const parsedQuestion = {
    body: passage,
    question: prompt,
    answerChoices: parsedAnswers,
    section: "wip",
    difficulty: "easy",
    subject: "wip",
    style: "wip",
  };

  return parsedQuestion;
};

const getStringBetween = (
  startString: string,
  endString: string,
  stringString: string
): string => {
  const extractedString = stringString.match(
    new RegExp(startString + "(.*?)" + endString, "s")
  );
  try {
    return extractedString![1];
  } catch (error) {
    return "failed";
  }
};

const parseRawAnswerText = (
  rawAnswerText: string,
  correctAnswer: string
): AnswerChoices => {
  let parsedAnswerChoices: AnswerChoices = [];
  parsedAnswerChoices.push({
    choiceLetter: "a",
    choiceText: getStringBetween("a\\)", "b\\)", rawAnswerText),
    correct: correctAnswer === "a",
  });
  parsedAnswerChoices.push({
    choiceLetter: "b",
    choiceText: getStringBetween("b\\)", "c\\)", rawAnswerText),
    correct: correctAnswer === "b",
  });
  parsedAnswerChoices.push({
    choiceLetter: "c",
    choiceText: getStringBetween("c\\)", "d\\)", rawAnswerText),
    correct: correctAnswer === "c",
  });
  parsedAnswerChoices.push({
    choiceLetter: "d",
    choiceText: rawAnswerText.substring(
      rawAnswerText.indexOf("d\\)"),
      rawAnswerText.length - 1
    ),
    correct: correctAnswer === "d",
  });
  return parsedAnswerChoices;
};
