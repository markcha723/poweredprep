import React, { useState } from "react";
import classes from "./Approver.module.css";

const Approver = (props) => {
  const [approved, setApproved] = useState();

  return (
    <form className={classes.container}>
      <input
        type="radio"
        id="disapprove"
        name="approval"
        onChange={() => props.setApproved(false)}
      />
      <label htmlFor="disapprove">
        <span>👎</span>
      </label>

      <input
        type="radio"
        id="approve"
        name="approval"
        onChange={() => props.setApproved(true)}
      />
      <label htmlFor="approve">
        <span>👍</span>
      </label>
    </form>
  );
};

export default Approver;
