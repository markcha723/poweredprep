import React from "react";
import classes from "./FormConfigItem.module.css";
import Button from "../Button";

const FormConfigItem = (props) => {
  const sendTo = (location) => {
    props.setActiveConfig(location);
  };

  return (
    <li className={classes.item}>
      <span className={classes["item-name"]}>{props.optionName}</span>
      <span className={classes.colon}>:</span>
      <span className={classes["item-value"]}>{props.inputs}</span>
      <Button
        size="small"
        type="notSubmit"
        option="edit"
        onClick={() => sendTo(props.sendTo)}
      />
    </li>
  );
};

export default FormConfigItem;
