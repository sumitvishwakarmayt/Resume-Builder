
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateResumeContent = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 1,
        topK: 1,
        maxOutputTokens: 2048,
      }
    });
    return response.text;
  } catch (error) {
    console.error('Error generating content from Gemini API:', error);
    throw new Error('Failed to generate content. Please try again.');
  }
};
