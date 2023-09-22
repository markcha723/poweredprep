// reducer function for all question views BESIDES editor

const studyReducer = (state, action) => {
  switch (action.type) {
    case "CHOSEN_ANSWER_CHANGE":
      const updatedChoiceArray = state.chosenAnswers.map((answer, index) => {
        if (index === state.activeIndex) {
          return action.choice;
        } else {
          return answer;
        }
      });
      return {
        ...state,
        chosenAnswers: updatedChoiceArray,
      };
    case "INDEX_CHANGE": {
      return {
        ...state,
        activeQuestion: state.questions[action.index],
        activeIndex: action.index,
        tooltipIsActive: false,
        tooltipXLoc: 0,
        tooltipYLoc: 0,
        highlightedWord: "",
        wordSearchError: "",
      };
    }
    case "HIGHLIGHT_WORD": {
      return {
        ...state,
        tooltipIsActive: true,
        tooltipXLoc: action.xLoc,
        tooltipYLoc: action.yLoc,
        highlightedWord: action.highlightedWord,
      };
    }
    case "UNHIGHLIGHT": {
      return {
        ...state,
        tooltipIsActive: false,
        tooltipXLoc: 0,
        tooltipYLoc: 0,
        highlightedWord: "",
        wordSearchError: "",
      };
    }
    case "DICTIONARY_API_FETCH_SUCCESS": {
      const updatedLookedUpWords = state.lookedUpWords.map(
        (arrayOfWords, index) => {
          if (index === state.activeIndex) {
            return [...arrayOfWords, action.word];
          } else {
            return arrayOfWords;
          }
        }
      );
      return {
        ...state,
        lookedUpWords: updatedLookedUpWords,
        tooltipIsActive: false,
        tooltipXLoc: 0,
        tooltipYLoc: 0,
        highlightedWord: "",
        wordSearchError: "",
      };
    }
    case "DICTIONARY_API_FETCH_FAIL": {
      return {
        ...state,
        tooltipIsActive: false,
        tooltipXLoc: 0,
        tooltipYLoc: 0,
        highlightedWord: "",
        wordSearchError: action.message,
      };
    }
  }
};

export default studyReducer;
