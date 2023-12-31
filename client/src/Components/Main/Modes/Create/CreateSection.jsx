import React, { useContext } from "react";
import Selector from "../../../UI/Selector/Selector";
import Button from "../../../UI/Button/Button";
import ConfigContext from "../../../../store/config-context";

const CreateSection = (props) => {
  const { configs, updateConfigs, setActiveConfig } = useContext(ConfigContext);

  const clickHandler = (selection) => {
    if (selection === "writing") {
      updateConfigs({ ...configs, section: "writing" });
      setActiveConfig("questions");
    }

    if (selection === "reading") {
      updateConfigs({ ...configs, section: "reading" });
      setActiveConfig("questions");
    }
  };

  return (
    <Selector prompt="what section do you want to create for?">
      <Button
        color="pink"
        option="writing ✒️"
        size="large"
        onClick={() => clickHandler("writing")}
      />
      <Button
        color="teal"
        option="reading 📰"
        size="large"
        onClick={() => clickHandler("reading")}
      />
    </Selector>
  );
};

export default CreateSection;
