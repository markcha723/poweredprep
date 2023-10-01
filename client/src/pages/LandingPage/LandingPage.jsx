import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./LandingPage.module.css";

const LandingPage = (props) => {
  return (
    <section className={`${classes.container} ${classes.section}`}>
      <h1>welcome to poweredprep</h1>
      <h2>your standardized test prep assistant</h2>
      <div className={classes.description}>
        <p>poweredprep is a GPT-assisted test preparation application.</p>
        <p>
          this tool is <b>currently private.</b> please inquire with the admin
          if you would like to try it.
        </p>
        <p>
          students and teachers can <Link to="/login">login here</Link>
        </p>
        <p>
          unregistered users can <Link to="/sample">take a sample exam.</Link>
        </p>
      </div>
    </section>
  );
};

export default LandingPage;
