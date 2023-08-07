import React from "react";
import { createPortal } from "react-dom";

import Button from "../Button/Button";
import classes from "./Dialog.module.css";

const Overlay = (props) => {
  return <div className={classes.overlay} onClick={props.onClick}></div>;
};

const portalElement = document.getElementById("dialog-root");

const Dialog = (props) => {
  return (
    <React.Fragment>
      {createPortal(<Overlay onClick={props.onDialogClose} />, portalElement)}
      {createPortal(
        <div className={classes.dialog}>
          <div className={classes.titleBackground}></div>
          <h2>{props.type}</h2>
          <p>{props.message}</p>

          {props.type === "about" && (
            <Button
              color="teal"
              option="okay"
              size="small"
              onClick={props.onDialogClose}
            >
              OK
            </Button>
          )}
        </div>,
        portalElement
      )}
    </React.Fragment>
  );
};

export default Dialog;
