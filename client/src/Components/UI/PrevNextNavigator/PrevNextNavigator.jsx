import React from "react";

import Button from "../Button/Button";
import classes from "./PrevNextNavigator.module.css";

const PrevNextNavigator = (props) => {
  return (
    <div className={classes.container}>
      <Button
        size="medium"
        color={props.isEditing ? "grey" : "teal"}
        option="previous"
        onClick={() =>
          props.dispatch({
            type: "INDEX_CHANGE",
            index: props.activeIndex - 1,
          })
        }
        disabled={props.activeIndex <= 0}
        consistentSizing
      ></Button>
      <Button
        size="medium"
        color={props.isEditing ? "grey" : "pink"}
        option="next"
        onClick={() =>
          props.dispatch({
            type: "INDEX_CHANGE",
            index: props.activeIndex + 1,
          })
        }
        disabled={props.activeIndex >= props.maxIndex}
        consistentSizing
      ></Button>
    </div>
  );
};

export default PrevNextNavigator;
