import React, { useContext, useEffect, useCallback, useReducer } from "react";
import { useNavigate } from "react-router-dom";

import QuestionNavigator from "../../UI/Editor/QuestionNavigator/QuestionNavigator";
import PrevNextNavigator from "../../UI/Editor/PrevNextNavigator/PrevNextNavigator";
import EditableQuestion from "../../UI/Editor/EditableQuestion/EditableQuestion";
import Approver from "../../UI/Editor/Approver/Approver";
import DifficultyAdjuster from "../../UI/Editor/DifficultyAdjuster/DifficultyAdjuster";
import TopicSelector from "../../UI/Editor/TopicSelector/TopicSelector";
import StyleSelector from "../../UI/Editor/StyleSelector/StyleSelector";
import Button from "../../UI/Button/Button";
import LoadingScreen from "../../UI/LoadingScreen/LoadingScreen";
import SuccessScreen from "../../UI/SuccessScreen/SuccessScreen";

import editorReducer from "./editor-reducer";

import ConfigContext from "../../../store/config-context";
import EditorContext from "../../../store/editor-context";

import classes from "./Editor.module.css";

const Editor = (props) => {
  const { configs } = useContext(ConfigContext);
  const navigate = useNavigate();
  if (configs.section === null) {
    throw {
      message: "You cannot access this page directly.",
      sendTo: "/main/create",
      destinationText: "create",
      status: 400,
    };
  }

  const [state, dispatch] = useReducer(editorReducer, {
    questions: [],
    activeQuestion: {},
    questionErrors: [],
    activeIndex: 0,
    isLoading: true,
    isSending: false,
    error: {
      exists: false,
      message: null,
    },
    isEditing: false,
    isSuccessfullySaved: null,
  });
  const {
    questions,
    activeQuestion,
    questionErrors,
    activeIndex,
    error,
    isSending,
    isLoading,
    isEditing,
    isSuccessfullySaved,
  } = state;
  const allQuestionsValid = !questionErrors.some((error, index) => {
    return error.exists && questions[index].approved;
  });

  const fetchQuestions = useCallback(async () => {
    console.log("fetching questions...");
    try {
      const response = await fetch("/questions");
      // const settings = {
      //   method: "POST",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ ...configs, requestType: "CREATE" }),
      // };
      // const response = await fetch("/requests/", settings);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      const adjustedData = data.map((item) => {
        return {
          ...item,
          approved: true,
        };
      });

      dispatch({ type: "FETCH_SUCCESS", payload: adjustedData });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  }, []);

  const submitHandler = async () => {
    if (isEditing) {
      console.log("You are currently editing. Close the editing option first.");
      return;
    }
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(questions),
    };

    try {
      const response = await fetch("/questions/create", settings);
      if (!response.ok) {
        throw new Error(
          "Failed to upload questions to the database. Contact admin."
        );
      }
      if (response.ok) {
        navigate("success");
      }
    } catch (error) {
      //temporary. needs to be re-evaluated to properly communicate error to user later.
      console.log(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  if (isLoading || error.exists) {
    return (
      <LoadingScreen
        error={error}
        isLoading={isLoading}
        retryFunction={fetchQuestions}
        dispatch={dispatch}
      />
    );
  }

  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      <main className={classes.editor}>
        <div
          className={`${classes.misc} ${
            isEditing || isLoading ? classes["disable-controls"] : ""
          }`}
        >
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
            isEditing={isEditing}
          />
          <Button
            option="save"
            size="large"
            color="pink"
            onClick={submitHandler}
            disabled={isEditing || !allQuestionsValid}
            isWaiting={isSending}
            title={
              allQuestionsValid
                ? "Click to submit."
                : "Make sure to fill all the questions' fields out, or disapprove of the ones that don't work."
            }
            endPosition
          />
        </div>
        <EditableQuestion />
        <div className={`${classes["editing-tools"]}`}>
          <Approver />
          <Button
            color={!activeQuestion.approved ? "grey" : "pink"}
            size="medium"
            onClick={
              isEditing
                ? () => {
                    dispatch({
                      type: "EDIT_CLOSE",
                    });
                  }
                : () => {
                    dispatch({
                      type: "EDIT_OPEN",
                    });
                  }
            }
            option="edit"
            disabled={!activeQuestion.approved || isSending ? true : false}
            title={
              !isEditing ? "Click to start editing." : "Click to stop editing."
            }
          />
          <DifficultyAdjuster />
          <TopicSelector />
          <StyleSelector />
        </div>
      </main>
    </EditorContext.Provider>
  );
};

export default Editor;
