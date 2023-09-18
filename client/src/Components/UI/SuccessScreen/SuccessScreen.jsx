import React from "react";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

import classes from "../LoadingScreen/LoadingScreen.module.css";

const SuccessScreen = (props) => {
  const navigate = useNavigate();

  const navigateHomeHandler = () => {
    navigate("/main");
  };

  const navigateDashHandler = () => {
    navigate("/dashboard");
  };

  return (
    <div className={classes["loading-screen"]}>
      <p>your questions have been successfully uploaded.</p>
      <p>thank you for helping.</p>
      <Button
        size="medium"
        color="pink"
        option="go to home"
        onClick={navigateHomeHandler}
      />
      <Button
        size="medium"
        color="teal"
        option="go to dash"
        onClick={navigateDashHandler}
      />
    </div>
  );
};

export default SuccessScreen;
