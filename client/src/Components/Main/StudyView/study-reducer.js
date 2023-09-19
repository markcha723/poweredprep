// reducer function for all question views BESIDES editor

const studyReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE":
      return {
        ...state,
        questions: action.payload,
        activeQuestion: action.payload[state.activeIndex],
      };
  }
};

export default studyReducer;
