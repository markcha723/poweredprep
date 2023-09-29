import React, { useContext } from "react";
import classes from "./Question.module.css";
import AnswerChoice from "../AnswerChoice/AnswerChoice";
import TextSelectionTooltip from "../TextSelectionTooltip/TextSelectionTooltip";
import StudyContext from "../../../store/study-context";
import ReviewAnswerChoice from "../ReviewAnswerChoice/ReviewAnswerChoice";

const Question = (props) => {
  const { state, dispatch } = useContext(StudyContext);
  const {
    activeQuestion,
    chosenAnswers,
    activeIndex,
    isReviewing,
    correctAnswers,
  } = state;
  const {
    answerChoices,
    question: prompt,
    body: questionBody,
  } = activeQuestion;
  const currentChosenAnswer = chosenAnswers[activeIndex];
  const currentCorrectAnswer = correctAnswers[activeIndex];
  const gotCurrentQuestionCorrect =
    currentChosenAnswer === currentCorrectAnswer;

  let badgeStyling = classes["question-number-badge"];
  if (isReviewing) {
    if (gotCurrentQuestionCorrect) {
      badgeStyling = `${classes["question-number-badge"]} ${classes["badge-correct"]}`;
    } else {
      badgeStyling = `${classes["question-number-badge"]} ${classes["badge-incorrect"]}`;
    }
  }

  return (
    <article className={classes["question-and-answer"]}>
      <div className={badgeStyling}>{activeIndex + 1}</div>
      <p
        className={classes["question-body"]}
        onMouseUp={props.onWordHighlight || null}
      >
        {questionBody}
      </p>
      <p className={classes.prompt} onMouseUp={props.onWordHighlight || null}>
        {prompt}
      </p>
      <AnswerChoicesContent
        isReviewing={isReviewing}
        answerChoices={answerChoices}
        currentChosenAnswer={currentChosenAnswer}
        currentCorrectAnswer={currentCorrectAnswer}
        onWordHighlight={props.onWordHighlight}
      />
    </article>
  );
};

// the following is extracted out like this because it's repetitive.
const AnswerChoicesContent = (props) => {
  const {
    isReviewing,
    answerChoices,
    currentChosenAnswer,
    currentCorrectAnswer,
    onWordHighlight,
  } = props;
  if (isReviewing) {
    return (
      <ul className={classes["answer-choices"]}>
        <ReviewAnswerChoice
          choiceLetter={answerChoices[0].choiceLetter}
          text={answerChoices[0].choiceText}
          currentCorrectAnswer={currentCorrectAnswer}
          currentChosenAnswer={currentChosenAnswer}
          onMouseUp={onWordHighlight || null}
        ></ReviewAnswerChoice>
        <ReviewAnswerChoice
          choiceLetter={answerChoices[1].choiceLetter}
          text={answerChoices[1].choiceText}
          currentCorrectAnswer={currentCorrectAnswer}
          currentChosenAnswer={currentChosenAnswer}
          onMouseUp={onWordHighlight || null}
        ></ReviewAnswerChoice>
        <ReviewAnswerChoice
          choiceLetter={answerChoices[2].choiceLetter}
          text={answerChoices[2].choiceText}
          currentCorrectAnswer={currentCorrectAnswer}
          currentChosenAnswer={currentChosenAnswer}
          onMouseUp={onWordHighlight || null}
        ></ReviewAnswerChoice>
        <ReviewAnswerChoice
          choiceLetter={answerChoices[3].choiceLetter}
          text={answerChoices[3].choiceText}
          currentCorrectAnswer={currentCorrectAnswer}
          currentChosenAnswer={currentChosenAnswer}
          onMouseUp={onWordHighlight || null}
        ></ReviewAnswerChoice>
      </ul>
    );
  } else {
    return (
      <ul className={classes["answer-choices"]}>
        <AnswerChoice
          choiceLetter={answerChoices[0].choiceLetter}
          text={answerChoices[0].choiceText}
          isSelected={currentChosenAnswer === answerChoices[0].choiceLetter}
          onMouseUp={onWordHighlight || null}
        />
        <AnswerChoice
          choiceLetter={answerChoices[1].choiceLetter}
          text={answerChoices[1].choiceText}
          isSelected={currentChosenAnswer === answerChoices[1].choiceLetter}
          onMouseUp={onWordHighlight || null}
        />
        <AnswerChoice
          choiceLetter={answerChoices[2].choiceLetter}
          text={answerChoices[2].choiceText}
          isSelected={currentChosenAnswer === answerChoices[2].choiceLetter}
          onMouseUp={onWordHighlight || null}
        />
        <AnswerChoice
          choiceLetter={answerChoices[3].choiceLetter}
          text={answerChoices[3].choiceText}
          isSelected={currentChosenAnswer === answerChoices[3].choiceLetter}
          onMouseUp={onWordHighlight || null}
        />
      </ul>
    );
  }
};

export default Question;
