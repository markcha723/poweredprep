import React from "react";
import classes from "./EditableAnswerChoice.module.css";
import EditorContext from "../../../store/config-context";

const EditableAnswerChoice = (props) => {
  return (
    <li className={classes.container}>
      <input
        type="radio"
        name="answers"
        disabled={!props.isEditing}
        checked={props.isCorrect}
        onClick={props.changeCorrectAnswer}
      />
      <label className={classes.choice}>
        <span>{`${props.choiceLetter})`}</span>
        <textarea
          className={`${classes["answer-text"]} ${
            props.isEditing ? classes.editable : ""
          }`}
          readOnly={!props.isEditing}
          onChange={props.onChange}
          value={props.text}
        ></textarea>
      </label>
    </li>
  );
};

export default EditableAnswerChoice;
