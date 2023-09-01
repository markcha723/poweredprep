export interface QuestionConfigurations {
  requestType: string;
  section: string;
  questionTypes: string;
  passageTopics: string[];
  passageStyles: string[];
  numberOfQuestions: 5 | 10 | 15;
  difficulty: string[];
  wordsToUse: string[];
}

export interface GptPrompt {
  system: string;
  userPrompt: string;
}

export interface GptCompletion {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string | null;
    };
    finish_reason: string;
  }[];
  usage?:
    | {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
      }
    | undefined;
}

export interface Question {
  body: string;
  question: string;
  answerChoices: AnswerChoices;
  section: string;
  difficulty: string;
  subject: string;
  style: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  fromGptCompletionId?: string;
}

export interface Answer {
  choiceLetter: string;
  choiceText: string;
  correct: boolean;
  _id?: string;
}

export interface AnswerChoices extends Array<Answer> {}
