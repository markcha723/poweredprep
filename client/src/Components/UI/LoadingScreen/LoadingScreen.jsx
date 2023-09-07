import React from "react";
import Button from "../Button/Button";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import classes from "./LoadingScreen.module.css";

/* 
  component expects the following information via props 
  (note that this should be primarily used in a component that has the following states, such as Editor.jsx):
  isLoading: boolean -> determines whether the screen should display, and what it displays
  error: {exists: boolean, message: string} -> determines whether the screen displays an error
  dispatch: function -> takes in an object with a type key, allowing this component to be controlled by a parent's reducer
*/
const LoadingScreen = (props) => {
  const { isLoading, error, dispatch } = props;

  let content = <p>this should not be visible.</p>;

  const testFunction = () => {
    dispatch({ type: "LOADING_ON" });
    props.retryFunction();
  };

  if (error.exists) {
    let messageContent = (
      <React.Fragment>
        <p>something went wrong.</p>
        <p>please choose one:</p>
      </React.Fragment>
    );

    if (isLoading) {
      messageContent = (
        <React.Fragment>
          <LoadingSpinner size="large" />
          <p>retrying...</p>
        </React.Fragment>
      );
    }

    content = (
      <React.Fragment>
        {messageContent}
        <div className={classes["error-options"]}>
          <Button
            size="medium"
            color="grey"
            option="go back"
            onClick={() => console.log("clicked go back")}
            disabled={isLoading}
          />
          <Button
            size="medium"
            color="pink"
            option="retry"
            onClick={testFunction}
            disabled={isLoading}
          />
        </div>
      </React.Fragment>
    );
  } else {
    content = (
      <React.Fragment>
        <LoadingSpinner size="large" />
        <p>generating...</p>
        <p>please wait warmly.</p>
      </React.Fragment>
    );
  }

  return <div className={classes["loading-screen"]}>{content}</div>;
};

export default LoadingScreen;
