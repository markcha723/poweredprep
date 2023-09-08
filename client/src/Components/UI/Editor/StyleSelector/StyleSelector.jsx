import React, { useContext } from "react";
import classes from "../TopicSelector/TopicSelector.module.css";
import EditorContext from "../../../../store/editor-context";
import { styleOptions } from "../../../../hooks/use-config-validator";

const StyleSelector = (props) => {
  const { state, dispatch } = useContext(EditorContext);
  const { style } = state.activeQuestion;

  // dynamically generate these options based on another array of possible options.
  const generateStyleOptions = () => {
    const stylesList = styleOptions.map((option) => {
      if (style === option) {
        return (
          <option value={option} key={`style-${option}`} selected>
            {option}
          </option>
        );
      } else {
        return (
          <option value={option} key={`style-${option}`}>
            {option}
          </option>
        );
      }
    });
    return stylesList;
  };

  const changeHandler = (event) => {
    dispatch({ type: "STYLE_CHANGE", payload: event.target.value });
  };

  return (
    <div className={classes["topic-selector"]}>
      <label htmlFor="style-selector">style:</label>
      <select
        name="style-selector"
        id="style-selector"
        value={style || "unselected"}
        onChange={changeHandler}
      >
        {(style === "wip" || "undefined") && (
          <option value="unselected" hidden>
            please select
          </option>
        )}
        {generateStyleOptions()}
      </select>
    </div>
  );
};

export default StyleSelector;
