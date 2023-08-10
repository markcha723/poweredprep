import React, { useContext, useEffect, useState, useCallback } from "react";
import ConfigContext from "../../../store/config-context";

import QuestionNavigator from "../../UI/QuestionNavigator/QuestionNavigator";
import PrevNextNavigator from "../../UI/PrevNextNavigator/PrevNextNavigator";
import EditableQuestion from "../../UI/EditableQuestion/EditableQuestion";
import Approver from "../../UI/Approver/Approver";
import DifficultyAdjuster from "../../UI/DifficultyAdjuster/DifficultyAdjuster";
import Button from "../../UI/Button/Button";
import classes from "./Editor.module.css";

const Editor = (props) => {
  const { configs, updateConfigs, setActiveConfig } = useContext(ConfigContext);
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
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(false);

  /**
   * STARTUP NETWORK FETCH
   * retrieves relevant request data from the backend.
   * currently configured to work via proxy at localhost:8080
   *
   **/

  const fetchQuestions = useCallback(async () => {
    setIsLoading(true);
    setError(false);

    try {
      const response = await fetch("/questions");
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
    console.log(questions);
    console.log(activeQuestion);
  }, [fetchQuestions]);

  /**
   * FUNCTIONS TO UPDATE QUESTION OBJECTS CORRECTLY
   * this will likely need refactoring later (consider useReducer?)
   **/

  const updateQuestionsList = () => {
    const tempQuestions = questions;
    tempQuestions.splice(activeIndex, 1, activeQuestion);
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

  const updateQuestionHandler = (object) => {
    console.log("updatequestionhandler fired");
  };

  const updateApprovedHandler = (approved) => {
    setApproved(approved);
    setActiveQuestion({
      ...activeQuestion,
      approved: approved,
    });
  };

  const updateQuestionDifficultyHandler = (difficulty) => {
    setQuestionDifficulty(difficulty);
    setActiveQuestion({
      ...activeQuestion,
      difficulty: difficulty,
    });
  };

  const clickEditHander = () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const submitHandler = () => {
    if (isEditing) {
      console.log("You are currently editing. Close the editing option first.");
      return;
    }
    console.log("clicked submit!");
    updateQuestionsList();
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
        <p>loading...</p>
      ) : (
        <EditableQuestion
          body={questionBody}
          prompt={questionPrompt}
          answerChoices={answerChoices}
          answerA={answerA}
          answerB={answerB}
          answerC={answerC}
          answerD={answerD}
          isEditing={isEditing}
          updateQuestion={updateQuestionHandler}
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
            size="large"
            onClick={clickEditHander}
            option="edit"
            disabled={approved === false ? true : false}
          />
        </div>
        <Button
          superBigAndSpecial={true}
          option="submit"
          onClick={submitHandler}
          disabled={isEditing}
        />
      </div>
    </main>
  );
};

export default Editor;
