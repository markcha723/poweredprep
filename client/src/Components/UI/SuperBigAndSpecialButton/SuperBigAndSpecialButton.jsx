import React from "react";
import classes from "./SuperBigAndSpecialButton.module.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const SuperBigAndSpecialButton = (props) => {
  const buttonText = props.option;

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
          {props.isWaiting ? <LoadingSpinner /> : buttonText}
        </button>
      </div>
    </div>
  );
};

export default SuperBigAndSpecialButton;
