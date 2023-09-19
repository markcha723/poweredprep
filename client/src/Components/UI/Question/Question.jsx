import React, { useContext } from "react";
import classes from "./Question.module.css";
import StudyContext from "../../../store/study-context";

const Question = (props) => {
  const { state, dispatch } = useContext(StudyContext);
  const { activeQuestion, activeIndex } = state;
  const {
    answerChoices,
    question: prompt,
    body: questionBody,
  } = activeQuestion;

  console.log(activeQuestion);
  return (
    <article className={classes["question-and-answer"]}>
      <p className={classes["question-body"]}>{questionBody}</p>
      <p className={classes.prompt}>{prompt}</p>
      <ul className={classes["answer-choices"]}>
        <p>askjdnajskdn</p>
      </ul>
    </article>
  );
};

export default Question;
