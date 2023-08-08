import React from "react";
import classes from "./DifficultyAdjuster.module.css";

const DifficultyAdjuster = (props) => {
  return (
    <div className={classes.main}>
      <span>difficulty:</span>
      <div className={classes.container}>
        <input type="radio" id="easy" name="difficulty" />
        <label htmlFor="easy">easy</label>

        <input type="radio" id="medium" name="difficulty" />
        <label htmlFor="medium">medium</label>

        <input type="radio" id="hard" name="difficulty" />
        <label htmlFor="hard">hard</label>
      </div>
    </div>
  );
};

export default DifficultyAdjuster;
