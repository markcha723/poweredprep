import React from "react";

import SubSelectorButton from "./SubSelectorButton";
import classes from "./SubSelector.module.css";

const SubSelector = (props) => {
  console.log(props.optionName);
  console.log(props.optionOptions);

  const loadSubSelectors = () => {
    return (
      <React.Fragment>
        {props.optionOptions.map((option) => (
          <SubSelectorButton name={option} key={option} />
        ))}
      </React.Fragment>
    );
  };

  return (
    <div className={classes["sub-selector"]}>
      <p>{props.optionName}:</p>
      {props.optionOptions.length > 5 ? (
        <div className={classes["options-grid"]}>{loadSubSelectors()}</div>
      ) : (
        <div className={classes["options-line"]}>{loadSubSelectors()}</div>
      )}
    </div>
  );
};

export default SubSelector;
