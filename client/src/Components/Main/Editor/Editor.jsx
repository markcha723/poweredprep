import React, {
  useContext,
  useEffect,
  useCallback,
  useReducer,
  useState,
} from "react";

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

const LoadingScreen = (props) => {
  const { isLoading, error, dispatch } = props;

  let content = <p>this should not be visible.</p>;

  const testFunction = () => {
    dispatch({ type: "LOADING_ON" });
    props.retryFunction();
  };

  if (error.exists) {
    let messageContent = (
      <React.Fragment>
        <p>something went wrong.</p>
        <p>please choose one:</p>
      </React.Fragment>
    );

    if (isLoading) {
      messageContent = (
        <React.Fragment>
          <LoadingSpinner size="large" />
          <p>retrying...</p>
        </React.Fragment>
      );
    }

    content = (
      <React.Fragment>
        {messageContent}
        <div className={classes["error-options"]}>
          <Button
            size="medium"
            color="grey"
            option="go back"
            onClick={() => console.log("clicked go back")}
            disabled={isLoading}
          />
          <Button
            size="medium"
            color="pink"
            option="retry"
            onClick={testFunction}
            disabled={isLoading}
          />
        </div>
      </React.Fragment>
    );
  } else {
    content = (
      <React.Fragment>
        <LoadingSpinner size="large" />
        <p>generating...</p>
        <p>please wait warmly.</p>
      </React.Fragment>
    );
  }

  return <div className={classes["loading-screen"]}>{content}</div>;
};

const SuccessScreen = (props) => {
  const { isSuccessfullySaved } = props;
};

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
    isSuccessfullySaved: null,
  });
  const {
    questions,
    activeQuestion,
    activeIndex,
    error,
    isSending,
    isLoading,
    isEditing,
    isSuccessfullySaved,
  } = state;

  const fetchQuestions = useCallback(async () => {
    console.log("fetching questions...");
    try {
      const settings = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...configs, requestType: "CREATE" }),
      };
      const response = await fetch("/requests/", settings);
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
    } catch (error) {}
  };

  console.log(state);

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

  if (isSuccessfullySaved) {
    return <SuccessScreen />;
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
