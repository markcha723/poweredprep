import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useFieldValidator from "../../hooks/use-validator";
import Button from "../../Components/UI/Button/Button";
import classes from "./LoginPage.module.css";
import Header from "../../Components/Main/Header/Header";

const LoginPage = () => {
  // for now, this is just the design. not connected to the backend for auth yet.
  const {
    value: enteredUsername,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
  } = useFieldValidator((value) => value.trim() !== "");

  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useFieldValidator((value) => value.trim() !== "");

  const [formIsValid, setFormIsValid] = useState(false);
  const [signInError, setSignInError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (passwordIsValid && usernameIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  });

  // this should check with the backend and receive a token
  // if the user's login is successful.
  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      console.log("invalid form!");
      return;
    }
    if (enteredUsername === "admin" && enteredPassword === "12345") {
      setSignInError(false);
      navigate("/main");
    } else {
      setSignInError(true);
    }
  };

  return (
    <main className={classes.card}>
      <h1>login</h1>
      {signInError && (
        <p className={classes["error-text"]}>invalid credentials!</p>
      )}
      <form onSubmit={submitHandler} className={classes["login-form"]}>
        <label htmlFor="username">username</label>
        <input
          type="text"
          id="username"
          name="username"
          onBlur={usernameBlurHandler}
          onChange={usernameChangeHandler}
          value={enteredUsername}
        />
        {usernameHasError && (
          <p className={classes["error-text"]}>Name cannot be empty.</p>
        )}
        <label htmlFor="password">password</label>
        <input
          type="text"
          id="password"
          name="password"
          onBlur={passwordBlurHandler}
          onChange={passwordChangeHandler}
          value={enteredPassword}
        />
        {passwordHasError && (
          <p className={classes["error-text"]}>Password cannot be empty.</p>
        )}
        <div className={classes.options}>
          <Link to="/">go back</Link>
          <Button
            type="submit"
            size="medium"
            option="login"
            color="pink"
            disabled={!formIsValid}
          />
        </div>
      </form>
    </main>
  );
};

export default LoginPage;
