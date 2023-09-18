import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import ConfigContext from "../../store/config-context";
import ProgressBar from "../../Components/UI/Progress/ProgressBar";
import CreateSection from "../../Components/Main/Modes/Create/CreateSection";
import CreateQuestions from "../../Components/Main/Modes/Create/CreateQuestions";
import CreatePassages from "../../Components/Main/Modes/Create/CreatePassages";
import CreateExtras from "../../Components/Main/Modes/Create/CreateExtras";
import ConfirmRequestForm from "../../Components/UI/ConfirmRequest/ConfirmRequestForm";
import Editor from "../../Components/Main/Editor/Editor";
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
      <div className={classes.main}>
        {activeConfig !== "editor" && (
          <ProgressBar
            barFor="create"
            active={activeConfig}
            onSelect={setActiveConfig}
            className={classes["progress-bar"]}
          />
        )}
        {activeConfig === "section" && <CreateSection />}
        {activeConfig === "questions" && <CreateQuestions />}
        {activeConfig === "passages" && <CreatePassages />}
        {activeConfig === "extras" && <CreateExtras />}
        {activeConfig === "confirm" && <ConfirmRequestForm />}
        <Outlet />
      </div>
    </ConfigContext.Provider>
  );
};

export default Create;
