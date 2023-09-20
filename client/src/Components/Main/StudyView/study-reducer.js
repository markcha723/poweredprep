// reducer function for all question views BESIDES editor

const studyReducer = (state, action) => {
  switch (action.type) {
    case "CHOSEN_ANSWER_CHANGE":
      console.log(`you selected ${action.payload}`);
      return state;
  }
};

export default studyReducer;
