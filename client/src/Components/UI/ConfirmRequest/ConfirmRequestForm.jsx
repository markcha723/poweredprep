import React, { useContext, useState } from "react";
import FormConfigItem from "../FormConfigItem/FormConfigItem";
import Button from "../Button/Button";
import ConfigContext from "../../../store/config-context";
import useConfigValidator from "../../../hooks/use-config-validator";
import classes from "./ConfirmRequestForm.module.css";

const ConfirmRequestForm = (props) => {
  const { configs, setActiveConfig } = useContext(ConfigContext);
  const [isWaiting, setIsWaiting] = useState(false);
  const validities = useConfigValidator(configs);
  const {
    sectionDisplayText,
    sectionIsValid,
    questionTypeDisplayText,
    questionTypeIsValid,
    topicsDisplayText,
    topicsIsValid,
    stylesDisplayText,
    stylesIsValid,
    difficultyDisplayText,
    difficultyIsValid,
    questionNumberDisplayText,
    questionNumberIsValid,
    vocabularyDisplayText,
    vocabularyIsValid,
  } = validities;

  const allFieldsValid =
    sectionIsValid &&
    questionNumberIsValid &&
    questionTypeIsValid &&
    topicsIsValid &&
    difficultyIsValid &&
    vocabularyIsValid &&
    stylesIsValid;

  // find a way to resize display text if it's above a certain size, probably in FormConfigItem.js
  const submitHandler = (event) => {
    event.preventDefault();
    if (isWaiting) {
      console.log("Try not to spam buttons!");
    } else {
      setIsWaiting(true);
      // currently only checks to see if server is healthy. needs to occur after state validation!
      setTimeout(async () => {
        const response = await fetch("/checks/ping");
        if (response.status === 200) {
          setIsWaiting(false);
          setActiveConfig("editor");
        } else {
          setIsWaiting(false);
          //technically there should be an error message here here
        }
      }, 2000);
    }
  };

  console.log(validities);
  console.log(allFieldsValid);

  return (
    <form id="form" className={classes.form}>
      <ul className={classes.configs}>
        <FormConfigItem
          optionName="section"
          sendTo="section"
          isValid={sectionIsValid}
          displayText={sectionDisplayText}
          setActiveConfig={setActiveConfig}
        />
        <FormConfigItem
          optionName="question type"
          sendTo="questions"
          isValid={questionTypeIsValid}
          displayText={questionTypeDisplayText}
          setActiveConfig={setActiveConfig}
        />
        <FormConfigItem
          optionName="topics"
          sendTo="passages"
          isValid={topicsIsValid}
          displayText={topicsDisplayText}
          setActiveConfig={setActiveConfig}
        />
        <FormConfigItem
          optionName="styles"
          sendTo="passages"
          isValid={stylesIsValid}
          displayText={stylesDisplayText}
          setActiveConfig={setActiveConfig}
        />
        <FormConfigItem
          optionName="difficulty"
          sendTo="extras"
          isValid={difficultyIsValid}
          displayText={difficultyDisplayText}
          setActiveConfig={setActiveConfig}
        />
        <FormConfigItem
          optionName="number of questions"
          sendTo="extras"
          isValid={questionNumberIsValid}
          displayText={questionNumberDisplayText}
          setActiveConfig={setActiveConfig}
        />
        <FormConfigItem
          optionName="vocabulary"
          sendTo="extras"
          isValid={vocabularyIsValid}
          displayText={vocabularyDisplayText}
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
        isWaiting={isWaiting}
        disabled={!allFieldsValid}
      />
    </form>
  );
};

export default ConfirmRequestForm;
