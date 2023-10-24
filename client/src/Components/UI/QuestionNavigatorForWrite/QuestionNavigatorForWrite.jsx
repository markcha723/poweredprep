import React from "react";
import Button from "../Button/Button";

import classes from "../Editor/QuestionNavigator/QuestionNavigator.module.css";

const QuestionNavigatorForWrite = (props) => {
  const {
    chosenAnswers,
    maxIndex,
    activeIndex,
    dispatch,
    correctAnswers,
    questionErrors,
    allQuestionsValid,
  } = props;

  const addQuestionHandler = () => {
    console.log("test");
    if (allQuestionsValid) {
      dispatch({ type: "ADD_QUESTION" });
    } else {
      dispatch({
        type: "OPEN_DIALOG",
        payload: {
          type: "warning",
          message:
            "You cannot add new questions until you fill out all fields in the current ones!",
        },
      });
    }
  };

  let generateButtons = () => {
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
    return [
      ...buttonArray,
      <button
        className={`${classes.button} ${classes["add-button"]}`}
        onClick={addQuestionHandler}
        key={"buttonForAddingAnotherQuestion"}
      >
        +
      </button>,
    ];
  };

  return (
    <nav role="navigation" className={classes.navigation}>
      {generateButtons()}
    </nav>
  );
};

export default QuestionNavigatorForWrite;
