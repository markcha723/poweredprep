import React, { useState, useContext } from "react";
import EditableAnswerChoice from "./EditableAnswerChoice";
import classes from "./EditableQuestion.module.css";
import EditorContext from "../../../../store/editor-context";

const EditableQuestion = (props) => {
  const { state, dispatch } = useContext(EditorContext);
  const { activeQuestion, isEditing } = state;
  const {
    answerChoices,
    question: prompt,
    body: questionBody,
  } = activeQuestion;

  return (
    <article
      className={`${classes["question-and-answer"]} ${
        props.disabled ? classes.disabled : ""
      }`}
    >
      <textarea
        type="text"
        className={`${classes["question-body"]} ${
          isEditing ? classes.editable : ""
        }`}
        readOnly={!isEditing}
        value={questionBody}
        onChange={(event) =>
          dispatch({
            type: "QUESTION_BODY_CHANGE",
            payload: event.target.value,
          })
        }
      />
      <textarea
        type="text"
        className={`${classes.prompt} ${isEditing ? classes.editable : ""}`}
        readOnly={!isEditing}
        value={prompt}
        onChange={(event) =>
          dispatch({ type: "PROMPT_CHANGE", payload: event.target.value })
        }
      />
      <ul className={classes["answer-choices"]}>
        <EditableAnswerChoice
          choiceLetter={answerChoices[0].choiceLetter}
          text={answerChoices[0].choiceText}
          isEditing={isEditing}
          isCorrect={answerChoices[0].correct}
        />
        <EditableAnswerChoice
          choiceLetter={answerChoices[1].choiceLetter}
          text={answerChoices[1].choiceText}
          isEditing={isEditing}
          isCorrect={answerChoices[1].correct}
        />
        <EditableAnswerChoice
          choiceLetter={answerChoices[2].choiceLetter}
          text={answerChoices[2].choiceText}
          isEditing={isEditing}
          isCorrect={answerChoices[2].correct}
        />
        <EditableAnswerChoice
          choiceLetter={answerChoices[3].choiceLetter}
          text={answerChoices[3].choiceText}
          isEditing={isEditing}
          isCorrect={answerChoices[3].correct}
        />
      </ul>
    </article>
  );
};

export default EditableQuestion;
