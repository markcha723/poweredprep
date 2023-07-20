import React from "react";

import SubSelectorButton from "./SubSelectorButton";
import classes from "./SubSelector.module.css";

const SubSelector = (props) => {
  const changeHandler = (event) => {
    if (event.target.checked) {
      props.setSelectedItems([...props.selectedItems, event.target.value]);
    } else {
      props.setSelectedItems(
        props.selectedItems.filter((item) => item !== event.target.value)
      );
    }
  };

  console.log(props.selectedItems);

  const loadSubSelectors = () => {
    return (
      <React.Fragment>
        {props.optionOptions.map((option) => (
          <SubSelectorButton
            displayText={option}
            name={`${props.optionName}-${option}`}
            key={`${props.optionName}-${option}`}
            setSelection={changeHandler}
          />
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
