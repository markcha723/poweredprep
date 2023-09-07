import React, { useContext } from "react";
import classes from "./DifficultyAdjuster.module.css";
import EditorContext from "../../../../store/editor-context";

const DifficultyAdjuster = (props) => {
  const { state, dispatch } = useContext(EditorContext);
  const { difficulty: checkedDifficulty, approved } = state.activeQuestion;

  const clickEasyHandler = () => {
    dispatch({ type: "DIFFICULTY_CHANGE", payload: "easy" });
  };

  const clickMediumHandler = () => {
    dispatch({ type: "DIFFICULTY_CHANGE", payload: "medium" });
  };

  const clickHardHandler = () => {
    dispatch({ type: "DIFFICULTY_CHANGE", payload: "hard" });
  };

  return (
    <div className={`${classes.main} ${!approved ? classes.disabled : ""}`}>
      <span>difficulty:</span>
      <div className={classes.container}>
        <input
          type="radio"
          id="easy"
          name="difficulty"
          checked={checkedDifficulty === "easy"}
          onChange={clickEasyHandler}
          onClick={clickEasyHandler}
        />
        <label htmlFor="easy">easy</label>

        <input
          type="radio"
          id="medium"
          name="difficulty"
          checked={checkedDifficulty === "medium"}
          onChange={clickMediumHandler}
          onClick={clickMediumHandler}
        />
        <label htmlFor="medium">medium</label>

        <input
          type="radio"
          id="hard"
          name="difficulty"
          checked={checkedDifficulty === "hard"}
          onChange={clickHardHandler}
          onClick={clickHardHandler}
        />
        <label htmlFor="hard">hard</label>
      </div>
    </div>
  );
};

export default DifficultyAdjuster;
