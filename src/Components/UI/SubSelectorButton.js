import React from "react";

import classes from "./SubSelectorButton.module.css";

const SubSelectorButton = (props) => {
  return (
    <div className={classes.container}>
      <input
        type="checkbox"
        name={props.name}
        id={props.name}
        className={`${classes.button} ${
          props.isSelected ? classes.selected : ""
        }`}
      ></input>
      <label htmlFor={props.name} className={classes.label}>
        <span>{props.name}</span>
      </label>
    </div>
  );
};

export default SubSelectorButton;
