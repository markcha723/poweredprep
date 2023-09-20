import React, { useReducer, useState } from "react";
import studyReducer from "./study-reducer";
import StudyContext from "../../../store/study-context";
import Question from "../../UI/Question/Question";
import TextSelectionTooltip from "../../UI/TextSelectionTooltip/TextSelectionTooltip";
import PrevNextNavigator from "../../UI/Editor/PrevNextNavigator/PrevNextNavigator";
import QuestionNavigator from "../../UI/Editor/QuestionNavigator/QuestionNavigator";
import WordBank from "../../UI/WordBank/WordBank";
import classes from "./Study.module.css";

const Study = (props) => {
  const [state, dispatch] = useReducer(studyReducer, {
    questions: props.questionSet,
    activeQuestion: props.questionSet[0],
    activeIndex: 0,
    lookedUpWords: [
      { word: "lol", definition: "definition" },
      { word: "word2", definition: "definition2" },
    ],
    tooltipIsActive: false,
    tooltipXLoc: 0,
    tooltipYLoc: 0,
    highlightedWord: "",
  });
  const {
    questions,
    activeIndex,
    tooltipIsActive,
    tooltipXLoc,
    tooltipYLoc,
    highlightedWord,
  } = state;

  const selectHandler = (event) => {
    const selection = window.getSelection();
    const selectedText = window.getSelection().toString();
    if (selectedText.includes(" ") || selectedText.length < 3) {
      dispatch({ type: "UNHIGHLIGHT" });
    } else {
      const boundingRect = selection.getRangeAt(0).getBoundingClientRect();
      dispatch({
        type: "HIGHLIGHT_WORD",
        xLoc: boundingRect.left + boundingRect.width / 2,
        yLoc: boundingRect.top - boundingRect.height,
        highlightedWord: selectedText,
      });
    }
  };
  console.log("test");

  return (
    <StudyContext.Provider value={{ state, dispatch }}>
      <div className={classes.main}>
        <TextSelectionTooltip
          active={tooltipIsActive}
          xLocation={tooltipXLoc}
          yLocation={tooltipYLoc}
          dispatch={dispatch}
        />
        <div className={classes["nav-tools"]}>
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
        </div>
        <Question onWordHighlight={selectHandler} />
        <WordBank />
      </div>
    </StudyContext.Provider>
  );
};

export default Study;
