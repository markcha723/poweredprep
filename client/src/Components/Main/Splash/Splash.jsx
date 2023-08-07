import React from "react";

import Selector from "../../UI/Selector/Selector";
import Button from "../../UI/Button/Button";

const Splash = (props) => {
  const selectStudyHandler = () => {
    props.onSelect("study");
  };

  const selectCreateHandler = () => {
    props.onSelect("create");
  };

  return (
    <Selector isCentered={true} prompt="what would you like to work on today?">
      <Button
        color="pink"
        option="study 📚"
        size="large"
        onClick={selectStudyHandler}
      />
      <Button
        color="teal"
        option="create ✍️"
        size="large"
        onClick={selectCreateHandler}
      />
    </Selector>
  );
};

export default Splash;
