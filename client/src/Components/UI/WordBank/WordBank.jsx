import React, { useContext } from "react";
import StudyContext from "../../../store/study-context";
import classes from "./WordBank.module.css";

const WordBank = (props) => {
  const { state, dispatch } = useContext(StudyContext);
  const { lookedUpWords, wordSearchError, activeIndex } = state;

  if (lookedUpWords.length === 0) {
    return <div></div>;
  }

  return (
    <aside className={classes.container}>
      <span className={classes.title}>
        word bank <span>question {activeIndex + 1} </span>
      </span>
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

  /* 
    maps word meanings to the following HTML:
    <h6> part of speech <h6>
    <p> definition one <p>
    <p> definition two <p>
  */
  const mappedMeanings = meanings.map((meaning) => {
    console.log(meaning);
    return (
      <React.Fragment>
        <h6
          className={classes["part-of-speech"]}
          key={`${word}-${meaning.partOfSpeech}`}
        >
          {meaning.partOfSpeech}
        </h6>
        {meaning.definitions.map(({ definition }) => {
          return <p>-{definition}</p>;
        })}
      </React.Fragment>
    );
  });

  /* 
    the structure of the returned component is
    <li>
      <h5>
      <h6>
      <p>
      <p>
    <li>
  */
  return (
    <li className={classes["bank-item"]} key={wordKey}>
      <h5 className={classes.word}>{word}</h5>
      {mappedMeanings}
    </li>
  );
};

export default WordBank;
