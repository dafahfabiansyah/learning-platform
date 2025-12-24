export function calculateScore(
  totalQuestions: number,
  correctAnswers: number
): number {
  return Math.round((correctAnswers / totalQuestions) * 100);
}

export function gradeEssay(
  userAnswer: string,
  correctAnswer: string
): { isCorrect: boolean; similarity: number } {
  // Simple grading based on keyword matching
  // Bisa diperbaiki dengan AI atau algoritma lebih canggih
  const keywords = correctAnswer.toLowerCase().split(/\s+/);
  const userWords = userAnswer.toLowerCase().split(/\s+/);
  
  const matchedKeywords = keywords.filter((keyword) =>
    userWords.some((word) => word.includes(keyword) || keyword.includes(word))
  );
  
  const similarity = (matchedKeywords.length / keywords.length) * 100;
  const isCorrect = similarity >= 60; // 60% threshold
  
  return { isCorrect, similarity };
}

export function validateMultipleChoice(
  userAnswer: string,
  correctAnswer: string
): boolean {
  return userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
}
