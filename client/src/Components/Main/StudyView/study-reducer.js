// reducer function for all question views BESIDES editor

const studyReducer = (state, action) => {
  switch (action.type) {
    case "CHOSEN_ANSWER_CHANGE":
      console.log(`you selected ${action.choice}`);
      const previousAnswers = state.questions[state.activeIndex].answerChoices;
      const updatedAnswers = previousAnswers.map((answer) => {
        if (answer.choiceLetter === action.choice) {
          return {
            ...answer,
            chosenByStudent: true,
          };
        } else {
          return {
            ...answer,
            chosenByStudent: false,
          };
        }
      });
      const updatedAnswerArray = state.questions.map((question, index) => {
        if (index === state.activeIndex) {
          return {
            ...question,
            answerChoices: updatedAnswers,
          };
        } else {
          return question;
        }
      });
      return {
        ...state,
        questions: updatedAnswerArray,
        activeQuestion: updatedAnswerArray[state.activeIndex],
      };
    case "INDEX_CHANGE": {
      return {
        ...state,
        activeQuestion: state.questions[action.index],
        activeIndex: action.index,
      };
    }
    case "HIGHLIGHT_WORD": {
      return {
        ...state,
        tooltipIsActive: true,
        tooltipXLoc: action.xLoc,
        tooltipYLoc: action.yLoc,
        highlightedWord: action.highlighted,
      };
    }
    case "UNHIGHLIGHT": {
      return {
        ...state,
        tooltipIsActive: false,
        tooltipXLoc: 0,
        tooltipYLoc: 0,
        highlightedWord: "",
      };
    }
  }
};

export default studyReducer;
