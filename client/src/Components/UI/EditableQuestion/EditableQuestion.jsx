import React, { useState } from "react";
import EditableAnswerChoice from "./EditableAnswerChoice";
import classes from "./EditableQuestion.module.css";

const EditableQuestion = (props) => {
  const DUMMY_DATA = {
    questionBody:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    prompt: "Lorem ipsum, is pum morel?",
    answerChoices: [
      {
        choiceLetter: "a",
        choiceText: "Lorem ipsum!",
        correct: false,
      },
      {
        choiceLetter: "b",
        choiceText:
          "Despitore elementario... what a wonderful world this is, truly beautiful.",
        correct: true,
      },
      {
        choiceLetter: "c",
        choiceText: "LololoLol what?",
        correct: false,
      },
      {
        choiceLetter: "d",
        choiceText:
          "Wow, that's Latin. So cool! Do you have a podcast I can tune into?",
        correct: false,
      },
    ],
  };

  const [questionBody, setQuestionBody] = useState(DUMMY_DATA.questionBody);
  const [prompt, setPrompt] = useState(DUMMY_DATA.prompt);
  const [answerA, setAnswerA] = useState(DUMMY_DATA.answerChoices[0]);
  const [answerB, setAnswerB] = useState(DUMMY_DATA.answerChoices[1]);
  const [answerC, setAnswerC] = useState(DUMMY_DATA.answerChoices[2]);
  const [answerD, setAnswerD] = useState(DUMMY_DATA.answerChoices[3]);

  const questionBodyChangeHandler = (event) => {
    setQuestionBody(event.target.value);
  };

  const promptChangeHandler = (event) => {
    setPrompt(event.target.value);
  };

  const answerCorrectChangeHandler = (event) => {
    console.log(click);
  };

  return (
    <article className={classes["question-and-answer"]}>
      <textarea
        type="text"
        className={`${classes["question-body"]} ${
          props.isEditing ? classes.editable : ""
        }`}
        readOnly={!props.isEditing}
        value={questionBody}
        onChange={questionBodyChangeHandler}
      />
      <textarea
        type="text"
        className={`${classes.prompt} ${
          props.isEditing ? classes.editable : ""
        }`}
        readOnly={!props.isEditing}
        value={prompt}
        onChange={promptChangeHandler}
      />
      <ul className={classes["answer-choices"]}>
        <EditableAnswerChoice
          choiceLetter={answerA.choiceLetter}
          text={answerA.choiceText}
          isEditing={props.isEditing}
          isCorrect={answerA.correct}
          answerCorrectChangeHandler={answerCorrectChangeHandler}
        />
        <EditableAnswerChoice
          choiceLetter={answerB.choiceLetter}
          text={answerB.choiceText}
          isEditing={props.isEditing}
          isCorrect={answerB.correct}
          answerCorrectChangeHandler={answerCorrectChangeHandler}
        />
        <EditableAnswerChoice
          choiceLetter={answerC.choiceLetter}
          text={answerC.choiceText}
          isEditing={props.isEditing}
          isCorrect={answerC.correct}
          answerCorrectChangeHandler={answerCorrectChangeHandler}
        />
        <EditableAnswerChoice
          choiceLetter={answerD.choiceLetter}
          text={answerD.choiceText}
          isEditing={props.isEditing}
          isCorrect={answerD.correct}
          answerCorrectChangeHandler={answerCorrectChangeHandler}
        />
      </ul>
    </article>
  );
};

export default EditableQuestion;
