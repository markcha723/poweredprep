import React, { useContext } from "react";
import FormConfigItem from "../FormConfigItem/FormConfigItem";
import Button from "../Button";
import ConfigContext from "../../../store/config-context";
import classes from "./ConfirmRequestForm.module.css";

const ConfirmRequestForm = (props) => {
  const { configs, updateConfigs, setActiveConfig } = useContext(ConfigContext);

  // error handling for items needs to be handled.
  // disables button if any of the forms are invalid!

  // find a way to resize display text if it's above a certain size, probably in FormConfigItem.js
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(props.configs);
  };

  return (
    <form id="form" className={classes.form}>
      <ul className={classes.configs}>
        <FormConfigItem
          optionName="section"
          inputs={configs.section}
          sendTo="section"
          configs={configs}
          setActiveConfig={setActiveConfig}
        />
        <FormConfigItem
          optionName="question type"
          inputs={configs.questionTypes}
          sendTo="questions"
          configs={configs}
          setActiveConfig={setActiveConfig}
        />
        <FormConfigItem
          optionName="topics"
          inputs={configs.passageTopics}
          sendTo="passages"
          configs={configs}
          setActiveConfig={setActiveConfig}
        />
        <FormConfigItem
          optionName="styles"
          inputs={configs.passageStyles}
          sendTo="passages"
          configs={configs}
          setActiveConfig={setActiveConfig}
        />
        <FormConfigItem
          optionName="difficulty"
          inputs={configs.difficulty}
          sendTo="extras"
          configs={configs}
          setActiveConfig={setActiveConfig}
        />
        <FormConfigItem
          optionName="number of questions"
          inputs={configs.numberOfQuestions}
          sendTo="extras"
          configs={configs}
          setActiveConfig={setActiveConfig}
        />
        <FormConfigItem
          optionName="vocabulary"
          inputs={configs.wordsToUse}
          sendTo="extras"
          configs={configs}
          setActiveConfig={setActiveConfig}
        />
      </ul>
      <Button
        form="form"
        onClick={submitHandler}
        type="submit"
        color="pink"
        option="send"
        size="large"
      />
    </form>
  );
};

export default ConfirmRequestForm;
