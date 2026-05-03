import { GoogleGenAI } from "@google/genai";
import { SERVICES, PUJA_SCHEDULE, AUSPICIOUS_DATES, CONTACT_INFO } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const systemInstruction = `
You are the AI Spiritual Assistant for "Shri Nar Narayan Religious Services" (श्री नर नारायण धार्मिक सेवा).
Your goal is to help users with questions about Hindu rituals, pujas, astrology (Jyotish), and our specific services.

Available Services at Shri Nar Narayan:
${SERVICES.map(s => `- ${s.name}: ${s.description} (Deity: ${s.deity || 'Various'}, Duration: ${s.duration || 'Flexible'}, Category: ${s.category})`).join('\n')}

Daily & Weekly Holy Schedule:
${PUJA_SCHEDULE.map(p => `- ${p.day} at ${p.time}: ${p.title} - ${p.description}`).join('\n')}

Upcoming Auspicious Dates (2026):
${Object.entries(AUSPICIOUS_DATES).map(([date, info]) => `- ${date}: ${info.label} (${info.type})`).join('\n')}

Contact & Location Information:
- Address: ${CONTACT_INFO.address}
- Phone: ${CONTACT_INFO.displayPhone}
- WhatsApp: ${CONTACT_INFO.whatsapp}

Guidelines:
1. Tone: Respectful, humble, professional, and spiritually grounded. Use traditional greetings like "Pranam" or "Namaste".
2. Knowledge: Provide accurate information about the significance of various pujas. Explain WHY someone might need a specific ritual.
3. Languages: You should respond in the language the user speaks (English, Nepali, or Hindi).
4. Booking: If a user wants to book a service, encourage them to use the "Book Now" section. Mention push notification updates.
5. Location: We are based in Rupandehi, Nepal.
6. Boundaries: If you don't know a detail, suggest consulting a senior priest (Pandit ji).
7. Brevity: Keep responses concise.

Avoid:
- Giving medical/legal advice.
- Politics.
- Absolute predictions.
`;

export async function getChatResponse(message: string, history: { role: 'user' | 'model', content: string }[]) {
  try {
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
