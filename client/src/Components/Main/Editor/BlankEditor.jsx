import React, { useContext, useEffect, useCallback, useReducer } from "react";

import QuestionNavigator from "../../UI/Editor/QuestionNavigator/QuestionNavigator";
import PrevNextNavigator from "../../UI/Editor/PrevNextNavigator/PrevNextNavigator";
import EditableQuestion from "../../UI/Editor/EditableQuestion/EditableQuestion";
import DifficultyAdjuster from "../../UI/Editor/DifficultyAdjuster/DifficultyAdjuster";
import TopicSelector from "../../UI/Editor/TopicSelector/TopicSelector";
import StyleSelector from "../../UI/Editor/StyleSelector/StyleSelector";
import Button from "../../UI/Button/Button";
import SuccessScreen from "../../UI/SuccessScreen/SuccessScreen";
import Dialog from "../../UI/Dialog/Dialog";

import editorReducer from "./editor-reducer";
import EditorContext from "../../../store/editor-context";
import { styleOptions } from "../../../hooks/use-config-validator";
import { topicOptions } from "../../../hooks/use-config-validator";
import { evaluateAllQuestionsForErrors } from "./editor-reducer";

import classes from "./Editor.module.css";

export const blankQuestion = {
  body: "placeholder",
  question: "placeholder",
  answerChoices: [
    {
      choiceLetter: "a",
      choiceText: "a",
      correct: false,
    },
    {
      choiceLetter: "b",
      choiceText: "b",
      correct: false,
    },
    {
      choiceLetter: "c",
      choiceText: "c",
      correct: false,
    },
    {
      choiceLetter: "d",
      choiceText: "d",
      correct: false,
    },
  ],
  section: "reading",
  difficulty: "easy",
  subject: topicOptions[0],
  style: styleOptions[0],
  approved: true,
};

const BlankEditor = (props) => {
  const [state, dispatch] = useReducer(editorReducer, {
    questions: [blankQuestion],
    activeQuestion: blankQuestion,
    questionErrors: evaluateAllQuestionsForErrors([blankQuestion]),
    activeIndex: 0,
    isSending: false,
    error: {
      exists: false,
      message: null,
    },
    isDialogOpen: false,
    isEditing: true,
  });

  const {
    questions,
    activeQuestion,
    questionErrors,
    activeIndex,
    isSending,
    error,
    isDialogOpen,
    approved,
  } = state;

  const allQuestionsValid = !questionErrors.some((error, index) => {
    return error.exists;
  });

  const submitHandler = useCallback(async () => {
    console.log("submitting questions...");
    try {
      const settings = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...questions, creationType: "written" }),
      };

      const response = await fetch("/questions", settings);
      if (!response.ok) {
        throw new Error("Unable to POST.", {
          cause: { code: response.status },
        });
      }
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  });

  const deleteHandler = () => {
    if (questions.length === 1) {
      console.log("You can't delete this!");
    } else {
      dispatch({ type: "DELETE", payload: activeIndex });
    }
  };

  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      {isDialogOpen && (
        <Dialog
          type="warning"
          message="placeholder"
          onDialogClose={() => dispatch({ type: "DIALOG_CLOSE" })}
          onProceedAnyways={() => dispatch({ type: "FETCH_ANSWERS_SUCCESS" })}
        />
      )}
      <main className={classes.editor}>
        <div className={classes.misc}>
          <span className={classes["page-title"]}>editor</span>
          <QuestionNavigator
            maxIndex={questions.length - 1}
            activeIndex={activeIndex}
            dispatch={dispatch}
            questionErrors={questionErrors}
          />
          <PrevNextNavigator
            maxIndex={questions.length - 1}
            activeIndex={activeIndex}
            dispatch={dispatch}
          />
          <Button
            option="save"
            size="large"
            color="pink"
            onClick={submitHandler}
            disabled={!allQuestionsValid}
            title={
              allQuestionsValid
                ? "Click to submit."
                : "Make sure to fill all the questions' fields out, or disapprove of the ones that don't work."
            }
            endPosition
          />
        </div>
        <EditableQuestion />
        <div className={`${classes["editing-tools"]} ${classes.gap}`}>
          <DifficultyAdjuster />
          <TopicSelector />
          <StyleSelector />
          <Button
            color="grey"
            option="delete"
            size="large"
            endPosition
            disabled={questions.length === 1}
            onClick={deleteHandler}
          />
        </div>
      </main>
    </EditorContext.Provider>
  );
};

export default BlankEditor;
