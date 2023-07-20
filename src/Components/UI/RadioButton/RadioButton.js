import React from "react";

import classes from "./RadioButton.module.css";

const RadioButton = (props) => {
  const changeHandler = (event) => {
    props.setQuestionNum(props.value);
  };

  return (
    <li className={classes.item}>
      <input
        type="radio"
        id={`questionNum-${props.value}`}
        name={props.name}
        value={props.value}
        checked={props.checked}
        onChange={changeHandler}
      />
      <label htmlFor={`questionNum-${props.value}`}>{props.value}</label>
    </li>
  );
};

export default RadioButton;
