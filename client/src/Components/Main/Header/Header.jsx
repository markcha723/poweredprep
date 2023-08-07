import React from "react";

import Button from "../../UI/Button/Button";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <span>powered prep</span>
        <span>✨</span>
      </div>
      <Button
        onClick={props.onDialogOpen}
        option="about"
        color="pink"
        size="small"
      ></Button>
    </header>
  );
};

export default Header;
