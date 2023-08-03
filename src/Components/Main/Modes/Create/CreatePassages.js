import React, { useState, useContext } from "react";
import SubSelector from "../../../UI/SubSelector";
import Button from "../../../UI/Button";
import ConfigContext from "../../../../store/config-context";
import classes from "./CreatePassages.module.css";

const CreatePassages = (props) => {
  const { configs, updateConfigs, setActiveConfig } = useContext(ConfigContext);

  const options = [
    {
      optionName: "topics",
      optionOptions: [
        "varied",
        "history",
        "earth science",
        "chemistry",
        "social studies",
        "psychology",
        "literature",
      ],
    },

    {
      optionName: "styles",
      optionOptions: [
        "varied",
        "modern",
        "argument",
        "old (1900s)",
        "old (1800s)",
        "flowery",
        "political",
      ],
    },
  ];

  const [topics, setTopics] = useState([]);
  const [styles, setStyles] = useState([]);

  const submitHandler = () => {
    updateConfigs({
      ...configs,
      passageStyles: styles,
      passageTopics: topics,
    });
    setActiveConfig("extras");
  };

  return (
    <div className={classes["create-passages"]}>
      <p>what types of passages?</p>
      <div className={classes["multiple-selector"]}>
        <SubSelector
          configs={configs}
          selectedItems={topics}
          setSelectedItems={setTopics}
          optionName={options[0].optionName}
          optionOptions={options[0].optionOptions}
          key={options[0].optionName}
        />
        <SubSelector
          configs={configs}
          selectedItems={styles}
          setSelectedItems={setStyles}
          optionName={options[1].optionName}
          optionOptions={options[1].optionOptions}
          key={options[1].optionName}
        />
      </div>
      <Button size="large" onClick={submitHandler} option="next" color="teal" />
    </div>
  );
};

export default CreatePassages;
