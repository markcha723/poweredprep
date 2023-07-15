import React from "react";
import MultipleSelector from "../../../UI/MultipleSelector";
import Button from "../../../UI/Button";

import classes from "./CreatePassages.module.css";

const CreatePassages = (props) => {
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

  const submitHandler = () => {
    console.log(props.configs);
    props.setActiveConfig("extras");
  };

  return (
    <div className={classes["create-passages"]}>
      <p>what types of passages?</p>
      <MultipleSelector
        options={options}
        updateConfigs={props.updateConfigs}
        configs={props.configs}
      />
      <Button size="large" onClick={submitHandler} option="next" color="teal" />
    </div>
  );
};

export default CreatePassages;
