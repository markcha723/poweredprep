import React, { useContext } from "react";
import StudyContext from "../../../store/study-context";
import classes from "./WordBank.module.css";

const WordBank = (props) => {
  const { state, dispatch } = useContext(StudyContext);
  const { lookedUpWords } = state;

  if (lookedUpWords.length === 0) {
    return <div></div>;
  }

  return (
    <aside className={classes.container}>
      <span className={classes.title}>word bank</span>
      <ul className={classes.bank}>
        {lookedUpWords.map((word, index) => {
          return (
            <li key={`${word.word}-${index}`} className={classes["bank-item"]}>
              <span className={classes.word}>{word.word}</span>
              <span className={classes.definition}>{word.definition}</span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default WordBank;
