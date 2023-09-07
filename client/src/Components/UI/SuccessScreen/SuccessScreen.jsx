import React from "react";
import Button from "../Button/Button";

import classes from "../LoadingScreen/LoadingScreen.module.css";

const SuccessScreen = (props) => {
  return (
    <div className={classes["loading-screen"]}>
      <p>your questions have been successfully uploaded.</p>
      <p>thank you for helping.</p>
      <Button
        size="medium"
        color="pink"
        option="go to home"
        onClick={() => window.location.reload()}
      />
    </div>
  );
};

export default SuccessScreen;
