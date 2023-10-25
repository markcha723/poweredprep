import React from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

import Button from "../Button/Button";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import classes from "./Dialog.module.css";

const Overlay = (props) => {
  return <div className={classes.overlay} onClick={props.onClick}></div>;
};

const portalElement = document.getElementById("dialog-root");

const Dialog = (props) => {
  const navigate = useNavigate();

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

          {props.type === "success" && (
            <React.Fragment>
              <Button
                color="pink"
                option="keep going."
                size="large"
                onClick={props.onDialogClose}
              />
              <Button
                color="teal"
                option="return to home"
                size="large"
                onClick={() => navigate("/main")}
              />
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
