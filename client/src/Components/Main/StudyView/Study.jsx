import React, { useReducer, useEffect } from "react";
import studyReducer from "./study-reducer";
import StudyContext from "../../../store/study-context";
import Question from "../../UI/Question/Question";
import classes from "./Study.module.css";

const Study = (props) => {
  const [state, dispatch] = useReducer(studyReducer, {
    questions: props.questionSet,
    activeQuestion: props.questionSet[0],
    activeIndex: 0,
  });

  console.log(state.questions);

  return (
    <StudyContext.Provider value={{ state, dispatch }}>
      <div className={classes.main}>
        <div className={classes["nav-tools"]}></div>
        <Question />
      </div>
    </StudyContext.Provider>
  );
};

export default Study;
