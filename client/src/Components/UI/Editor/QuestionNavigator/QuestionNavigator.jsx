import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import classes from "./QuestionNavigator.module.css";
import EditorContext from "../../../../store/editor-context";

const QuestionNavigator = (props) => {
  const {
    chosenAnswers,
    maxIndex,
    activeIndex,
    dispatch,
    correctAnswers,
    questionErrors,
  } = props;

  // current implementations are somewhat inflexible, though they work.
  // changes will likely be made later as design decisions become more narrow.
  // in all elements of the application, it would be wise to separate out arrays
  // for correct answers and incorrect answers.
  let errorDisplayType;
  let errorDisplayFunction;
  if (questionErrors) {
    errorDisplayType = "object";
    errorDisplayFunction = (errorObject) => {
      if (errorObject.exists) {
        return classes["error-highlight"];
      } else {
        return "";
      }
    };
  } else {
    errorDisplayType = "string";
    errorDisplayFunction = (currentChosenAnswer, currentCorrectAnswer) => {
      if (currentChosenAnswer !== currentCorrectAnswer) {
        return classes["error-highlight"];
      } else {
        return "";
      }
    };
  }

  // this section is probably a candidate for memoization.
  let generateButtons = () => {};
  if (props.questionErrors || correctAnswers) {
    generateButtons = () => {
      let buttonArray = [];
      for (let i = 0; i <= maxIndex; i++) {
        const button = (
          <button
            className={`${classes.button} ${
              i === activeIndex ? classes.active : ""
            } ${
              errorDisplayType === "object"
                ? errorDisplayFunction(questionErrors[i])
                : errorDisplayFunction(chosenAnswers[i], correctAnswers[i])
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
