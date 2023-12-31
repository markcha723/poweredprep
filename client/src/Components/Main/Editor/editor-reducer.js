import {
  topicOptions,
  styleOptions,
} from "../../../hooks/use-config-validator";
import { blankQuestion } from "./BlankEditor";

/* 
  editor reducer
  currently consumed in both Editor.jsx and BlankEditor.jsx.
*/

const editorReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        questions: action.payload,
        activeQuestion: action.payload[0],
        questionErrors: evaluateAllQuestionsForErrors(action.payload),
        activeIndex: 0,
        error: {
          exists: false,
          message: null,
        },
        isLoading: false,
        isEditing: false,
        isSending: false,
        isSuccessfullySaved: null,
      };
    case "FETCH_ERROR":
      return {
        questions: [],
        activeQuestion: {},
        questionErrors: [],
        activeIndex: 0,
        error: {
          exists: true,
          message: action.payload,
        },
        isLoading: false,
        isEditing: false,
        isSending: false,
        isSuccessfullySaved: null,
      };
    case "LOADING_ON":
      return {
        ...state,
        isLoading: true,
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
      const check = evaluateActiveQuestionForErrors(
        state.questions[state.activeIndex]
      );

      if (check.exists) {
        return {
          ...state,
          questionErrors: state.questionErrors.map((item, index) => {
            if (index === state.activeIndex) {
              return check;
            } else {
              return item;
            }
          }),
        };
      }
      return {
        ...state,
        isEditing: false,
        questionErrors: state.questionErrors.map((item, index) => {
          if (index === state.activeIndex) {
            return check;
          } else {
            return item;
          }
        }),
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
        questionErrors: evaluateAllQuestionsForErrors(questionBodyUpdated),
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
        questionErrors: evaluateAllQuestionsForErrors(promptBodyUpdated),
      };
    case "CORRECT_ANSWER_CHANGE":
      const previousCorrectAnswers =
        state.questions[state.activeIndex].answerChoices;
      const updatedCorrectAnswers = previousCorrectAnswers.map((answer) => {
        if (answer.choiceLetter === action.payload) {
          return {
            ...answer,
            correct: true,
          };
        } else {
          return {
            ...answer,
            correct: false,
          };
        }
      });
      const updatedAnswerArray = state.questions.map((question, index) => {
        if (index === state.activeIndex) {
          return {
            ...question,
            answerChoices: updatedCorrectAnswers,
          };
        } else {
          return question;
        }
      });
      return {
        ...state,
        questions: updatedAnswerArray,
        activeQuestion: updatedAnswerArray[state.activeIndex],
        questionErrors: evaluateAllQuestionsForErrors(updatedAnswerArray),
      };
    case "ANSWER_TEXT_CHANGE":
      const previousAnswerTexts =
        state.questions[state.activeIndex].answerChoices;
      const updatedAnswerTexts = previousAnswerTexts.map((answer) => {
        if (answer.choiceLetter === action.payload.letter) {
          return {
            ...answer,
            choiceText: action.payload.text,
          };
        } else {
          return answer;
        }
      });
      const updatedAnswerTextArray = state.questions.map((question, index) => {
        if (index === state.activeIndex) {
          return {
            ...question,
            answerChoices: updatedAnswerTexts,
          };
        } else {
          return question;
        }
      });
      return {
        ...state,
        questions: updatedAnswerTextArray,
        activeQuestion: updatedAnswerTextArray[state.activeIndex],
        questionErrors: evaluateAllQuestionsForErrors(updatedAnswerTextArray),
      };
    case "SUCCESSFUL_SAVE":
      return {
        ...state,
        isSuccessfullySaved: action.payload,
      };
    case "SUBJECT_CHANGE":
      const subjectUpdated = updateQuestionsByKey(
        state.questions,
        "subject",
        action.payload,
        state.activeIndex
      );
      return {
        ...state,
        questions: subjectUpdated,
        activeQuestion: subjectUpdated[state.activeIndex],
        questionErrors: state.questionErrors.map((item, index) => {
          if (index === state.activeIndex) {
            return evaluateActiveQuestionForErrors(
              subjectUpdated[state.activeIndex]
            );
          } else {
            return item;
          }
        }),
      };
    case "STYLE_CHANGE":
      const styleUpdated = updateQuestionsByKey(
        state.questions,
        "style",
        action.payload,
        state.activeIndex
      );
      return {
        ...state,
        questions: styleUpdated,
        activeQuestion: styleUpdated[state.activeIndex],
        questionErrors: state.questionErrors.map((item, index) => {
          if (index === state.activeIndex) {
            return evaluateActiveQuestionForErrors(
              styleUpdated[state.activeIndex]
            );
          } else {
            return item;
          }
        }),
      };
    case "OPEN_DIALOG":
      return {
        ...state,
        isDialogOpen: true,
        dialogType: action.payload.type,
        dialogMessage: action.payload.message,
      };
    case "CLOSE_DIALOG":
      return {
        ...state,
        isDialogOpen: false,
        dialogType: "",
        dialogMessage: "",
      };
    case "DELETE":
      const deletedArray = state.questions.filter(
        (question, index) => action.payload !== index
      );
      let newIndex;
      if (action.payload === 0) {
        newIndex = 0;
      } else if (action.payload === state.questions.length - 1) {
        newIndex = deletedArray.length - 1;
      } else {
        newIndex = action.payload;
      }
      return {
        ...state,
        questions: deletedArray,
        activeIndex: newIndex,
        activeQuestion: deletedArray[newIndex],
        questionErrors: evaluateAllQuestionsForErrors(deletedArray),
      };
    case "ADD_QUESTION":
      const addedArray = [...state.questions, blankQuestion];
      return {
        ...state,
        questions: addedArray,
        activeIndex: addedArray.length - 1,
        activeQuestion: addedArray[addedArray.length - 1],
        questionErrors: evaluateAllQuestionsForErrors(addedArray),
      };
    // notifies user AND initializes the form
    case "POST_SUCCESS":
      return {
        questions: [blankQuestion],
        activeQuestion: blankQuestion,
        questionErrors: evaluateAllQuestionsForErrors([blankQuestion]),
        activeIndex: 0,
        isSending: false,
        error: {
          exists: false,
          message: null,
        },
        isDialogOpen: true,
        dialogType: "success",
        dialogMessage: action.payload.message,
        isEditing: true,
      };
  }
};

const evaluateActiveQuestionForErrors = (activeQuestion) => {
  const { body, question, answerChoices, difficulty, subject, style } =
    activeQuestion;

  const evaluatedBody = body.length <= 300 || body.length >= 2500;
  const evaluatedPrompt = question.length <= 10;
  const evaluatedChoiceAText = !answerChoices[0].choiceText.length > 0;
  const evaluatedChoiceBText = !answerChoices[1].choiceText.length > 0;
  const evaluatedChoiceCText = !answerChoices[2].choiceText.length > 0;
  const evaluatedChoiceDText = !answerChoices[3].choiceText.length > 0;
  const evaluatedSelectedAnswer = !answerChoices.some(
    (choice) => choice.correct === true
  );
  const evaluatedDifficulty = difficulty === null;
  const evaluatedSubject = !topicOptions.includes(subject);
  const evaluatedStyle = !styleOptions.includes(style);
  const inferredExistence =
    evaluatedBody ||
    evaluatedPrompt ||
    evaluatedChoiceAText ||
    evaluatedChoiceBText ||
    evaluatedChoiceCText ||
    evaluatedChoiceDText ||
    evaluatedSelectedAnswer ||
    evaluatedDifficulty ||
    evaluatedSubject ||
    evaluatedStyle;

  return {
    exists: inferredExistence,
    body: evaluatedBody,
    prompt: evaluatedPrompt,
    choiceAText: evaluatedChoiceAText,
    choiceBText: evaluatedChoiceBText,
    choiceCText: evaluatedChoiceCText,
    choiceDText: evaluatedChoiceDText,
    difficulty: evaluatedDifficulty,
    subject: evaluatedSubject,
    style: evaluatedStyle,
    selectedAnswer: evaluatedSelectedAnswer,
  };
};

export const evaluateAllQuestionsForErrors = (questions) => {
  const evaluationResults = questions.map((question) =>
    evaluateActiveQuestionForErrors(question)
  );
  return evaluationResults || [];
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
