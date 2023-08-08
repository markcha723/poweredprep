import React from "react";
import classes from "./QuestionNavigator.module.css";

const QuestionNavigator = (props) => {
  const generateButtons = () => {
    let buttonArray = [];

    for (let i = 0; i < props.questionNumber; i++) {
      const button = (
        <button
          className={`${classes.button} ${
            i === props.activeIndex ? classes.active : ""
          }`}
          onClick={() => props.setActiveIndex(i)}
          key={`buttonForQuestionNumber${i}`}
        >
          {i + 1}
        </button>
      );

      buttonArray.push(button);
    }

    return buttonArray;
  };

  return (
    <nav role="navigation" className={classes.navigation}>
      {generateButtons()}
    </nav>
  );
};

export default QuestionNavigator;
