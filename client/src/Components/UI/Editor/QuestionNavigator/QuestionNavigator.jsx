import React, { useContext } from "react";
import classes from "./QuestionNavigator.module.css";
import EditorContext from "../../../../store/editor-context";

const QuestionNavigator = (props) => {
  const { maxIndex, activeIndex, dispatch } = props;

  let generateButtons = () => {};
  if (props.questionErrors) {
    generateButtons = () => {
      let buttonArray = [];
      for (let i = 0; i <= maxIndex; i++) {
        const button = (
          <button
            className={`${classes.button} ${
              i === activeIndex ? classes.active : ""
            } ${
              props.questionErrors[i].exists ? classes["error-highlight"] : ""
            }`}
            onClick={() => dispatch({ type: "INDEX_CHANGE", index: i })}
            key={`buttonForQuestionNumber${i}`}
          >
            {i + 1}
          </button>
        );
        buttonArray.push(button);
      }
      return buttonArray;
    };
  } else {
    generateButtons = () => {
      let buttonArray = [];
      for (let i = 0; i <= maxIndex; i++) {
        const button = (
          <button
            className={`${classes.button} ${
              i === activeIndex ? classes.active : ""
            }`}
            onClick={() => dispatch({ type: "INDEX_CHANGE", index: i })}
            key={`buttonForQuestionNumber${i}`}
          >
            {i + 1}
          </button>
        );
        buttonArray.push(button);
      }
      return buttonArray;
    };
  }

  return (
    <nav role="navigation" className={classes.navigation}>
      {generateButtons()}
    </nav>
  );
};

export default QuestionNavigator;
