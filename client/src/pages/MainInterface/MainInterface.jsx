import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import classes from "./MainInterface.module.css";

import About from "../../Components/Main/About/About";
import Header from "../../Components/Main/Header/Header";
import Main from "../ModeSelectionPage/Main";

const MainInterface = (props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const dialogCloseHandler = () => {
    setIsDialogOpen(false);
  };

  const dialogOpenHandler = () => {
    setIsDialogOpen(true);
  };

  return (
    <div className={classes["main-container"]}>
      {isDialogOpen && <About onDialogClose={dialogCloseHandler}></About>}
      <Header onDialogOpen={dialogOpenHandler} />
      <Outlet />
    </div>
  );
};

export default MainInterface;
