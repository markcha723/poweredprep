import React, { useState } from "react";
import About from "../../Components/Main/About/About";
import Header from "../../Components/Main/Header/Header";
import { Outlet } from "react-router-dom";

const RootLayout = (props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const dialogCloseHandler = () => {
    setIsDialogOpen(false);
  };

  const dialogOpenHandler = () => {
    setIsDialogOpen(true);
  };

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        height: "100vh",
      }}
    >
      {isDialogOpen && <About onDialogClose={dialogCloseHandler}></About>}
      <Header onDialogOpen={dialogOpenHandler} />
      <Outlet />
    </main>
  );
};

export default RootLayout;
