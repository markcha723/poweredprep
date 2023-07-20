import React, { useState } from "react";
import ProgressBar from "../../../UI/Progress/ProgressBar";

import CreateSection from "./CreateSection";
import CreateQuestions from "./CreateQuestions";
import CreatePassages from "./CreatePassages";
import CreateExtras from "./CreateExtras";
import classes from "./Create.module.css";

const Create = (props) => {
  const [configs, updateConfigs] = useState({
    section: null,
    questionTypes: null,
    passageStyles: null,
    passageTopics: null,
    difficulty: null,
    numberOfQuestions: null,
    wordsToUse: null,
  });
  const [activeConfig, setActiveConfig] = useState("section");

  console.log(configs);

  return (
    <React.Fragment>
      <ProgressBar
        barFor="create"
        active={activeConfig}
        onSelect={setActiveConfig}
        className={classes["progress-bar"]}
      />

      {activeConfig === "section" && (
        <CreateSection
          configs={configs}
          setActiveConfig={setActiveConfig}
          updateConfigs={updateConfigs}
        />
      )}
      {activeConfig === "questions" && (
        <CreateQuestions
          configs={configs}
          activeConfig={activeConfig}
          setActiveConfig={setActiveConfig}
          updateConfigs={updateConfigs}
        />
      )}
      {activeConfig === "passages" && (
        <CreatePassages
          configs={configs}
          activeConfig={activeConfig}
          setActiveConfig={setActiveConfig}
          updateConfigs={updateConfigs}
        />
      )}
      {activeConfig === "extras" && (
        <CreateExtras
          configs={configs}
          activeConfig={activeConfig}
          setActiveConfig={setActiveConfig}
          updateConfigs={updateConfigs}
        />
      )}
      {activeConfig === "confirm" && <div>WORK IN PROGRESS!</div>}
    </React.Fragment>
  );
};

export default Create;
