import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  const buttonText = props.option;
  return (
    <button
      className={`${classes.button} ${classes[props.color]} ${
        classes[props.size]
      }`}
      onClick={props.onClick}
    >
      {buttonText}
    </button>
  );
};

export default Button;
