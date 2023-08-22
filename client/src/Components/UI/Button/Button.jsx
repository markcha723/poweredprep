import React from "react";
import classes from "./Button.module.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const Button = (props) => {
  const buttonText = props.option;

  if (props.consistentSizing) {
  }

  return (
    <button
      className={`${classes.button} ${classes[props.color]} ${
        classes[props.size]
      }`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.isWaiting ? <LoadingSpinner /> : buttonText}
    </button>
  );
};

export default Button;
