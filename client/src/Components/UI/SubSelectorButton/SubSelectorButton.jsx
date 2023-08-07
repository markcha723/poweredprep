import React from "react";
import { useState } from "react";

import classes from "./SubSelectorButton.module.css";

const SubSelectorButton = (props) => {
  const [checked, setChecked] = useState(false);

  const checkedHandler = (event) => {
    setChecked(event.target.checked);
    props.setSelection(event);
  };

  return (
    <div className={classes.container}>
      <input
        type="checkbox"
        name={props.name}
        id={props.name}
        value={props.displayText}
        checked={props.wasSelected.includes(props.displayText)}
        onChange={checkedHandler}
        className={`${classes.button} ${checked ? classes.selected : ""}`}
      ></input>
      <label htmlFor={props.name} className={classes.label}>
        <span>{props.displayText}</span>
      </label>
    </div>
  );
};

export default SubSelectorButton;
