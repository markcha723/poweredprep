import React from "react";
import classes from "./FormConfigItem.module.css";
import Button from "../Button/Button";

const FormConfigItem = (props) => {
  const sendTo = (location) => {
    props.setActiveConfig(location);
  };

  const itemStyling =
    props.isValid === false
      ? `${classes.item} ${classes["error-highlight"]}`
      : classes.item;

  return (
    <li className={itemStyling}>
      <span className={classes["item-name"]}>{props.optionName}</span>
      <span className={classes.colon}>:</span>
      <span
        className={`${classes["item-value"]} ${
          props.displayText.length > 20
            ? classes["small-text"]
            : classes["large-text"]
        }`}
      >
        {props.displayText}
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
