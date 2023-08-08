import React from "react";
import classes from "./EditableAnswerChoice.module.css";

const EditableAnswerChoice = (props) => {
  return (
    <li className={classes.container}>
      <input
        type="radio"
        name="answers"
        disabled={!props.isEditing}
        checked={props.isCorrect}
        onChange={props.answerCorrectChangeHandler}
      />
      <label className={classes.choice}>
        <span>{`${props.choiceLetter})`}</span>
        <textarea
          className={classes["answer-text"]}
          readOnly={!props.isEditing}
          value={props.text}
        ></textarea>
      </label>
    </li>
  );
};

export default EditableAnswerChoice;
