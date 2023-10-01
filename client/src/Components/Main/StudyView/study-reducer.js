// reducer function for all question views BESIDES editor

const studyReducer = (state, action) => {
  switch (action.type) {
    case "LOADING_FINISH": {
      return {
        ...state,
        isLoading: false,
      };
    }
    case "CHOSEN_ANSWER_CHANGE":
      const updatedChoiceArray = state.chosenAnswers.map((answer, index) => {
        if (index === state.activeIndex) {
          return action.choice;
        } else {
          return answer;
        }
      });
      const isAnyAnswersNull = updatedChoiceArray.some((item) => item === null);
      return {
        ...state,
        isEveryQuestionAnswered: !isAnyAnswersNull,
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
    case "DIALOG_OPEN": {
      return {
        ...state,
        isDialogOpen: true,
      };
    }
    case "DIALOG_CLOSE": {
      return {
        ...state,
        isDialogOpen: false,
      };
    }
    case "GRADE": {
      return {
        ...state,
        isGrading: true,
      };
    }
    /* 
      note that this one should be rewritten once it's hooked up properly
      with a backend.
    */
    case "FETCH_ANSWERS_SUCCESS": {
      return {
        ...state,
        isGrading: false,
        isDialogOpen: false,
        isReviewing: true,
        correctAnswers: state.questions.map((question) => {
          for (const answerChoice of question.answerChoices) {
            if (answerChoice.correct) {
              return answerChoice.choiceLetter;
            } else {
              continue;
            }
          }
        }),
      };
    }
    case "FINISH_REVIEW": {
      return { ...state, isFinished: true };
    }
  }
};

export default studyReducer;
