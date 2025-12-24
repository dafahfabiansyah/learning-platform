import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function generateQuizQuestions(
  topic: string,
  type: 'MULTIPLE_CHOICE' | 'ESSAY' | 'MIXED',
  count: number,
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD'
) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = createPrompt(topic, type, count, difficulty);
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  return parseAIResponse(text, type);
}

function createPrompt(
  topic: string,
  type: string,
  count: number,
  difficulty?: string
): string {
  const difficultyText = difficulty ? `tingkat kesulitan ${difficulty.toLowerCase()}` : '';
  
  if (type === 'MULTIPLE_CHOICE') {
    return `Buatkan ${count} soal pilihan ganda tentang "${topic}" ${difficultyText}. 
Format JSON:
[
  {
    "question": "pertanyaan",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": "jawaban yang benar"
  }
]
Hanya berikan JSON array, tanpa penjelasan tambahan.`;
  }
  
  if (type === 'ESSAY') {
    return `Buatkan ${count} soal essay tentang "${topic}" ${difficultyText}. 
Format JSON:
[
  {
    "question": "pertanyaan essay",
    "correctAnswer": "poin-poin jawaban yang diharapkan"
  }
]
Hanya berikan JSON array, tanpa penjelasan tambahan.`;
  }
  
  // MIXED
  return `Buatkan ${count} soal campuran (pilihan ganda dan essay) tentang "${topic}" ${difficultyText}. 
Format JSON:
[
  {
    "question": "pertanyaan",
    "type": "MULTIPLE_CHOICE" atau "ESSAY",
    "options": ["A", "B", "C", "D"] (hanya untuk pilihan ganda),
    "correctAnswer": "jawaban yang benar"
  }
]
Hanya berikan JSON array, tanpa penjelasan tambahan.`;
}

function parseAIResponse(text: string, type: string): any[] {
  try {
    // Remove markdown code blocks if present
    const jsonText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const questions = JSON.parse(jsonText);
    
    // Normalize questions based on type
    return questions.map((q: any) => ({
      question: q.question,
      type: q.type || type,
      options: q.options || null,
      correctAnswer: q.correctAnswer,
    }));
  } catch (error) {
    throw new Error('Failed to parse AI response');
  }
}
