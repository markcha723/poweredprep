import React, { useContext, useEffect, useCallback, useReducer } from "react";

import ConfigContext from "../../../store/config-context";

import QuestionNavigator from "../../UI/QuestionNavigator/QuestionNavigator";
import PrevNextNavigator from "../../UI/PrevNextNavigator/PrevNextNavigator";
import EditableQuestion from "../../UI/EditableQuestion/EditableQuestion";
import Approver from "../../UI/Approver/Approver";
import DifficultyAdjuster from "../../UI/DifficultyAdjuster/DifficultyAdjuster";
import Button from "../../UI/Button/Button";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";
import editorReducer from "./editor-reducer";
import EditorContext from "../../../store/editor-context";

import classes from "./Editor.module.css";

/* 
  bugs

  1. currently, when "edit" is open, 
  the user can set approval to false, which locks up navigation because
  navigation closes when editing is open. 
  adjust approval state logic? perhaps disable Approver when editing?
*/

const Editor = (props) => {
  const { configs } = useContext(ConfigContext);
  const [state, dispatch] = useReducer(editorReducer, {
    questions: [],
    activeQuestion: {},
    activeIndex: 0,
    isLoading: true,
    isSending: false,
    error: {
      exists: false,
      message: null,
    },
    isEditing: false,
  });
  const {
    questions,
    activeQuestion,
    activeIndex,
    error,
    isSending,
    isLoading,
    isEditing,
  } = state;

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

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const submitHandler = async () => {
    if (isEditing) {
      console.log("You are currently editing. Close the editing option first.");
      return;
    }
    setIsSending(true);
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(questions[0]),
    };

    try {
      const response = await fetch("/questions/create", settings);
      if (!response.ok) {
        throw new Error(
          "Failed to upload questions to the database. Contact admin."
        );
      }
      console.log(response.json());
    } catch (error) {
      setError(error);
    }

    setIsSending(false);
  };

  console.log(state);

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
            questionNumber={questions.length}
            activeIndex={activeIndex}
            dispatch={dispatch}
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
            disabled={isEditing}
            isWaiting={isSending}
            endPosition
          />
        </div>
        {isLoading ? (
          <LoadingSpinner optionalText="generating... this might take a while..." />
        ) : (
          <EditableQuestion />
        )}
        <div className={`${classes["editing-tools"]}`}>
          <div className={`${classes["editing-tools--inner"]}`}>
            <Approver
              dispatch={dispatch}
              approved={activeQuestion.approved}
              questions={questions}
            />
            <DifficultyAdjuster
              checkedDifficulty={activeQuestion.difficulty}
              dispatch={dispatch}
              disabled={activeQuestion.approved === false ? true : false}
            />
            <Button
              color={activeQuestion.approved === false ? "grey" : "pink"}
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
              disabled={activeQuestion.approved === false ? true : false}
            />
          </div>
        </div>
      </main>
    </EditorContext.Provider>
  );
};

export default Editor;
