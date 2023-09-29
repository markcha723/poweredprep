import React, { useContext } from "react";
import classes from "./ReviewAnswerChoice.module.css";

const ReviewAnswerChoice = (props) => {
  const {
    choiceLetter,
    text,
    currentCorrectAnswer,
    currentChosenAnswer,
    onMouseUp,
  } = props;
  const wasCorrectAnswer = currentCorrectAnswer === choiceLetter;
  const wasCorrectAndSelected =
    currentChosenAnswer === currentCorrectAnswer &&
    choiceLetter === currentCorrectAnswer;
  const wasChosenAnswerThisChoice = currentChosenAnswer === choiceLetter;
  const wasIncorrect = currentChosenAnswer === currentCorrectAnswer;

  let containerStyling;
  if (wasCorrectAndSelected) {
    containerStyling = `${classes.container} ${classes["was-correct"]}`;
  } else if (wasCorrectAnswer) {
    containerStyling = `${classes.container} ${classes["was-correct"]}`;
  } else if (wasChosenAnswerThisChoice) {
    containerStyling = `${classes.container} ${classes["was-incorrect-and-chosen"]}`;
  } else {
    containerStyling = `${classes.container} ${classes["was-incorrect"]}`;
  }
  return (
    <li className={containerStyling} onMouseUp={onMouseUp || null}>
      <input
        type="radio"
        name="answers"
        id={`answer-${choiceLetter}`}
        checked={wasChosenAnswerThisChoice}
        disabled
      />
      <label className={classes.choice} htmlFor={`answer-${choiceLetter}`}>
        <span>{choiceLetter})</span>
        <p className={classes["answer-text"]}>{text}</p>
      </label>
    </li>
  );
};

export default ReviewAnswerChoice;
