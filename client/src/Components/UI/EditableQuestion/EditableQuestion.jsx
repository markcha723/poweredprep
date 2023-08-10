import React, { useState } from "react";
import EditableAnswerChoice from "./EditableAnswerChoice";
import classes from "./EditableQuestion.module.css";

const EditableQuestion = (props) => {
  const questionBodyChangeHandler = (event) => {
    props.updateQuestion(event.target.value);
  };

  const promptChangeHandler = (event) => {
    setPrompt(event.target.value);
  };

  const answerCorrectChangeHandler = (event) => {
    console.log(click);
  };

  return (
    <article
      className={`${classes["question-and-answer"]} ${
        props.disabled ? classes.disabled : ""
      }`}
    >
      <textarea
        type="text"
        className={`${classes["question-body"]} ${
          props.isEditing ? classes.editable : ""
        }`}
        readOnly={!props.isEditing}
        value={props.body}
        onChange={questionBodyChangeHandler}
      />
      <textarea
        type="text"
        className={`${classes.prompt} ${
          props.isEditing ? classes.editable : ""
        }`}
        readOnly={!props.isEditing}
        value={props.prompt}
        onChange={promptChangeHandler}
      />
      <ul className={classes["answer-choices"]}>
        <EditableAnswerChoice
          choiceLetter={props.answerA.choiceLetter}
          text={props.answerA.choiceText}
          isEditing={props.isEditing}
          isCorrect={props.answerA.correct}
          answerCorrectChangeHandler={answerCorrectChangeHandler}
        />
        <EditableAnswerChoice
          choiceLetter={props.answerB.choiceLetter}
          text={props.answerB.choiceText}
          isEditing={props.isEditing}
          isCorrect={props.answerB.correct}
          answerCorrectChangeHandler={answerCorrectChangeHandler}
        />
        <EditableAnswerChoice
          choiceLetter={props.answerC.choiceLetter}
          text={props.answerC.choiceText}
          isEditing={props.isEditing}
          isCorrect={props.answerC.correct}
          answerCorrectChangeHandler={answerCorrectChangeHandler}
        />
        <EditableAnswerChoice
          choiceLetter={props.answerD.choiceLetter}
          text={props.answerD.choiceText}
          isEditing={props.isEditing}
          isCorrect={props.answerD.correct}
          answerCorrectChangeHandler={answerCorrectChangeHandler}
        />
      </ul>
    </article>
  );
};

export default EditableQuestion;
