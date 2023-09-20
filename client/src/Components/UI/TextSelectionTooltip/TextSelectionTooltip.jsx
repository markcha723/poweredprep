import React from "react";
import { useLocation } from "react-router-dom";
import MagnifyingGlassSVG from "../../../icons/magnifyingglass";
import classes from "./TextSelectionTooltip.module.css";

const TextSelectionTooltip = (props) => {
  const location = useLocation();
  const { active, dispatch } = props;

  if (!active) {
    return <div className={classes.tooltip} />;
  }

  const searchWordHandler = () => {};

  return (
    <div
      className={`${classes.tooltip} ${classes.active}`}
      style={{ top: props.yLocation, left: props.xLocation }}
    >
      <div className={classes["icons-div"]}>
        <MagnifyingGlassSVG className={classes.icon} />
      </div>
      <div className={classes.arrow}></div>
    </div>
  );
};

export default TextSelectionTooltip;
