import React from "react";

const ConfigContext = React.createContext({
  section: null,
  questionTypes: null,
  passageStyles: null,
  passageTopics: null,
  difficulty: null,
  numberOfQuestions: null,
  wordsToUse: null,
});

export default ConfigContext;
