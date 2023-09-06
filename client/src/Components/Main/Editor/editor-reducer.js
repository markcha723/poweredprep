/* 
  editor reducer

  note that this should always return a state object of the following shape:
  {
    questions: Question[]
    activeQuestions: questions[activeIndex]
    activeIndex: number
    error: {
      exists: boolean
      message: null | string
    }
    isLoading: boolean
    isSending: boolean
    isEditing: boolean
  }
*/

const editorReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        questions: action.payload,
        activeQuestion: action.payload[0],
        activeIndex: 0,
        error: {
          exists: false,
          message: null,
        },
        isLoading: false,
        isEditing: false,
        isSending: false,
      };
    case "FETCH_ERROR":
      return {
        questions: [],
        activeQuestion: {},
        activeIndex: 0,
        error: {
          exists: true,
          message: action.payload,
        },
        isLoading: false,
        isEditing: false,
        isSending: false,
      };
    case "INDEX_CHANGE":
      return {
        ...state,
        activeQuestion: state.questions[action.index],
        activeIndex: action.index,
      };
    case "APPROVE_CHANGE":
      const updatedApproved = updateQuestionsByKey(
        state.questions,
        "approved",
        action.payload,
        state.activeIndex
      );
      return {
        ...state,
        questions: updatedApproved,
        activeQuestion: state.questions[state.activeIndex],
      };
    case "DIFFICULTY_CHANGE":
      const updatedDifficulty = updateQuestionsByKey(
        state.questions,
        "difficulty",
        action.payload,
        state.activeIndex
      );
      return {
        ...state,
        questions: updatedDifficulty,
        activeQuestion: state.questions[state.activeIndex],
      };
    case "EDIT_OPEN":
      return {
        ...state,
        isEditing: true,
      };
    case "EDIT_CLOSE":
      return {
        ...state,
        isEditing: false,
      };
    case "QUESTION_BODY_CHANGE":
      const questionBodyUpdated = updateQuestionsByKey(
        state.questions,
        "body",
        action.payload,
        state.activeIndex
      );
      return {
        ...state,
        questions: questionBodyUpdated,
        activeQuestion: questionBodyUpdated[state.activeIndex],
      };
    case "PROMPT_CHANGE":
      const promptBodyUpdated = updateQuestionsByKey(
        state.questions,
        "question",
        action.payload,
        state.activeIndex
      );
      return {
        ...state,
        questions: promptBodyUpdated,
        activeQuestion: promptBodyUpdated[state.activeIndex],
      };
    case "CORRECT_ANSWER_CHANGE":
      const correctAnswerUpdated = state.questions.map((question, index) => {
        if (index === state.activeIndex) {
          console.log(question);
          const tempAnswerArray = question.answerChoices.map((answer) => {
            answer.choiceLetter === action.payload
              ? {
                  ...answer,
                  correct: true,
                }
              : {
                  ...answer,
                  correct: false,
                };
          });
          return {
            ...question,
            answerChoices: tempAnswerArray,
          };
        } else {
          return question;
        }
      });
      return {
        ...state,
        questions: correctAnswerUpdated,
        activeQuestion: state.questions[state.activeIndex],
      };
    case "ANSWER_TEXT_CHANGE":
      return {
        ...state,
        questions: correctAnswerUpdated,
        activeQuestion: correctAnswerUpdated[state.activeIndex],
      };
  }
};

const updateQuestionsByKey = (questionsArray, key, payload, activeIndex) => {
  const updatedQuestions = questionsArray.map((question, index) => {
    if (index === activeIndex) {
      return {
        ...question,
        [key]: payload,
      };
    } else {
      return question;
    }
  });
  return updatedQuestions;
};

export default editorReducer;
