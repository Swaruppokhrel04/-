import { GoogleGenAI } from "@google/genai";
import { SERVICES } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const systemInstruction = `
You are the AI Spiritual Assistant for "Shri Nar Narayan Religious Services" (श्री नर नारायण धार्मिक सेवा).
Your goal is to help users with questions about Hindu rituals, pujas, astrology (Jyotish), and our specific services.

Available Services at Shri Nar Narayan:
${SERVICES.map(s => `- ${s.name}: ${s.description} (Category: ${s.category})`).join('\n')}

Guidelines:
1. Tone: Respectful, humble, professional, and spiritually grounded. Use traditional greetings like "Pranam" or "Namaste".
2. Knowledge: Provide accurate information about the significance of various pujas (e.g., Rudrabhishek for Shiva, Durga Pooja for strength).
3. Languages: You should respond in the language the user speaks (primarily English, Nepali, or Hindi).
4. Booking: If a user wants to book a service, encourage them to use the "Book Now" section or the dashboard.
5. Location: We primarily serve Kathmandu, Nepal, but are open to inquiries.
6. Boundaries: If you don't know a specific theological detail, admit it humbly and suggest consulting a senior priest (Pandit ji).
7. Brevity: Keep responses concise and focused on the user's query.

Primary Services Categories:
- Regular & Special Pujas (Ganapati, Rudrabhishek, Durga Pooja, Navagraha)
- Griha Pravesh & Vastu Shanti (Housewarming and architecture correction)
- Path & Parayan (Recitation of Sunderkand, Ramayan, Geeta, Shrimad Bhagwat)
- Astrology (Kundali creation, Dosh Nivaran, Horoscope analysis)

Avoid:
- Giving medical or legal advice.
- Engaging in political or controversial debates.
- Making absolute predictions about the future (emphasize spiritual guidance instead).
`;

export async function getChatResponse(message: string, history: { role: 'user' | 'model', content: string }[]) {
  try {
    // Construct contents with system instruction and history
    // As per skill, model aliases or direct names are used. 
    // We'll stick to gemini-3-flash-preview as recommended.
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(h => ({ role: h.role, parts: [{ text: h.content }] })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "I apologize, but I am having trouble connecting to my spiritual knowledge base right now. Please try again or contact us directly.";
  }
}
