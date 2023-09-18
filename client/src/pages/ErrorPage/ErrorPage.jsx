import React from "react";
import { Link, useNavigate, useRouteError } from "react-router-dom";
import classes from "./ErrorPage.module.css";
import Button from "../../Components/UI/Button/Button";

const ErrorPage = () => {
  const navigate = useNavigate();
  const { message, sendTo, status, destinationText } = useRouteError();

  let typeMessage = "Oops!";
  let bodyMessage = "Looks like something went wrong.";
  let redirectDestination = "/main";

  if (status === 400) {
    typeMessage = "400 Error";
    bodyMessage = message;
    redirectDestination = sendTo;
  }

  const navigateToHomeHandler = () => {
    navigate("/main");
  };

  const navigateHandler = () => {
    navigate(redirectDestination);
  };

  return (
    <main className={classes["error-page"]}>
      <h1>{typeMessage}</h1>
      <p>{bodyMessage}</p>
      <Button
        color="pink"
        option="return to home"
        size="large"
        onClick={navigateToHomeHandler}
      />
      {redirectDestination !== "/main" ? (
        <Button
          color="teal"
          option={`go back to ${destinationText}`}
          size="large"
          onClick={navigateHandler}
        />
      ) : null}
    </main>
  );
};

export default ErrorPage;
