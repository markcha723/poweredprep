import React, { useReducer, useEffect } from "react";
import studyReducer from "./study-reducer";
import StudyContext from "../../../store/study-context";
import Question from "../../UI/Question/Question";
import classes from "./Study.module.css";

const Study = (props) => {
  const [state, dispatch] = useReducer(studyReducer, {
    questions: [],
    activeQuestion: {},
    activeIndex: 0,
  });

  useEffect(() => {
    dispatch({ type: "INITIALIZE", payload: props.questionSet });
  }, []);

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
