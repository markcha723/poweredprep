import React, { useReducer, useContext } from "react";
import editorReducer from "../Editor/editor-reducer";

const Study = () => {
  const [state, dispatch] = useReducer(editorReducer, {
    questions: [],
    activeQuestion: {},
    questionErrors: [],
    activeIndex: 0,
    isLoading: true,
  });

  const { questions, activeQuestion, questionErrors, activeIndex, isLoading } =
    state;

  return <div></div>;
};

export default Study;
