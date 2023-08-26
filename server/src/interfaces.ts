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
