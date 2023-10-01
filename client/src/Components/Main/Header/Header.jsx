import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Button from "../../UI/Button/Button";
import classes from "./Header.module.css";
import buttonClasses from "../../UI/Button/Button.module.css";

const Header = (props) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  let navigationOptions = <p>placeholder</p>;
  if (pathname === "/" || pathname === "/login" || pathname === "/sample") {
    navigationOptions = (
      <React.Fragment>
        <Button
          onClick={props.onDialogOpen}
          option="about"
          color="pink"
          size="small"
        />
        <Link to="/login">login</Link>
      </React.Fragment>
    );
  }

  return (
    <header className={classes.header}>
      <div className={classes.logo} onClick={() => navigate("/")}>
        <span>powered prep</span>
        <span>✨</span>
      </div>
      <nav className={classes["header-nav"]}>{navigationOptions}</nav>
    </header>
  );
};

export default Header;
