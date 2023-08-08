import React, { useContext, useEffect, useState, useCallback } from "react";
import ConfigContext from "../../../store/config-context";
import classes from "./Editor.module.css";

const Editor = (props) => {
  const { configs, updateConfigs, setActiveConfig } = useContext(ConfigContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchQuestions = useCallback(async () => {
    setIsLoading(true);
    setError(false);

    try {
      const response = await fetch("/questions");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      console.log(data);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return (
    <main className={classes.editor}>
      <div className={classes.misc}></div>
      <article className={classes["question-and-answer"]}></article>
      <div className={classes["editing-tools"]}></div>
    </main>
  );
};

export default Editor;
