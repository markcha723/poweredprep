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
      {
        word: "censor",
        meanings: [
          {
            partOfSpeech: "noun",
            definitions: [{ definition: "A person who conceals information" }],
          },
          {
            partOfSpeech: "verb",
            definitions: [
              { definition: "To conceal information" },
              { definition: "To remove information" },
            ],
          },
        ],
      },
      {
        word: "lol",
        meanings: [
          {
            partOfSpeech: "noun",
            definitions: [
              { definition: "An internet acronym meaning 'laugh out loud'." },
            ],
          },
        ],
      },
    ],
    tooltipIsActive: false,
    tooltipXLoc: 0,
    tooltipYLoc: 0,
    highlightedWord: "",
    wordSearchError: "",
  });
  const {
    questions,
    activeIndex,
    tooltipIsActive,
    tooltipXLoc,
    tooltipYLoc,
    lookedUpWords,
    highlightedWord,
  } = state;

  /* 
    whenever a user selects a portion of text, this function
    evaluates it and dispatches an action to study-reducer
    that tells it to generate a tooltip over the location.

    currently the location is NOT perfectly centered.
  */
  const selectHandler = (event) => {
    const selection = window.getSelection();
    const selectedText = window.getSelection().toString().toLowerCase();
    console.log(selectedText);
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

  return (
    <StudyContext.Provider value={{ state, dispatch }}>
      <div className={classes.main}>
        <TextSelectionTooltip
          selectedWord={highlightedWord}
          active={tooltipIsActive}
          xLocation={tooltipXLoc}
          yLocation={tooltipYLoc}
          dispatch={dispatch}
          lookedUpWords={lookedUpWords}
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
