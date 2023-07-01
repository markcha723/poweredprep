import React, { useState } from "react";

import classes from "./Main.module.css";

import Splash from "./Splash/Splash";
import Create from "./Modes/Create/Create";
/* 
A wrapper component for the main interactive elements of the application. 
*/
const Main = (props) => {
  const [activeState, setActiveState] = useState("splash");

  const modeHandler = (modeSelection) => {
    if (modeSelection === "study") {
      setActiveState("study");
    }
    if (modeSelection === "create") {
      setActiveState("create");
    }
  };

  return (
    <div className={classes.main}>
      {activeState === "splash" && <Splash onSelect={modeHandler} />}
      {activeState === "create" && <Create />}
      {activeState === "study" && <div>wip</div>}
    </div>
  );
};

export default Main;
