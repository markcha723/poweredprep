import React from "react";
import classes from "./Button.module.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const Button = (props) => {
  const buttonText = props.option;

  let styling = `${classes.button} ${
    props.disabled ? classes["grey"] : classes[props.color]
  } ${classes[props.size]} ${props.endPosition ? classes["end-position"] : ""}`;

  if (props.customSizing) {
    styling = `${classes.button} ${
      props.disabled ? classes["grey"] : classes[props.color]
    } ${props.customSizing} ${
      props.endPosition ? classes["end-position"] : ""
    }`;
  }

  if (props.disabled) {
    return (
      <button
        className={`${styling} ${classes.disabled}`}
        onClick={props.onClick}
        style={props.customSizing}
      >
        {props.isWaiting ? <LoadingSpinner /> : buttonText}
      </button>
    );
  }

  return (
    <button
      className={`${classes.button} ${classes[props.color]} ${
        classes[props.size]
      } ${props.endPosition ? classes["end-position"] : ""}`}
      onClick={props.onClick}
      disabled={props.disabled}
      style={props.customSizing}
    >
      {props.isWaiting ? <LoadingSpinner /> : buttonText}
    </button>
  );
};

export default Button;
