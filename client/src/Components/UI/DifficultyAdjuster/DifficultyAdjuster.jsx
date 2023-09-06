import React from "react";
import classes from "./DifficultyAdjuster.module.css";

const DifficultyAdjuster = (props) => {
  return (
    <div
      className={`${classes.main} ${props.disabled ? classes.disabled : ""}`}
    >
      <span>difficulty:</span>
      <div className={classes.container}>
        <input
          type="radio"
          id="easy"
          name="difficulty"
          checked={props.checkedDifficulty === "easy"}
          onChange={() =>
            props.dispatch({ type: "DIFFICULTY_CHANGE", payload: "easy" })
          }
          onClick={() =>
            props.dispatch({ type: "DIFFICULTY_CHANGE", payload: "easy" })
          }
        />
        <label htmlFor="easy">easy</label>

        <input
          type="radio"
          id="medium"
          name="difficulty"
          checked={props.checkedDifficulty === "medium"}
          onChange={() =>
            props.dispatch({ type: "DIFFICULTY_CHANGE", payload: "medium" })
          }
          onClick={() =>
            props.dispatch({ type: "DIFFICULTY_CHANGE", payload: "medium" })
          }
        />
        <label htmlFor="medium">medium</label>

        <input
          type="radio"
          id="hard"
          name="difficulty"
          checked={props.checkedDifficulty === "hard"}
          onChange={() =>
            props.dispatch({ type: "DIFFICULTY_CHANGE", payload: "hard" })
          }
          onClick={() =>
            props.dispatch({ type: "DIFFICULTY_CHANGE", payload: "hard" })
          }
        />
        <label htmlFor="hard">hard</label>
      </div>
    </div>
  );
};

export default DifficultyAdjuster;
