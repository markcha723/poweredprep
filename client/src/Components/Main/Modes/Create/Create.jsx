import React, { useState } from "react";

import ConfigContext from "../../../../store/config-context";
import ProgressBar from "../../../UI/Progress/ProgressBar";
import CreateSection from "./CreateSection";
import CreateQuestions from "./CreateQuestions";
import CreatePassages from "./CreatePassages";
import CreateExtras from "./CreateExtras";
import ConfirmRequestForm from "../../../UI/ConfirmRequest/ConfirmRequestForm";
import classes from "./Create.module.css";

const Create = (props) => {
  const [configs, updateConfigs] = useState({
    section: null,
    questionTypes: null,
    passageStyles: ["varied"],
    passageTopics: ["varied"],
    difficulty: ["varied"],
    numberOfQuestions: 5,
    wordsToUse: [],
  });
  const [activeConfig, setActiveConfig] = useState("section");

  console.log(configs);

  return (
    <ConfigContext.Provider value={{ configs, updateConfigs, setActiveConfig }}>
      <ProgressBar
        barFor="create"
        active={activeConfig}
        onSelect={setActiveConfig}
        className={classes["progress-bar"]}
      />
      {activeConfig === "section" && <CreateSection />}
      {activeConfig === "questions" && <CreateQuestions />}
      {activeConfig === "passages" && <CreatePassages />}
      {activeConfig === "extras" && <CreateExtras />}
      {activeConfig === "confirm" && <ConfirmRequestForm />}
    </ConfigContext.Provider>
  );
};

export default Create;
