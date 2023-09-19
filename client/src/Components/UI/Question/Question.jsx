import React from "react";
import classes from "./Question.module.css";
import EditorContext from "../../../store/editor-context";

const Question = (props) => {
  return (
    <article className={classes["question-and-answer"]}>
      <p className={classes["question-body"]}></p>
      <p className={classes.prompt}></p>
      <ul className={classes["answer-choices"]}></ul>
    </article>
  );
};

export default Question;
