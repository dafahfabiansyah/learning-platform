import { create } from 'zustand';

type QuizType = 'multiple-choice' | 'true-false' | 'short-answer';

interface Question {
  id?: string;
  question: string;
  type: QuizType;
  options?: string[];
  correctAnswer: string;
}

interface QuizState {
  title: string;
  description: string | null;
  questions: Question[];
  isGenerating: boolean;
  setTitle: (title: string) => void;
  setDescription: (description: string | null) => void;
  addQuestion: (question: Question) => void;
  updateQuestion: (index: number, question: Question) => void;
  removeQuestion: (index: number) => void;
  setQuestions: (questions: Question[]) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  reset: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  title: '',
  description: null,
  questions: [],
  isGenerating: false,
  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
  addQuestion: (question) =>
    set((state) => ({ questions: [...state.questions, question] })),
  updateQuestion: (index, question) =>
    set((state) => ({
      questions: state.questions.map((q, i) => (i === index ? question : q)),
    })),
  removeQuestion: (index) =>
    set((state) => ({
      questions: state.questions.filter((_, i) => i !== index),
    })),
  setQuestions: (questions) => set({ questions }),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  reset: () =>
    set({
      title: '',
      description: null,
      questions: [],
      isGenerating: false,
    }),
}));
