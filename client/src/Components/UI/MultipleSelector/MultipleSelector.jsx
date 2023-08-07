import React from "react";
import classes from "./MultipleSelector.module.css";
import SubSelector from "../SubSelector/SubSelector";

const MultipleSelector = (props) => {
  const loadSelectors = (options) => {
    return (
      <React.Fragment>
        {options.map((option) => (
          <SubSelector
            configs={props.config}
            updateConfigs={props.updateConfigs}
            optionName={option.optionName}
            optionOptions={option.optionOptions}
            key={option.optionName}
          />
        ))}
      </React.Fragment>
    );
  };

  return (
    <div className={classes["multiple-selector"]}>
      {loadSelectors(props.options)}
    </div>
  );
};

export default MultipleSelector;
