import React, { useState } from "react";
import classes from "./Approver.module.css";

const Approver = (props) => {
  return (
    <form className={classes.container}>
      <input
        type="radio"
        id="disapprove"
        name="approval"
        onClick={() =>
          props.dispatch({ type: "APPROVE_CHANGE", payload: false })
        }
        onChange={() =>
          props.dispatch({ type: "APPROVE_CHANGE", payload: false })
        }
        checked={props.approved ? false : true}
      />
      <label htmlFor="disapprove">
        <span>👎</span>
      </label>

      <input
        type="radio"
        id="approve"
        name="approval"
        onClick={() =>
          props.dispatch({ type: "APPROVE_CHANGE", payload: true })
        }
        onChange={() =>
          props.dispatch({ type: "APPROVE_CHANGE", payload: true })
        }
        checked={props.approved ? true : false}
      />
      <label htmlFor="approve">
        <span>👍</span>
      </label>
    </form>
  );
};

export default Approver;
