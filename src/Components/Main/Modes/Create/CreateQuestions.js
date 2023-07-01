import React from "react";
import Selector from "../../../UI/Selector";
import Button from "../../../UI/Button";

const CreateQuestions = (props) => {
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
    props.updateConfigs({ ...props.configs, questionTypes: selection });
    props.setActiveConfig("passages");
  };

  return (
    <Selector prompt="what question type?" buttonGrid={true}>
      {renderButtonsFor(props.configs.section)}
    </Selector>
  );
};

export default CreateQuestions;
