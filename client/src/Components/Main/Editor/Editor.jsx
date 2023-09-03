import React, { useContext, useEffect, useState, useCallback } from "react";
import { isEqual } from "lodash";

import ConfigContext from "../../../store/config-context";

import QuestionNavigator from "../../UI/QuestionNavigator/QuestionNavigator";
import PrevNextNavigator from "../../UI/PrevNextNavigator/PrevNextNavigator";
import EditableQuestion from "../../UI/EditableQuestion/EditableQuestion";
import Approver from "../../UI/Approver/Approver";
import DifficultyAdjuster from "../../UI/DifficultyAdjuster/DifficultyAdjuster";
import Button from "../../UI/Button/Button";
import SuperBigAndSpecialButton from "../../UI/SuperBigAndSpecialButton/SuperBigAndSpecialButton";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";

import classes from "./Editor.module.css";

const Editor = (props) => {
  const { configs } = useContext(ConfigContext);
  const [questions, setQuestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const [activeQuestion, setActiveQuestion] = useState(null);
  const [questionDifficulty, setQuestionDifficulty] = useState();
  const [approved, setApproved] = useState(false);
  const [questionBody, setQuestionBody] = useState("");
  const [questionPrompt, setQuestionPrompt] = useState("");
  const [answerChoices, setAnswerChoices] = useState([]);

  const [answerA, setAnswerA] = useState({});
  const [answerB, setAnswerB] = useState({});
  const [answerC, setAnswerC] = useState({});
  const [answerD, setAnswerD] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(false);

  /**
   * STARTUP NETWORK FETCH
   * retrieves relevant request data from the backend.
   * currently configured to work via proxy at localhost:8080
   *
   **/

  const fetchQuestions = useCallback(async () => {
    console.log("fetchQuestions ran!");
    setIsLoading(true);
    setError(false);

    try {
      //const response = await fetch("/questions");
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

      setQuestions(adjustedData);
      setActiveQuestion(adjustedData[activeIndex]);
      setQuestionDifficulty(adjustedData[activeIndex].difficulty);
      setApproved(adjustedData[activeIndex].approved);
      setQuestionBody(adjustedData[activeIndex].body);
      setQuestionPrompt(adjustedData[activeIndex].question);
      setAnswerChoices(adjustedData[activeIndex].answerChoices);
      setAnswerA(adjustedData[activeIndex].answerChoices[0]);
      setAnswerB(adjustedData[activeIndex].answerChoices[1]);
      setAnswerC(adjustedData[activeIndex].answerChoices[2]);
      setAnswerD(adjustedData[activeIndex].answerChoices[3]);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  /**
   * FUNCTIONS TO UPDATE QUESTION OBJECTS CORRECTLY
   * this will likely need refactoring later (consider useReducer?)
   **/

  const updateQuestionsList = () => {
    const tempQuestions = questions.map((question, index) => {
      if (index === activeIndex) {
        console.log("success?");
        return activeQuestion;
      } else {
        return question;
      }
    });
    setQuestions(tempQuestions);
  };

  /* 
    indexShiftHandler()
    takes index as param
    , sets both a new activeIndex and the appropriate activeQuestion
  */
  const indexShiftHandler = (indexTo) => {
    updateQuestionsList();
    setActiveIndex(indexTo);
    setActiveQuestion(questions[indexTo]);
    setQuestionDifficulty(questions[indexTo].difficulty);
    setApproved(questions[indexTo].approved);
    setQuestionBody(questions[indexTo].body);
    setQuestionPrompt(questions[indexTo].question);
    setAnswerChoices(questions[indexTo].answerChoices);
    setAnswerA(questions[indexTo].answerChoices[0]);
    setAnswerB(questions[indexTo].answerChoices[1]);
    setAnswerC(questions[indexTo].answerChoices[2]);
    setAnswerD(questions[indexTo].answerChoices[3]);
  };

  /*
    updateEditableFieldsHandler
    updates question body, prompt, and answer choices
    should be called only after the user unclicks the edit button! 
   */
  const updateEditableFieldsHandler = () => {
    setActiveQuestion({
      ...activeQuestion,
      body: questionBody,
      question: questionPrompt,
      answerChoices: answerChoices,
    });
    updateQuestionsList();
  };

  const updateApprovedHandler = (approved) => {
    setApproved(approved);
    setActiveQuestion({
      ...activeQuestion,
      approved: approved,
    });
    updateQuestionsList();
  };

  const updateQuestionDifficultyHandler = (difficulty) => {
    setQuestionDifficulty(difficulty);
    setActiveQuestion({
      ...activeQuestion,
      difficulty: difficulty,
    });
    updateQuestionsList();
  };

  const clickEditHander = () => {
    if (isEditing) {
      updateEditableFieldsHandler();
      updateQuestionsList();
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const submitHandler = async () => {
    console.log(questions);
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
        throw new Error("test failed");
      }
      console.log(response.json());
    } catch (error) {
      setError(error.message);
    }

    setIsSending(false);
  };

  return (
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
          indexShiftHandler={indexShiftHandler}
        />
        <PrevNextNavigator
          maxIndex={questions.length - 1}
          activeIndex={activeIndex}
          indexShiftHandler={indexShiftHandler}
          isEditing={isEditing}
        />
      </div>
      {activeQuestion === null ? (
        <LoadingSpinner optionalText="generating..." />
      ) : (
        <EditableQuestion
          body={questionBody}
          setBody={setQuestionBody}
          prompt={questionPrompt}
          setPrompt={setQuestionPrompt}
          answerChoices={answerChoices}
          setAnswerChoices={setAnswerChoices}
          answerA={answerA}
          answerB={answerB}
          answerC={answerC}
          answerD={answerD}
          setAnswerA={setAnswerA}
          setAnswerB={setAnswerB}
          setAnswerC={setAnswerC}
          setAnswerD={setAnswerD}
          isEditing={isEditing}
          disabled={approved === false ? true : false}
        />
      )}
      <div className={`${classes["editing-tools"]}`}>
        <div className={`${classes["editing-tools--inner"]}`}>
          <Approver
            updateApproved={updateApprovedHandler}
            approved={approved}
            questions={questions}
          />
          <DifficultyAdjuster
            checkedDifficulty={questionDifficulty}
            updateQuestionDifficulty={updateQuestionDifficultyHandler}
            disabled={approved === false ? true : false}
          />
          <Button
            color={approved === false ? "grey" : "pink"}
            size="medium"
            onClick={clickEditHander}
            option="edit"
            disabled={approved === false ? true : false}
          />
        </div>
        <SuperBigAndSpecialButton
          option="save"
          onClick={submitHandler}
          disabled={isEditing}
          isWaiting={isSending}
        />
      </div>
    </main>
  );
};

export default Editor;
