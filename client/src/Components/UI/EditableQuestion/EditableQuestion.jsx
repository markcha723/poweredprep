import React, { useState } from "react";
import EditableAnswerChoice from "./EditableAnswerChoice";
import classes from "./EditableQuestion.module.css";

const EditableQuestion = (props) => {
  const questionBodyChangeHandler = (event) => {
    props.setBody(event.target.value);
  };

  const promptChangeHandler = (event) => {
    props.setPrompt(event.target.value);
  };

  const answerCorrectChangeHandler = (changeTo) => {
    const tempAnswerArray = props.answerChoices.map((answer) =>
      answer.choiceLetter === changeTo
        ? { ...answer, correct: true }
        : { ...answer, correct: false }
    );
    props.setAnswerChoices(tempAnswerArray);
  };

  const answerFieldChangeHandler = (event, changedAnswer) => {
    console.log(`you changed an answer field's value!`);
    console.log(
      `letter ${changedAnswer} now has a value of ${event.target.value}`
    );
    const tempAnswerArray = props.answerChoices.map((answer) =>
      answer.choiceLetter === changedAnswer
        ? { ...answer, choiceText: event.target.value }
        : answer
    );
    props.setAnswerChoices(tempAnswerArray);
  };

  console.log(props.answerChoices);

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
          choiceLetter={props.answerChoices[0].choiceLetter}
          text={props.answerChoices[0].choiceText}
          isEditing={props.isEditing}
          isCorrect={props.answerChoices[0].correct}
          changeCorrectAnswer={() => answerCorrectChangeHandler("a")}
          onChange={(event) => answerFieldChangeHandler(event, "a")}
        />
        <EditableAnswerChoice
          choiceLetter={props.answerChoices[1].choiceLetter}
          text={props.answerChoices[1].choiceText}
          isEditing={props.isEditing}
          isCorrect={props.answerChoices[1].correct}
          changeCorrectAnswer={() => answerCorrectChangeHandler("b")}
          onChange={(event) => answerFieldChangeHandler(event, "b")}
        />
        <EditableAnswerChoice
          choiceLetter={props.answerChoices[2].choiceLetter}
          text={props.answerChoices[2].choiceText}
          isEditing={props.isEditing}
          isCorrect={props.answerChoices[2].correct}
          changeCorrectAnswer={() => answerCorrectChangeHandler("c")}
          onChange={(event) => answerFieldChangeHandler(event, "c")}
        />
        <EditableAnswerChoice
          choiceLetter={props.answerChoices[3].choiceLetter}
          text={props.answerChoices[3].choiceText}
          isEditing={props.isEditing}
          isCorrect={props.answerChoices[3].correct}
          changeCorrectAnswer={() => answerCorrectChangeHandler("d")}
          onChange={(event) => answerFieldChangeHandler(event, "d")}
        />
      </ul>
    </article>
  );
};

export default EditableQuestion;
