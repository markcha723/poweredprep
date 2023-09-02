import Logging from "../library/Logging";
import { GptCompletion, Question, AnswerChoices, Answer } from "../interfaces";

export const parseGptCompletion = (completion: GptCompletion): Question => {
  let parsedQuestion: Question;
  const content = completion.choices[0].message.content as string;
  const passage = getStringBetween("<<passage>>", "<</passage>>", content);
  const prompt = getStringBetween("<<prompt>>", "<</prompt>>", content);
  const rawAnswers = getStringBetween("<<answers>>", "<</answers>>", content);
  const correctAnswer = getStringBetween("<correct>>", "<</correct>>", content)
    .trim()
    .charAt(0) as string;
  const parsedAnswers = parseRawAnswerText(rawAnswers, correctAnswer);
  parsedQuestion = {
    body: passage,
    question: prompt,
    answerChoices: parsedAnswers,
    section: "test",
    difficulty: "easy",
    subject: "test",
    style: "test",
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
    return "getStringBetween() failed";
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
    choiceText: "dummy value",
    correct: correctAnswer === "d",
  });
  return parsedAnswerChoices;
};
