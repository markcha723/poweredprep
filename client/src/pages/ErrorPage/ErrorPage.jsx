import React from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./ErrorPage.module.css";
import Button from "../../Components/UI/Button/Button";

const ErrorPage = (props) => {
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate("/main");
  };

  return (
    <main className={classes["error-page"]}>
      <h1>Oops!</h1>
      <p>Looks like there was an error.</p>
      <Button
        color="pink"
        option="return to home"
        size="large"
        onClick={navigateHandler}
      />
    </main>
  );
};

export default ErrorPage;
