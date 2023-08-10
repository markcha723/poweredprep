import React from "react";

import Button from "../Button/Button";
import classes from "./PrevNextNavigator.module.css";

const PrevNextNavigator = (props) => {
  return (
    <div className={classes.container}>
      <Button
        size="large"
        color={props.isEditing ? "grey" : "teal"}
        option="previous"
        onClick={() => props.indexShiftHandler(props.activeIndex - 1)}
        disabled={props.activeIndex <= 0}
      ></Button>
      <Button
        size="large"
        color={props.isEditing ? "grey" : "pink"}
        option="next"
        onClick={() => props.indexShiftHandler(props.activeIndex + 1)}
        disabled={props.activeIndex >= props.maxIndex}
      ></Button>
    </div>
  );
};

export default PrevNextNavigator;
