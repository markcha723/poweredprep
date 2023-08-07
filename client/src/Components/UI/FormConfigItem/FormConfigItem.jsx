import React from "react";
import classes from "./FormConfigItem.module.css";
import Button from "../Button/Button";

const FormConfigItem = (props) => {
  const sendTo = (location) => {
    props.setActiveConfig(location);
  };

  let displayText = "";

  if (props.inputs.constructor === Array) {
    if (props.inputs.length > 1) {
      for (let i = 0; i < props.inputs.length; i++) {
        i === props.inputs.length - 1
          ? (displayText += props.inputs[i])
          : (displayText += `${props.inputs[i]}, `);
      }
    } else {
      displayText = props.inputs.toString();
    }
  }

  return (
    <li className={classes.item}>
      <span className={classes["item-name"]}>{props.optionName}</span>
      <span className={classes.colon}>:</span>
      <span
        className={`${classes["item-value"]} ${
          displayText.length > 20
            ? classes["small-text"]
            : classes["large-text"]
        }`}
      >
        {props.inputs.constructor === Array ? displayText : props.inputs}
      </span>
      <Button
        size="xsmall"
        type="notSubmit"
        option="edit"
        onClick={() => sendTo(props.sendTo)}
      />
    </li>
  );
};

export default FormConfigItem;
