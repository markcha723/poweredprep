import React from "react";

import Button from "../../Button/Button";
import classes from "./PrevNextNavigator.module.css";

const PrevNextNavigator = (props) => {
  const customSizing = {
    fontSize: "2.4rem",
    width: "150px",
    padding: "1.2rem 2.4rem",
  };

  return (
    <div className={classes.container}>
      <Button
        customSizing={customSizing}
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
        title={
          props.activeIndex <= 0
            ? "You are on the first question."
            : "Go to previous question."
        }
      ></Button>
      <Button
        customSizing={customSizing}
        color={props.isEditing ? "grey" : "pink"}
        option="next"
        onClick={() =>
          props.dispatch({
            type: "INDEX_CHANGE",
            index: props.activeIndex + 1,
          })
        }
        disabled={props.activeIndex >= props.maxIndex}
        title={
          props.activeIndex >= props.maxIndex
            ? "You are on the last question."
            : "Go to the next question."
        }
        consistentSizing
      ></Button>
    </div>
  );
};

export default PrevNextNavigator;
