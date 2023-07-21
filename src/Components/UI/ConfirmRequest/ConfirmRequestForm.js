import React from "react";
import FormConfigItem from "../FormConfigItem/FormConfigItem";
import Button from "../Button";
import classes from "./ConfirmRequestForm.module.css";

const ConfirmRequestForm = (props) => {
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
          inputs={props.configs.section}
          sendTo="section"
          configs={props.configs}
          setActiveConfig={props.setActiveConfig}
        />
        <FormConfigItem
          optionName="question type"
          inputs={props.configs.questionTypes}
          sendTo="questions"
          configs={props.configs}
          setActiveConfig={props.setActiveConfig}
        />
        <FormConfigItem
          optionName="topics"
          inputs={props.configs.passageTopics}
          sendTo="passages"
          configs={props.configs}
          setActiveConfig={props.setActiveConfig}
        />
        <FormConfigItem
          optionName="styles"
          inputs={props.configs.passageStyles}
          sendTo="passages"
          configs={props.configs}
          setActiveConfig={props.setActiveConfig}
        />
        <FormConfigItem
          optionName="difficulty"
          inputs={props.configs.difficulty}
          sendTo="extras"
          configs={props.configs}
          setActiveConfig={props.setActiveConfig}
        />
        <FormConfigItem
          optionName="number of questions"
          inputs={props.configs.numberOfQuestions}
          sendTo="extras"
          configs={props.configs}
          setActiveConfig={props.setActiveConfig}
        />
        <FormConfigItem
          optionName="vocabulary"
          inputs={props.configs.wordsToUse}
          sendTo="extras"
          configs={props.configs}
          setActiveConfig={props.setActiveConfig}
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
