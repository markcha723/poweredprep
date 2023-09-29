import React from "react";
import { createPortal } from "react-dom";

import Button from "../Button/Button";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
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

          {props.type === "warning" && (
            <React.Fragment>
              <Button
                color="teal"
                option="go back"
                size="medium"
                onClick={props.onDialogClose}
              ></Button>
              <Button
                color="warning"
                option="submit anyways"
                size="small"
                onClick={props.onProceedAnyways}
              ></Button>
            </React.Fragment>
          )}

          {props.type === "loading" && <LoadingSpinner size="large" />}
        </div>,
        portalElement
      )}
    </React.Fragment>
  );
};

export default Dialog;
