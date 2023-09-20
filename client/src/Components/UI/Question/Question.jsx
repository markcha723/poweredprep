import React, { useContext } from "react";
import classes from "./Question.module.css";
import AnswerChoice from "../AnswerChoice/AnswerChoice";
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
        <AnswerChoice
          choiceLetter={answerChoices[0].choiceLetter}
          text={answerChoices[0].choiceText}
        />
        <AnswerChoice
          choiceLetter={answerChoices[1].choiceLetter}
          text={answerChoices[1].choiceText}
        />
        <AnswerChoice
          choiceLetter={answerChoices[2].choiceLetter}
          text={answerChoices[2].choiceText}
        />
        <AnswerChoice
          choiceLetter={answerChoices[3].choiceLetter}
          text={answerChoices[3].choiceText}
        />
      </ul>
    </article>
  );
};

export default Question;
