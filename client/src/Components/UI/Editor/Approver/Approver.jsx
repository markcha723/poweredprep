import React, { useContext } from "react";
import classes from "./Approver.module.css";
import EditorContext from "../../../../store/editor-context";

const Approver = () => {
  const { state, dispatch } = useContext(EditorContext);

  const { approved } = state.activeQuestion;

  const approveHandler = () => {
    dispatch({ type: "APPROVE_CHANGE", payload: true });
  };

  const disapproveHandler = () => {
    dispatch({ type: "APPROVE_CHANGE", payload: false });
  };

  return (
    <form className={classes.container}>
      <input
        type="radio"
        id="disapprove"
        name="approval"
        onClick={disapproveHandler}
        onChange={disapproveHandler}
        checked={!approved}
      />
      <label htmlFor="disapprove">
        <span>👎</span>
      </label>

      <input
        type="radio"
        id="approve"
        name="approval"
        onClick={approveHandler}
        onChange={approveHandler}
        checked={approved}
      />
      <label htmlFor="approve">
        <span>👍</span>
      </label>
    </form>
  );
};

export default Approver;
