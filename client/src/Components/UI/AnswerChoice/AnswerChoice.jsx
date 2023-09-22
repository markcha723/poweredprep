import React, { useContext } from "react";
import classes from "./AnswerChoice.module.css";
import StudyContext from "../../../store/study-context";

const AnswerChoice = (props) => {
  const { dispatch } = useContext(StudyContext);

  return (
    <li className={classes.container} onMouseUp={props.onMouseUp || null}>
      <input
        type="radio"
        name="answers"
        id={`answer-${props.choiceLetter}`}
        checked={props.isSelected}
        onChange={() =>
          dispatch({
            type: "CHOSEN_ANSWER_CHANGE",
            choice: props.choiceLetter,
          })
        }
      />
      <label
        className={classes.choice}
        htmlFor={`answer-${props.choiceLetter}`}
      >
        <span>{props.choiceLetter})</span>
        <p className={classes["answer-text"]}>{props.text}</p>
      </label>
    </li>
  );
};

export default AnswerChoice;
