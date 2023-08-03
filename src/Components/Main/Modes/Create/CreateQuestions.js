import React, { useContext } from "react";
import Selector from "../../../UI/Selector";
import Button from "../../../UI/Button";
import ConfigContext from "../../../../store/config-context";

const CreateQuestions = (props) => {
  const { configs, updateConfigs, setActiveConfig } = useContext(ConfigContext);

  const readingQuestionTypes = [
    "explicit meaning",
    "main idea",
    "purpose",
    "words in context",
    "inference",
    "organization",
  ];
  const writingQuestionTypes = [
    "supporting detail",
    "YYNN",
    "punctuation",
    "parallelism",
    "modifiers",
    "verbs",
    "word choice",
    "organization",
  ];

  const renderButtonsFor = (section) => {
    switch (section) {
      case "writing":
        return (
          <React.Fragment>
            {writingQuestionTypes.map((type) => (
              <Button
                option={type}
                onClick={() => questionTypeHandler(type)}
                size="for-options"
                key={type}
              />
            ))}
          </React.Fragment>
        );
      case "reading":
        return (
          <React.Fragment>
            {readingQuestionTypes.map((type) => (
              <Button
                option={type}
                onClick={() => questionTypeHandler(type)}
                size="for-options"
                key={type}
              />
            ))}
          </React.Fragment>
        );
    }
  };

  const questionTypeHandler = (selection) => {
    updateConfigs({ ...configs, questionTypes: selection });
    setActiveConfig("passages");
  };

  return (
    <Selector prompt="what question type?" buttonGrid={true}>
      {renderButtonsFor(configs.section)}
    </Selector>
  );
};

export default CreateQuestions;
