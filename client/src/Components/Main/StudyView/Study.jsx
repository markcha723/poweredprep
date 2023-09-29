import React, { useReducer, useEffect } from "react";
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
import SuccessScreen from "../../UI/SuccessScreen/SuccessScreen";
import { useLocation, useNavigate } from "react-router-dom";

const Study = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(studyReducer, {
    questions: props.questionSet,
    activeQuestion: props.questionSet[0],
    chosenAnswers: props.questionSet.map((item) => null),
    // this is null bc its expected to come AFTER submission.
    correctAnswers: props.questionSet.map((item) => null),
    activeIndex: 0,
    lookedUpWords: props.questionSet.map((question) => []),
    tooltipIsActive: false,
    tooltipXLoc: 0,
    tooltipYLoc: 0,
    highlightedWord: "",
    wordSearchError: "",
    isLoading: true,
    isGrading: false,
    isReviewing: false,
    isEveryQuestionAnswered: false,
    isDialogOpen: false,
    isFinished: false,
    wasError: false,
  });
  const {
    questions,
    activeQuestion,
    activeIndex,
    tooltipIsActive,
    tooltipXLoc,
    tooltipYLoc,
    lookedUpWords,
    highlightedWord,
    isLoading,
    isGrading,
    isReviewing,
    isDialogOpen,
    isEveryQuestionAnswered,
    correctAnswers,
    chosenAnswers,
    wasError,
    isFinished,
  } = state;

  // this part is to-be-developed. as an accessibility issue.
  // const keyDownHandler = (event) => {
  //   console.log(event.code);
  //   switch (event.code) {
  //     case "ArrowLeft": {
  //       if (activeIndex - 1 < 0) {
  //         console.log("ArrowLeft can't go back further.");
  //       } else {
  //         console.log("Dispatching INDEX_CHANGE for ArrowLeft.");
  //         dispatch({ type: "INDEX_CHANGE", index: activeIndex - 1 });
  //       }
  //       break;
  //     }
  //     case "ArrowRight": {
  //       if (activeIndex + 1 >= questions.length) {
  //         console.log("ArrowRight can't go back further.");
  //       } else {
  //         console.log("Dispatching INDEX_CHANGE for ArrowRight.");
  //         dispatch({ type: "INDEX_CHANGE", index: activeIndex + 1 });
  //       }
  //       break;
  //     }
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("keydown", keyDownHandler);
  //   return () => {
  //     window.removeEventListener("keydown", keyDownHandler);
  //   };
  // }, []);

  // temporary function here to delay loading.
  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "LOADING_FINISH" });
    }, 2000);
  }, []);

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
    if (!isReviewing && !isEveryQuestionAnswered) {
      console.log("not every question is answered. dialog should appear.");
      dispatch({ type: "DIALOG_OPEN" });
    } else if (isEveryQuestionAnswered) {
      dispatch({ type: "FETCH_ANSWERS_SUCCESS" });
    } else if (isReviewing) {
      console.log("finished with review. redirecting.");
      dispatch({ type: "FINISH_REVIEW" });
    }
  };

  let titleText;
  if (isReviewing) {
    let numberCorrect = 0;
    let totalNumberOfQuestions = chosenAnswers.length;
    for (let i = 0; i < chosenAnswers.length; i++) {
      if (chosenAnswers[i] === correctAnswers[i]) {
        numberCorrect++;
      } else {
        continue;
      }
    }
    titleText = `review: ${numberCorrect} / ${totalNumberOfQuestions} correct`;
  } else if (location === "/sample") {
    titleText = "sample question";
  } else {
    titleText = "questions";
  }

  console.log(correctAnswers);

  if (isFinished) {
    return <SuccessScreen />;
  }

  return (
    <StudyContext.Provider value={{ state, dispatch }}>
      {isDialogOpen && (
        <Dialog
          type="warning"
          message={
            !isEveryQuestionAnswered
              ? "You haven't answered every question. There is no penalty for guessing on the actual exam."
              : "You should never see this."
          }
          onDialogClose={() => dispatch({ type: "DIALOG_CLOSE" })}
          onProceedAnyways={() => dispatch({ type: "FETCH_ANSWERS_SUCCESS" })}
        ></Dialog>
      )}
      {isLoading && (
        <Dialog type="loading" message="fetching questions..."></Dialog>
      )}
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
            correctAnswers={isReviewing ? correctAnswers : undefined}
            chosenAnswers={chosenAnswers}
          />
          <PrevNextNavigator
            maxIndex={questions.length - 1}
            activeIndex={activeIndex}
            dispatch={dispatch}
          />
          <Button
            option={!isReviewing ? "submit" : "finish"}
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
