import { GoogleGenerativeAI } from '@google/generative-ai';

// Use VITE_ prefix for environment variables in Vite
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyARKphv14LmPj38G-3YmNfLWuwoTo9hMIU'; // Replace with actual key for testing only
const genAI = new GoogleGenerativeAI(apiKey);

export async function getAIResponse(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    return 'Sorry, I couldn\'t respond right now.';
  }
}