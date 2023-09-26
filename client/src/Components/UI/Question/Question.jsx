import React, { useContext } from "react";
import classes from "./Question.module.css";
import AnswerChoice from "../AnswerChoice/AnswerChoice";
import TextSelectionTooltip from "../TextSelectionTooltip/TextSelectionTooltip";
import StudyContext from "../../../store/study-context";

const Question = (props) => {
  const { state, dispatch } = useContext(StudyContext);
  const { activeQuestion, chosenAnswers, activeIndex, isReviewing } = state;
  const {
    answerChoices,
    question: prompt,
    body: questionBody,
  } = activeQuestion;
  const currentChosenAnswer = chosenAnswers[activeIndex];

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
          isSelected={currentChosenAnswer === answerChoices[0].choiceLetter}
          onMouseUp={props.onWordHighlight || null}
        />
        <AnswerChoice
          choiceLetter={answerChoices[1].choiceLetter}
          text={answerChoices[1].choiceText}
          isSelected={currentChosenAnswer === answerChoices[1].choiceLetter}
          onMouseUp={props.onWordHighlight || null}
        />
        <AnswerChoice
          choiceLetter={answerChoices[2].choiceLetter}
          text={answerChoices[2].choiceText}
          isSelected={currentChosenAnswer === answerChoices[2].choiceLetter}
          onMouseUp={props.onWordHighlight || null}
        />
        <AnswerChoice
          choiceLetter={answerChoices[3].choiceLetter}
          text={answerChoices[3].choiceText}
          isSelected={currentChosenAnswer === answerChoices[3].choiceLetter}
          onMouseUp={props.onWordHighlight || null}
        />
      </ul>
    </article>
  );
};

export default Question;
