type QuizType = 'multiple-choice' | 'true-false' | 'short-answer';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: QuizType;
  options: string[] | null;
  correctAnswer: string;
  quizId: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string | null;
  creatorId: string;
  source: string;
  createdAt: Date;
  updatedAt: Date;
  questions: QuizQuestion[];
}

export interface QuizAttemptAnswer {
  questionId: string;
  answer: string;
  isCorrect: boolean;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  totalQuestions: number;
  completedAt: Date;
  answers: QuizAttemptAnswer[];
}
