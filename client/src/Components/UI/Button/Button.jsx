import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  const buttonText = props.option;

  if (props.superBigAndSpecial === true) {
    return (
      <div
        className={`${classes["super-large-and-special-border-1"]} ${
          props.disabled ? classes.disabled : ""
        }`}
      >
        <div className={classes["super-large-and-special-border-2"]}>
          <button
            className={classes["super-large-and-special-button"]}
            onClick={props.onClick}
          >
            {buttonText}
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      className={`${classes.button} ${classes[props.color]} ${
        classes[props.size]
      }`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {buttonText}
    </button>
  );
};

export default Button;
