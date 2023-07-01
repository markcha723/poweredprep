import React from "react";
import Selector from "../../../UI/Selector";
import Button from "../../../UI/Button";

const CreateSection = (props) => {
  const writingHandler = () => {
    props.updateConfigs({ ...props.configs, section: "writing" });
    props.setActiveConfig("questions");
  };

  const readingHandler = () => {
    props.updateConfigs({ ...props.configs, section: "reading" });
    props.setActiveConfig("questions");
  };

  return (
    <Selector prompt="what section do you want to create for?">
      <Button
        color="pink"
        option="writing ✒️"
        size="large"
        onClick={writingHandler}
      />
      <Button
        color="teal"
        option="reading 📰"
        size="large"
        onClick={readingHandler}
      />
    </Selector>
  );
};

export default CreateSection;
