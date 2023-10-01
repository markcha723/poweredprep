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
  const { type, onDialogClose, onProceedAnyways, message } = props;

  let backgroundColorStyling;
  if (type === "warning") {
    backgroundColorStyling = `${classes["title-background"]} ${classes.warning}`;
  } else if (type === "error") {
    backgroundColorStyling = `${classes["title-background"]} ${classes.error}`;
  } else {
    backgroundColorStyling = `${classes["title-background"]}`;
  }

  return (
    <React.Fragment>
      {createPortal(<Overlay onClick={onDialogClose} />, portalElement)}
      {createPortal(
        <div className={classes.dialog}>
          <div className={backgroundColorStyling}></div>
          <h2>{type}</h2>
          <p>{message}</p>

          {type === "about" && (
            <Button
              color="teal"
              option="okay"
              size="medium"
              onClick={onDialogClose}
            >
              OK
            </Button>
          )}

          {type === "warning" && (
            <React.Fragment>
              <Button
                color="teal"
                option="go back"
                size="medium"
                onClick={onDialogClose}
              ></Button>
              <Button
                color="warning"
                option="submit anyways"
                size="medium"
                onClick={onProceedAnyways}
              ></Button>
            </React.Fragment>
          )}

          {type === "loading" && <LoadingSpinner size="large" />}
        </div>,
        portalElement
      )}
    </React.Fragment>
  );
};

export default Dialog;
