import React, { useState } from "react";
import ProgressBar from "../../../UI/Progress/ProgressBar";

import CreateSection from "./CreateSection";
import CreateQuestions from "./CreateQuestions";
import CreatePassages from "./CreatePassages";
import classes from "./Create.module.css";

const Create = (props) => {
  const [configs, updateConfigs] = useState({
    section: null,
    questionTypes: null,
    passageStyleAndSubject: {
      styles: null,
      subjects: null,
    },
    extras: {
      difficulty: null,
      number: null,
      words: null,
    },
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
      {activeConfig === "extras" && <div>extras</div>}
    </React.Fragment>
  );
};

export default Create;
