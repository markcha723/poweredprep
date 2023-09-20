import React, { useContext } from "react";
import classes from "./Question.module.css";
import AnswerChoice from "../AnswerChoice/AnswerChoice";
import TextSelectionTooltip from "../TextSelectionTooltip/TextSelectionTooltip";
import StudyContext from "../../../store/study-context";

const Question = (props) => {
  const { state, dispatch } = useContext(StudyContext);
  const { activeQuestion, activeIndex } = state;
  const {
    answerChoices,
    question: prompt,
    body: questionBody,
  } = activeQuestion;

  return (
    <article className={classes["question-and-answer"]}>
      <p
        className={classes["question-body"]}
        onMouseUp={props.onWordHighlight || null}
      >
        {questionBody}
      </p>
      <p className={classes.prompt} onMouseUp={props.onWordHighlight || null}>
        {prompt}
      </p>
      <ul className={classes["answer-choices"]}>
        <AnswerChoice
          choiceLetter={answerChoices[0].choiceLetter}
          text={answerChoices[0].choiceText}
          isSelected={answerChoices[0].chosenByStudent}
        />
        <AnswerChoice
          choiceLetter={answerChoices[1].choiceLetter}
          text={answerChoices[1].choiceText}
          isSelected={answerChoices[1].chosenByStudent}
        />
        <AnswerChoice
          choiceLetter={answerChoices[2].choiceLetter}
          text={answerChoices[2].choiceText}
          isSelected={answerChoices[2].chosenByStudent}
        />
        <AnswerChoice
          choiceLetter={answerChoices[3].choiceLetter}
          text={answerChoices[3].choiceText}
          isSelected={answerChoices[3].chosenByStudent}
        />
      </ul>
    </article>
  );
};

export default Question;
