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
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(false);
  const [approved, setApproved] = useState(true);

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
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const clickEditHander = () => {
    setIsEditing(!isEditing);
  };

  const submitHandler = () => {
    console.log("clicked submit!");
  };

  let content;

  if (questions.length > 0) {
    content = <p>got it</p>;
  }

  if (error) {
    content = <p>{error.message}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <main className={classes.editor}>
      <div className={classes.misc}>
        <span className={classes["page-title"]}>editor</span>
        <QuestionNavigator
          questionNumber={13}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
        <PrevNextNavigator
          maxIndex={12}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </div>
      <EditableQuestion isEditing={isEditing}>{content}</EditableQuestion>
      <div className={classes["editing-tools"]}>
        <Approver setApproved={setApproved} approved={approved} />
        <DifficultyAdjuster />
        <Button
          color="pink"
          size="large"
          onClick={clickEditHander}
          option="edit"
        />
        <Button
          superBigAndSpecial={true}
          option="submit"
          onClick={submitHandler}
        />
      </div>
    </main>
  );
};

export default Editor;
