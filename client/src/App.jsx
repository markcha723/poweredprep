import React, { useState, useEffect } from "react";
import "./index.css";

import About from "./Components/Main/About/About";
import Header from "./Components/Main/Header/Header";
import Main from "./Components/Main/Main";

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dummyData, setDummyData] = useState();

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => setDummyData(data));
  }, []);

  useEffect(() => {
    fetch("/questions/")
      .then((response) => response.json())
      .then((data) => setDummyData(data));
  }, []);

  useEffect(() => {
    fetch("/questions/64cff4d0e70a7a1add546a9b")
      .then((response) => response.json())
      .then((data) => setDummyData(data));
  }, []);

  const dialogCloseHandler = () => {
    setIsDialogOpen(false);
  };

  const dialogOpenHandler = () => {
    setIsDialogOpen(true);
  };

  return (
    <div className="main-container">
      {isDialogOpen && <About onDialogClose={dialogCloseHandler}></About>}
      <Header onDialogOpen={dialogOpenHandler} />
      <Main />
    </div>
  );
}

export default App;
