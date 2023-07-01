import React from "react";

import classes from "./ProgressButton.module.css";

const ProgressButton = (props) => {
  const isActive = props.name === props.active;

  const clickHandler = () => {
    props.onSelect(props.name);
  };

  return (
    <button
      className={`${classes.button} ${isActive ? classes.active : ""}`}
      name={props.name}
      onClick={clickHandler}
    >
      {props.name}
    </button>
  );
};

export default ProgressButton;
