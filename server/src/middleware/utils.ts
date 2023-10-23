import { Question } from "../interfaces";

// the following uses the Automated Readability Index as exposed through wooorm's NPM package
// forms a preliminary assessment of the difficulty of the parsed GPT completions.
export const evaluateReadingDifficulties = (
  questionArray: Array<Question>
): Array<Question> => {
  const difficultyEvaluatedQuestions = questionArray.map((question) => {
    const { body } = question;
    const evaluatedDifficulty = evaluateReadingDifficulty(body);
    return { ...question, difficulty: evaluatedDifficulty };
  });

  return difficultyEvaluatedQuestions;
};

// evaluates a single section of text for its reading level according to the
// Automated Readability Index.
export const evaluateReadingDifficulty = (questionBody: string): string => {
  if (typeof questionBody !== "string") {
    throw new Error("Improper request format!", { cause: { code: 400 } });
  }
  const numberOfWords = questionBody.split(" ").length;
  const numberOfSentences = questionBody.split(/[.?!]/g).filter(Boolean).length;
  const punctuationlessString = questionBody.replace(
    /[.,\/#!$%\^&\*;:{}=\-_`~()]/g,
    ""
  );
  const numberOfCharacters = punctuationlessString.replace(/\s/g, "").length;

  console.log("# of words: " + numberOfWords);
  console.log("# of sentences: " + numberOfSentences);
  console.log("# of characters: " + numberOfCharacters);

  const ariScore = computeARIScore(
    numberOfWords,
    numberOfSentences,
    numberOfCharacters
  );

  console.log(ariScore);
  // "easy" is the default value of each question's difficulty.
  let evaluatedDifficulty = "easy";
  if (ariScore < 9.5) {
    evaluatedDifficulty = "easy";
  }
  if (ariScore >= 9.5 && ariScore <= 10.5) {
    evaluatedDifficulty = "medium";
  }
  if (ariScore > 10.5) {
    evaluatedDifficulty = "hard";
  }

  return evaluatedDifficulty;
};

const computeARIScore = (
  numberOfWords: number,
  numberOfSentences: number,
  numberOfCharacters: number
): number => {
  return (
    4.71 * (numberOfCharacters / numberOfWords) +
    0.5 * (numberOfWords / numberOfSentences) -
    21.43
  );
  //19.5622,12.5
};
