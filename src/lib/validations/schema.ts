import { z } from 'zod';

// Auth validations
export const registerSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter').max(50),
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
});

export const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(1, 'Password wajib diisi'),
});

// Quiz validations
export const questionSchema = z.object({
  question: z.string().min(5, 'Pertanyaan minimal 5 karakter'),
  type: z.enum(['MULTIPLE_CHOICE', 'ESSAY', 'MIXED']),
  options: z.array(z.string()).optional(),
  correctAnswer: z.string().min(1, 'Jawaban benar wajib diisi'),
});

export const createQuizSchema = z.object({
  title: z.string().min(3, 'Judul minimal 3 karakter').max(100),
  description: z.string().max(500).optional().nullable(),
  questions: z.array(questionSchema).min(1, 'Minimal 1 pertanyaan'),
});

export const updateQuizSchema = createQuizSchema.partial();

// AI Generate validations
export const generateQuizSchema = z.object({
  topic: z.string().min(3, 'Topik minimal 3 karakter').max(200),
  type: z.enum(['MULTIPLE_CHOICE', 'ESSAY', 'MIXED']),
  questionCount: z.number().min(1).max(20),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).optional(),
});

// Quiz attempt validations
export const submitAttemptSchema = z.object({
  quizId: z.string(),
  answers: z.array(
    z.object({
      questionId: z.string(),
      answer: z.string(),
    })
  ),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateQuizInput = z.infer<typeof createQuizSchema>;
export type UpdateQuizInput = z.infer<typeof updateQuizSchema>;
export type GenerateQuizInput = z.infer<typeof generateQuizSchema>;
export type SubmitAttemptInput = z.infer<typeof submitAttemptSchema>;
