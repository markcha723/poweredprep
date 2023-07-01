import React from "react";
import classes from "./MultipleSelector.module.css";
import SubSelector from "./SubSelector";

const MultipleSelector = (props) => {
  /* 
  Assume that what's passed in is an array of objects of the following form:
  [
    {
      optionName: style,
      optionOptions: [easy, medium, hard]
    },
    {
      optionName: subjects,
      optionOptions: [history, earth science, chemistry, social studies, psychology, etc]
    }, 
  ]

  Use flex to 
  1. Give each of the above sets of options their own row with checkboxes
  2. Put a submission button on the bottom
  */

  const loadSubSelectors = (options) => {
    return (
      <React.Fragment>
        {options.map((option) => (
          <SubSelector
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
      {loadSubSelectors(props.options)}
    </div>
  );
};

export default MultipleSelector;
