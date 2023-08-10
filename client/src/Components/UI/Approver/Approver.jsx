import React, { useState } from "react";
import classes from "./Approver.module.css";

const Approver = (props) => {
  console.log(`approver remounted: ${props.approved}`);
  console.log(props.questions);

  return (
    <form className={classes.container}>
      <input
        type="radio"
        id="disapprove"
        name="approval"
        onClick={() => props.updateApproved(false)}
        checked={props.approved ? false : true}
      />
      <label htmlFor="disapprove">
        <span>👎</span>
      </label>

      <input
        type="radio"
        id="approve"
        name="approval"
        onClick={() => props.updateApproved(true)}
        checked={props.approved ? true : false}
      />
      <label htmlFor="approve">
        <span>👍</span>
      </label>
    </form>
  );
};

export default Approver;
