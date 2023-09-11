import React, { useContext } from "react";
import classes from "./QuestionNavigator.module.css";
import EditorContext from "../../../../store/editor-context";

const QuestionNavigator = (props) => {
  const { state, dispatch } = useContext(EditorContext);
  const { activeIndex, questions, questionErrors, isLoading } = state;
  const questionNumber = questions.length;

  const generateButtons = () => {
    let buttonArray = [];

    for (let i = 0; i < questionNumber; i++) {
      const button = (
        <button
          className={`${classes.button} ${
            i === activeIndex ? classes.active : ""
          } ${questionErrors[i].exists ? classes["error-highlight"] : ""}`}
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

  return (
    <nav role="navigation" className={classes.navigation}>
      {generateButtons()}
    </nav>
  );
};

export default QuestionNavigator;
