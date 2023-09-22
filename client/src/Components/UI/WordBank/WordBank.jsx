import React, { useContext } from "react";
import StudyContext from "../../../store/study-context";
import classes from "./WordBank.module.css";

const WordBank = (props) => {
  const { state } = useContext(StudyContext);
  const { lookedUpWords, wordSearchError, activeIndex } = state;
  const activeWordBank = lookedUpWords[activeIndex];

  // evaluates what the word bank should display.
  // if there are no words searched, it displays a tip.
  // else it displays the words in the order they were searched.
  let wordBankContent;
  if (activeWordBank.length === 0) {
    wordBankContent = (
      <div>
        <p>you can look up words that you highlight.</p>
      </div>
    );
  } else {
    wordBankContent = activeWordBank.map((word, index) => {
      return (
        <WordBankItem
          word={word.word}
          meanings={word.meanings}
          key={`${index}-${word.word}`}
          wordKey={`${index}-${word.word}`}
        />
      );
    });
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
        {wordBankContent}
        <div id="overflow-anchor" key="overflow-anchor"></div>
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
    return (
      <React.Fragment>
        <h6 className={classes["part-of-speech"]}>{meaning.partOfSpeech}</h6>
        {meaning.definitions.map(({ definition }, index) => {
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
    <li className={classes["bank-item"]} key={`li-${wordKey}`}>
      <h5 className={classes.word}>{word}</h5>
      {mappedMeanings}
    </li>
  );
};

export default WordBank;
