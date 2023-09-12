import React, { useContext } from "react";
import classes from "./EditableAnswerChoice.module.css";
import EditorContext from "../../../../store/editor-context";

const EditableAnswerChoice = (props) => {
  const { state, dispatch } = useContext(EditorContext);
  const { questionErrors, activeIndex } = state;
  const { [`choice${props.choiceLetter.toUpperCase()}Text`]: choiceError } =
    questionErrors[activeIndex];

  return (
    <li className={classes.container}>
      <input
        type="radio"
        name="answers"
        disabled={!props.isEditing}
        checked={props.isCorrect}
        onChange={() =>
          dispatch({
            type: "CORRECT_ANSWER_CHANGE",
            payload: props.choiceLetter,
          })
        }
      />
      <label className={classes.choice}>
        <span>{`${props.choiceLetter})`}</span>
        <textarea
          className={`${classes["answer-text"]} ${
            props.isEditing ? classes.editable : ""
          } ${choiceError ? classes["error-highlight"] : ""}`}
          readOnly={!props.isEditing}
          onChange={(event) => {
            dispatch({
              type: "ANSWER_TEXT_CHANGE",
              payload: { letter: props.choiceLetter, text: event.target.value },
            });
          }}
          value={props.text}
          title={choiceError ? "Must be non-empty." : ""}
        ></textarea>
      </label>
    </li>
  );
};

export default EditableAnswerChoice;
