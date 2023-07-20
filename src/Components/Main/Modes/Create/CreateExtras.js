import React, { useState, useRef } from "react";

import SubSelector from "../../../UI/SubSelector";
import Button from "../../../UI/Button";
import RadioButton from "../../../UI/RadioButton/RadioButton";
import classes from "./CreatePassages.module.css";

const CreateExtras = (props) => {
  const options = {
    optionName: "difficulty",
    optionOptions: ["varied", "easy", "medium", "hard"],
  };
  const vocabInput = useRef("");

  const [difficulty, setDifficulty] = useState([]);
  const [questionNum, setQuestionNum] = useState(5);
  const [vocabList, setVocabList] = useState([]);

  const parseVocabInput = () => {
    return vocabInput.current.value.split(",");
  };

  const submitHandler = () => {
    setVocabList(parseVocabInput());
    console.log(`difficulty: ${difficulty}`);
    console.log(`questionnum: ${questionNum}`);
    console.log(`vocab list: ${vocabList}`);
    console.log("clicked");
    props.updateConfigs({
      ...props.configs,
      difficulty: difficulty,
      numberOfQuestions: questionNum,
      wordsToUse: vocabList,
    });
    props.setActiveConfig("confirm");
  };

  return (
    <div className={classes["create-passages"]}>
      <p>what types of passages?</p>
      <div className={classes["multiple-selector"]}>
        <SubSelector
          configs={props.configs}
          selectedItems={difficulty}
          setSelectedItems={setDifficulty}
          optionName={options.optionName}
          optionOptions={options.optionOptions}
          key={options.optionName}
        />
        <div className={classes["sub-selector"]}>
          <p>number:</p>
          <ul>
            <RadioButton
              name="numberOfQuestions"
              setQuestionNum={setQuestionNum}
              value={5}
            />
            <RadioButton
              name="numberOfQuestions"
              value={10}
              setQuestionNum={setQuestionNum}
            />
            <RadioButton
              name="numberOfQuestions"
              setQuestionNum={setQuestionNum}
              value={15}
            />
          </ul>
        </div>
        <div className={classes["sub-selector"]}>
          <p>vocabulary:</p>
          <input
            className={classes["text-input"]}
            maxLength={50}
            type="text"
            ref={vocabInput}
            placeholder="words you'd like to practice reading?"
          />
        </div>
      </div>
      <Button size="large" onClick={submitHandler} option="next" color="teal" />
    </div>
  );
};

export default CreateExtras;
