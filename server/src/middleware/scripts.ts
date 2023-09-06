import Logging from "../library/Logging";
import { GptCompletion, Question, AnswerChoices, Answer } from "../interfaces";

export const parseGptCompletion = (
  completion: GptCompletion,
  section: string
): Question => {
  let parsedQuestion: Question;
  const content = completion.choices[0].message.content as string;
  let passage = getStringBetween("<<passage>>", "<</passage>>", content).trim();
  let prompt = getStringBetween("<<prompt>>", "<</prompt>>", content).trim();
  let rawAnswers = getStringBetween(
    "<<answers>>",
    "<</answers>>",
    content
  ).trim();
  if (rawAnswers === "failed") {
    try {
      rawAnswers = content.split("<<answers>>")[1];
    } catch (error) {
      rawAnswers = "a)ab)bc)cd)d";
    }
  }
  let correctAnswer = getStringBetween("<correct>>", "<</correct>>", content)
    .trim()
    .charAt(0) as string;
  let parsedAnswers = parseRawAnswerText(rawAnswers, correctAnswer);

  if (passage === "failed") {
    passage = getStringBetween("<<passage>>", "<<prompt>>", content).trim();
  }
  if (prompt === "failed") {
    prompt = getStringBetween("<<prompt>>", "<<answers>>", content).trim();
  }
  if (correctAnswer === "failed") {
    correctAnswer = "a";
  }

  parsedQuestion = {
    body: passage,
    question: prompt,
    answerChoices: parsedAnswers,
    section: section,
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
