import React from "react";
import { useLocation } from "react-router-dom";
import MagnifyingGlassSVG from "../../../icons/magnifyingglass";
import classes from "./TextSelectionTooltip.module.css";

const TextSelectionTooltip = (props) => {
  const location = useLocation();
  const { selectedWord, active, dispatch, lookedUpWords } = props;

  if (!active) {
    return <div className={classes.tooltip} />;
  }

  /* 
    sends a request to dictionaryapi.dev when user presses the button to fetch the word.
    if it fails, it deselects the word and displays a message in word bank.
    if it succeeds, it dispatches an action to update the word bank. 
  */
  const searchWordHandler = async () => {
    if (lookedUpWords.some((element) => element.word === selectedWord)) {
      dispatch({
        type: "DICTIONARY_API_FETCH_FAIL",
        message: `You already looked up the word ${selectedWord}.`,
      });
    } else {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${selectedWord}`
      );
      if (!response.ok) {
        dispatch({
          type: "DICTIONARY_API_FETCH_FAIL",
          message:
            response.status === 404
              ? "No entries exist for that word."
              : "Something went wrong.",
        });
      } else {
        const data = await response.json();
        console.log(data);
        const parsedWordDefinitions = {
          word: data[0].word,
          meanings: data[0].meanings.map((meaning) => {
            let firstDefinitionsOnly = [];
            for (let i = 0; i < 2; i++) {
              if (meaning.definitions[i] === undefined) {
              } else {
                firstDefinitionsOnly.push(meaning.definitions[i]);
              }
            }
            return {
              partOfSpeech: meaning.partOfSpeech,
              definitions: firstDefinitionsOnly,
            };
          }),
        };
        dispatch({
          type: "DICTIONARY_API_FETCH_SUCCESS",
          word: parsedWordDefinitions,
        });
      }
    }
  };

  const placeHolderHandler = () => {
    console.log("placeholding!");
  };

  return (
    <div
      className={`${classes.tooltip} ${classes.active}`}
      style={{ top: props.yLocation, left: props.xLocation }}
    >
      <div className={classes["icons-div"]}>
        <MagnifyingGlassSVG
          className={classes.icon}
          onClick={searchWordHandler}
        />
      </div>
      <div className={classes.arrow}></div>
    </div>
  );
};

export default TextSelectionTooltip;
