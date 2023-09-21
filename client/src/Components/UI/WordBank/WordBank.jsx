import React, { useContext } from "react";
import StudyContext from "../../../store/study-context";
import classes from "./WordBank.module.css";

const WordBank = (props) => {
  const { state, dispatch } = useContext(StudyContext);
  const { lookedUpWords, wordSearchError } = state;

  if (lookedUpWords.length === 0) {
    return <div></div>;
  }

  return (
    <aside className={classes.container}>
      <span className={classes.title}>word bank</span>
      <div
        className={`${classes["error-notice"]} ${
          wordSearchError.length > 0 ? classes["visible-parts-of-error"] : ""
        }`}
      >
        {wordSearchError.length > 0 ? <span>{wordSearchError}</span> : ""}
      </div>
      <ul className={classes.bank}>
        {lookedUpWords.map((word, index) => {
          return (
            <WordBankItem
              word={word.word}
              meanings={word.meanings}
              wordKey={`${index}-${word.word}`}
            />
          );
        })}
      </ul>
    </aside>
  );
};

const WordBankItem = (props) => {
  const { word, meanings, wordKey } = props;

  return (
    <li className={classes["bank-item"]} key={wordKey}>
      <h5 className={classes.word}>{word}</h5>
      {meanings.map((meaning) => {
        return (
          <h6
            className={classes["part-of-speech"]}
            key={`${word}-${meaning.partOfSpeech}`}
          >
            {meaning.partOfSpeech}
          </h6>
        );
      })}
    </li>
  );
};

export default WordBank;
