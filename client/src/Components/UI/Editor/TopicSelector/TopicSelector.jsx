import React, { useContext } from "react";
import classes from "./TopicSelector.module.css";
import EditorContext from "../../../../store/editor-context";
import { topicOptions } from "../../../../hooks/use-config-validator";

const TopicSelector = (props) => {
  const { state, dispatch } = useContext(EditorContext);
  const { questionErrors, activeIndex } = state;
  const { subject: subjectSelectedError } = questionErrors[activeIndex];
  const { subject, approved } = state.activeQuestion;

  // dynamically generate these options based on another array of possible options.
  const generateOptions = () => {
    const options = topicOptions.map((topic) => {
      if (subject === topic) {
        return (
          <option value={topic} key={`subjects-${topic}`} selected>
            {topic}
          </option>
        );
      } else {
        return (
          <option value={topic} key={`subjects-${topic}`}>
            {topic}
          </option>
        );
      }
    });
    return options;
  };

  const changeHandler = (event) => {
    dispatch({ type: "SUBJECT_CHANGE", payload: event.target.value });
  };

  return (
    <div
      className={`${classes["topic-selector"]} ${
        approved ? "" : classes.disabled
      } ${subjectSelectedError ? classes["error-highlight"] : ""}`}
    >
      <label
        htmlFor="subject-selector"
        title="Select what subject the passage is closest to."
      >
        subject:
      </label>
      <select
        name="subject-selector"
        id="subject-selector"
        value={subject || "unselected"}
        onChange={changeHandler}
      >
        {(subject === "wip" || "undefined") && (
          <option value="unselected" hidden>
            please select
          </option>
        )}
        {generateOptions()}
      </select>
    </div>
  );
};

export default TopicSelector;
