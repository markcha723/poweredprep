import Logging from "../library/Logging";
import { GptCompletion, Question } from "../interfaces";

export const parseGptCompletion = (completion: GptCompletion): Question => {
  let parsedQuestion: Question;
  const content = completion.choices[0].message.content as string;
  const passage = getStringBetween("<<passage>>", "<</passage>>", content);
  return {
    body: passage,
    question: "",
    answerChoices: [
      {
        choiceLetter: "test",
        choiceText: "string",
        correct: false,
        _id: "test",
      },
    ],
    section: "test",
    difficulty: "test",
    subject: "test",
    style: "test",
    _id: "test",
  };
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
    return error.message;
  }
};
