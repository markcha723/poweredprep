import React, { useContext } from "react";
import classes from "../TopicSelector/TopicSelector.module.css";
import EditorContext from "../../../../store/editor-context";
import { styleOptions } from "../../../../hooks/use-config-validator";

const StyleSelector = (props) => {
  const { state, dispatch } = useContext(EditorContext);
  const { questionErrors, activeIndex } = state;
  const { style: styleSelectedError } = questionErrors[activeIndex];
  const { style, approved } = state.activeQuestion;

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
    <div
      className={`${classes["topic-selector"]} ${
        approved ? "" : classes.disabled
      } ${styleSelectedError ? classes["error-highlight"] : ""}`}
    >
      <label
        htmlFor="style-selector"
        title="Select what style the passage is closest to."
      >
        style:
      </label>
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
