import React from "react";

import classes from "./Selector.module.css";

/* 
This is a generic selection interface. 
Buttons should be passed into <div>{props.children}</div>, functionality controlled by parent

WIP: add functionality to resize based on number of options, switching to GRID when necessary
*/

const Selector = (props) => {
  return (
    <div
      className={`${classes.selector} ${
        props.isCentered ? classes.centered : ""
      }`}
    >
      <p>{props.prompt}</p>
      <div
        className={
          props.buttonGrid
            ? classes["selections-many"]
            : classes["selections-few"]
        }
      >
        {props.children}
      </div>
    </div>
  );
};

export default Selector;
