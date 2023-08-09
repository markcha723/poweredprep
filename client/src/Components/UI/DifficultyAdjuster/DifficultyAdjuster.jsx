import React from "react";
import classes from "./DifficultyAdjuster.module.css";

const DifficultyAdjuster = (props) => {
  return (
    <div className={classes.main}>
      <span>difficulty:</span>
      <div className={classes.container}>
        <input
          type="radio"
          id="easy"
          name="difficulty"
          checked={props.checkedDifficulty === "easy"}
          onChange={() => props.updateQuestionDifficulty("easy")}
        />
        <label htmlFor="easy">easy</label>

        <input
          type="radio"
          id="medium"
          name="difficulty"
          checked={props.checkedDifficulty === "medium"}
          onChange={() => props.updateQuestionDifficulty("medium")}
        />
        <label htmlFor="medium">medium</label>

        <input
          type="radio"
          id="hard"
          name="difficulty"
          checked={props.checkedDifficulty === "hard"}
          onChange={() => props.updateQuestionDifficulty("hard")}
        />
        <label htmlFor="hard">hard</label>
      </div>
    </div>
  );
};

export default DifficultyAdjuster;
