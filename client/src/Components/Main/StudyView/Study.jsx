import React, { useReducer, useState } from "react";
import studyReducer from "./study-reducer";
import StudyContext from "../../../store/study-context";
import Question from "../../UI/Question/Question";
import TextSelectionTooltip from "../../UI/TextSelectionTooltip/TextSelectionTooltip";
import PrevNextNavigator from "../../UI/Editor/PrevNextNavigator/PrevNextNavigator";
import QuestionNavigator from "../../UI/Editor/QuestionNavigator/QuestionNavigator";
import WordBank from "../../UI/WordBank/WordBank";
import Button from "../../UI/Button/Button";
import classes from "./Study.module.css";
import Dialog from "../../UI/Dialog/Dialog";
import { useLocation } from "react-router-dom";

const Study = (props) => {
  const location = useLocation();
  const [state, dispatch] = useReducer(studyReducer, {
    questions: props.questionSet,
    activeQuestion: props.questionSet[0],
    chosenAnswers: props.questionSet.map((item) => null),
    activeIndex: 0,
    lookedUpWords: props.questionSet.map((question) => []),
    tooltipIsActive: false,
    tooltipXLoc: 0,
    tooltipYLoc: 0,
    highlightedWord: "",
    wordSearchError: "",
    isGrading: false,
    isReviewing: false,
    isEveryQuestionAnswered: false,
    isDialogOpen: false,
    wasError: false,
  });
  const {
    questions,
    activeIndex,
    tooltipIsActive,
    tooltipXLoc,
    tooltipYLoc,
    lookedUpWords,
    highlightedWord,
    isGrading,
    isReviewing,
    isDialogOpen,
    wasError,
  } = state;

  /* 
    whenever a user selects a portion of text, this function
    evaluates it and dispatches an action to study-reducer
    that tells it to generate a tooltip over the location.

    currently the location is NOT perfectly centered.
  */
  const selectHandler = (event) => {
    const selection = window.getSelection();
    const selectedText = window.getSelection().toString().toLowerCase().trim();
    if (selectedText.includes(" ") || selectedText.length < 3) {
      dispatch({ type: "UNHIGHLIGHT" });
    } else {
      const boundingRect = selection.getRangeAt(0).getBoundingClientRect();
      const paddingLeftString = window
        .getComputedStyle(event.target)
        .getPropertyValue("padding-left");
      const paddingLeftInteger = parseInt(
        paddingLeftString.substring(0, paddingLeftString.length - 2)
      );
      dispatch({
        type: "HIGHLIGHT_WORD",
        xLoc: boundingRect.left + boundingRect.width / 2 - paddingLeftInteger,
        yLoc: boundingRect.top - boundingRect.height - 6,
        highlightedWord: selectedText,
      });
    }
  };

  const submitHandler = () => {
    if (!isGrading && !isReviewing && isEveryQuestionAnswered) {
      console.log("not every question is answered. button does not fire.");
    }
  };

  let titleText;
  if (isReviewing) {
    titleText = "review";
  } else if (location === "/sample") {
    titleText = "sample question";
  } else {
    titleText = "questions";
  }

  return (
    <StudyContext.Provider value={{ state, dispatch }}>
      <TextSelectionTooltip
        selectedWord={highlightedWord}
        active={tooltipIsActive}
        xLocation={tooltipXLoc}
        yLocation={tooltipYLoc}
        dispatch={dispatch}
        lookedUpWords={lookedUpWords}
      />
      <div
        className={classes.main}
        onMouseDown={() => {
          dispatch({ type: "UNHIGHLIGHT" });
        }}
      >
        <div className={classes["nav-tools"]}>
          <span>{titleText}</span>
          <QuestionNavigator
            maxIndex={questions.length - 1}
            activeIndex={activeIndex}
            dispatch={dispatch}
          />
          <PrevNextNavigator
            maxIndex={questions.length - 1}
            activeIndex={activeIndex}
            dispatch={dispatch}
          />
          <Button
            option="submit"
            size="large"
            color="pink"
            onClick={submitHandler}
            disabled={false}
            endPosition
          />
        </div>
        <Question onWordHighlight={selectHandler} />
        <WordBank />
      </div>
    </StudyContext.Provider>
  );
};

export default Study;
