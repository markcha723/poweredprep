import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./Main.module.css";

import Selector from "../../Components/UI/Selector/Selector";
import Button from "../../Components/UI/Button/Button";

/* 
A wrapper component for the main interactive elements of the application. 
*/
const Main = (props) => {
  const navigate = useNavigate();

  const navigateHandler = (route) => {
    navigate(route);
  };

  return (
    <div className={classes.main}>
      <Selector
        isCentered={true}
        prompt="what would you like to work on today?"
      >
        <Button
          color="pink"
          option="study 📚"
          size="large"
          onClick={() => navigateHandler("/main/study")}
        />
        <Button
          color="teal"
          option="generate 🤖"
          size="large"
          onClick={() => navigateHandler("/main/create")}
        />
        <Button
          color="pink"
          option="write ✍️"
          size="large"
          onClick={() => navigateHandler("/main/write")}
        />
      </Selector>
    </div>
  );
};

export default Main;
