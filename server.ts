import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

// For CJS compatibility when compiled by esbuild
const _filename = typeof __filename !== "undefined" ? __filename : "";
const _dirname = typeof __dirname !== "undefined" ? __dirname : "";

// Initialize Gemini lazily to avoid startup crashes
let aiInstance: GoogleGenAI | null = null;
const getAi = () => {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY is not defined in environment variables");
      return null;
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
};

// In-memory cache for daily news
let dailyNewsCache: { date: string; content: any } | null = null;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Stripe secret key initialization
  let stripe: Stripe | null = null;
  const getStripe = () => {
    if (!stripe && process.env.STRIPE_SECRET_KEY) {
      stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2025-01-27-acacia" as any,
      });
    }
    return stripe;
  };

  // API Routes
  app.post("/api/create-checkout-session", async (req, res) => {
    try {
      const { serviceId, serviceName, amount, currency = "npr" } = req.body;
      const stripeClient = getStripe();

      if (!stripeClient) {
        // Return a mock success response if Stripe is not configured
        // This allows the UI to work even without keys
        return res.json({ 
          id: "mock_session_" + Date.now(),
          url: null,
          isMock: true 
        });
      }

      const session = await stripeClient.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency,
              product_data: {
                name: serviceName,
                description: `Vedic Service: ${serviceName}`,
              },
              unit_amount: amount * 100, // Stripe expects cents
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/#services`,
      });

      res.json({ id: session.id, url: session.url });
    } catch (error: any) {
      console.error("Stripe Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/news", async (req, res) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      // Return cached news if it's from the same day
      if (dailyNewsCache && dailyNewsCache.date === today) {
        return res.json(dailyNewsCache.content);
      }

      const fallbackNews = {
        date: today,
        en: {
          title: "Auspicious Solar Alignment and Vedic Wisdom Celebration",
          summary: "Today brings an uplifting alignment of celestial bodies, encouraging deep contemplation, spiritual reflection, and harmonious connections.",
          body: "As the celestial bodies move in their sacred alignment today, a peaceful and inspiring spiritual frequency is felt throughout our community. The astrologers and acharyas at Shree Nara Narayana have observed a highly beneficial cosmic state, perfect for starting new learning, participating in puja rituals, and strengthening family bonds. This special configuration reminds us of the profound truth in ancient Vedic manuscripts—that a balanced life filled with gratitude and service leads to ultimate fulfillment.\n\nNow is a prime time to dedicate yourself to self-reflection and the study of traditional texts. Acts of selfless help, of offering food and fresh water, and of practicing meditative mindfulness will bring deep mental clarity and heart-warming cosmic satisfaction. Let today be a steady step forward in your personal and spiritual journey.",
          tip: "Begin your morning with simple sun salutations (Surya Namaskar) or deep breathing exercises (Pranayama) to center yourself and welcome the positive day.",
          highlight: "The harmonious placement of Jupiter inspires wisdom and gentle speech, allowing for positive family interactions and clearance of internal hurdles."
        },
        ne: {
          title: "शुभ सौर्य संरेखण र वैदिक ज्ञानको उत्सव",
          summary: "आजको दिनले ग्रहहरूको अत्यन्तै लाभदायक संरेखण ल्याएको छ, जसले आध्यात्मिक चिन्तन, आत्म-अनुशासन र शान्त ध्यानलाई प्रोत्साहन गर्दछ।",
          body: "आज जब खगोलीय पिण्डहरू आफ्नो पवित्र संरेखणमा छन्, पृथ्वीभरि एक शान्त आध्यात्मिक ऊर्जा प्रवाहित भइरहेको छ। श्री नर नारायणका पुजारीहरूले विश्वव्यापी शान्ति र कल्याणको लागि विशेष प्रार्थना र वैदिक मन्त्रोच्चारण सुरु गरेका छन्। ज्योतिषीहरूका अनुसार आजको चन्द्रमा र वृहस्पतिको शुभ दृष्टिले मानसिक स्पष्टता, बुद्धि र प्रिय बोलीको विकास गर्न मद्दत गर्नेछ।\n\nयो दिन आत्म-चिन्तन र शास्त्रीय ज्ञानको अध्ययनका लागि उत्तम छ। दान कार्यमा संलग्न हुनु वा सरल मन्त्रहरूको जप गर्नाले गहिरो मानसिक शान्ति प्राप्त हुन्छ। आजको वातावरणमा सकारात्मक तरंगहरू व्याप्त छन् जसले भावनात्मक र शारीरिक स्वास्थ्यलाई सबल बनाउँछ।",
          tip: "आजको सुरुवात सूर्य नमस्कार वा केही मिनेटको मौन ध्यानबाट गर्नुहोस, जसले तपाईंको दिनलाई ऊर्जावान र उद्देश्यपूर्ण बनाउनेछ।",
          highlight: "बृहस्पतिको शुभ प्रभावले मानसिक स्पष्टता र आध्यात्मिक विकास ल्याउनेछ, जसले बाधाहरू हटाउन र सम्बन्धहरूलाई सुमधुर बनाउन मद्दत गर्दछ।"
        },
        hi: {
          title: "शुभ सूर्य संरेखण और वैदिक ज्ञान का उत्सव",
          summary: "आज का दिन ग्रहों का अत्यंत लाभकारी संरेखण लेकर आया है, जो आध्यात्मिक चिंतन, आत्म-अनुशासन और शांत ध्यान को प्रोत्साहित करता है।",
          body: "आज जब खगोलीय पिंड अपने पवित्र संरेखण में हैं, पृथ्वी भर में एक शांत आध्यात्मिक ऊर्जा प्रवाहित हो रही है। श्री नर नारायण के पुजारियों ने वैश्विक शांति और कल्याण के लिए विशेष प्रार्थनाओं और वैदिक मंत्रोच्चारण की शुरुआत की है। ज्योतिषियों के अनुसार, आज वृहस्पति और चंद्रमा की युति से उत्पन्न शुभ प्रभाव मानसिक स्पष्टता, बुद्धि और प्रिय वाणी का विकास करने में सहायक होगा।\n\nयह दिन आत्म-चिंतन और शास्त्रीय ज्ञान के अध्ययन के लिए सर्वोत्तम है। परोपकार के कार्यों में संलग्न होना या सरल मंत्रों का जप करना गहरी मानसिक शांति प्रदान करता है। आज के वातावरण में सकारात्मक तरंगें व्याप्त हैं जो भावनात्मक और शारीरिक स्वास्थ्य को सबल बनाती हैं।",
          tip: "आज की शुरुआत सूर्य नमस्कार या कुछ मिनटों के मौन ध्यान से करें, जिससे आपका दिन ऊर्जावान और उद्देश्यपूर्ण बनेगा।",
          highlight: "बृहस्पति का शुभ प्रभाव मानसिक स्पष्टता और आध्यात्मिक विकास लाएगा, जो बाधाओं को दूर करने और रिश्तों को अधिक सार्थक बनाने में मदद करेगा।"
        }
      };

      const ai = getAi();
      if (!ai) {
        console.warn("Gemini API is not configured. Using high-quality offline fallback news response.");
        dailyNewsCache = { date: today, content: fallbackNews };
        return res.json(fallbackNews);
      }

      const prompt = `Generate a realistic, high-quality, and spiritually uplifting "Daily News" article for a Vedic Astrology and Religious Services platform named "Shree Nara Narayana". 
      The article should be relevant to Sanatana Dharma, Vedic wisdom, astrology, or planetary alignments for today (${today}).
      Include:
      1. A catchy headline.
      2. A brief summary.
      3. The main article body (3-4 paragraphs).
      4. A "Spiritual Tip of the Day".
      5. A "Planetary Highlight" (e.g., something about Jupiter, Saturn, or Rahu/Ketu).
      
      Language: English, but provide translations for Nepali and Hindi as well in the same JSON response.
      Respond ONLY with a JSON object following this schema:
      {
        "date": "string",
        "en": { "title": "string", "summary": "string", "body": "string", "tip": "string", "highlight": "string" },
        "ne": { "title": "string", "summary": "string", "body": "string", "tip": "string", "highlight": "string" },
        "hi": { "title": "string", "summary": "string", "body": "string", "tip": "string", "highlight": "string" }
      }`;

      try {
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                date: { type: Type.STRING },
                en: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    summary: { type: Type.STRING },
                    body: { type: Type.STRING },
                    tip: { type: Type.STRING },
                    highlight: { type: Type.STRING }
                  },
                  required: ["title", "summary", "body", "tip", "highlight"]
                },
                ne: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    summary: { type: Type.STRING },
                    body: { type: Type.STRING },
                    tip: { type: Type.STRING },
                    highlight: { type: Type.STRING }
                  },
                  required: ["title", "summary", "body", "tip", "highlight"]
                },
                hi: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    summary: { type: Type.STRING },
                    body: { type: Type.STRING },
                    tip: { type: Type.STRING },
                    highlight: { type: Type.STRING }
                  },
                  required: ["title", "summary", "body", "tip", "highlight"]
                }
              },
              required: ["date", "en", "ne", "hi"]
            }
          }
        });

        const newsContent = JSON.parse(response.text);
        dailyNewsCache = {
          date: today,
          content: newsContent
        };

        return res.json(newsContent);
      } catch (genError) {
        console.error("Gemini Generation Error, falling back to offline content:", genError);
        dailyNewsCache = { date: today, content: fallbackNews };
        return res.json(fallbackNews);
      }
    } catch (error: any) {
      console.error("General News Route Error:", error);
      res.status(500).json({ 
        error: "Failed to load daily news",
        details: error.message 
      });
    }
  });

  app.post("/api/book", (req, res) => {
    res.json({ success: true });
  });

  app.post("/api/contact", (req, res) => {
    res.json({ success: true });
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      const ai = getAi();
      if (!ai) {
        return res.json({ response: "Namaste! I am your Astro-helper at Shree Nara Narayana. For personalized astrology or pujas, please feel free to book a session through our website." });
      }

      const formattedContents = [];
      if (history && Array.isArray(history)) {
        for (const turn of history) {
          formattedContents.push({
            role: turn.role,
            parts: [{ text: turn.content }]
          });
        }
      }
      formattedContents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const systemInstruction = `You are a helpful, knowledgeable, and polite Vedic Astrologer, Hindu Priest, and Spiritual Guide for 'Shree Nara Narayana' temple and astrological services. 
      Help the user with questions regarding Sanatana Dharma, Pujas, astrological concepts, auspicious timings (Muhurat), and services offered.
      Keep your replies warm, respectful, informative, and relatively concise. Offer or suggest booking a puja or consult if relevant.`;

      const aiResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction,
        }
      });

      res.json({ response: aiResponse.text?.trim() });
    } catch (error: any) {
      console.error("Chat API error:", error);
      res.status(500).json({ response: "Namaste! I am currently taking standard queries. Please try again soon." });
    }
  });

  app.post("/api/panchang", async (req, res) => {
    try {
      const { date, location } = req.body;
      const ai = getAi();
      const fallbackPanchang = {
        tithi: "Ekadashi",
        nakshatra: "Rohini",
        yoga: "Harshana",
        karana: "Bava",
        paksha: "Shukla Paksha",
        masam: "Jyeshtha",
        sunrise: "05:15 AM",
        sunset: "06:45 PM",
        rahuKaal: "01:30 PM - 03:00 PM",
        gulikaKaal: "09:00 AM - 10:30 AM",
        abhijitMuhurat: "11:45 AM - 12:35 PM",
        meaning: "Ekadashi is highly auspicious for fasting, meditation, and spiritual energy, especially associated with Lord Vishnu."
      };

      if (!ai) {
        return res.json(fallbackPanchang);
      }

      const prompt = `Calculate and provide highly realistic and authentic Vedic Panchang details for the date: ${date} at location: ${location}.
      Respond ONLY with a JSON object containing the following keys matching the schema:
      {
        "tithi": "string (e.g. Dwadashi, Ekadashi etc.)",
        "nakshatra": "string (e.g. Rohini, Ashwini etc.)",
        "yoga": "string",
        "karana": "string",
        "paksha": "string (Shukla Paksha or Krishna Paksha)",
        "masam": "string (Hindu Month e.g., Jyeshtha, Ashadha)",
        "sunrise": "string (e.g., '05:22 AM')",
        "sunset": "string (e.g., '06:51 PM')",
        "rahuKaal": "string (e.g., '01:30 PM - 03:00 PM')",
        "gulikaKaal": "string (e.g., '09:00 AM - 10:30 AM')",
        "abhijitMuhurat": "string (e.g., '11:50 AM - 12:40 PM')",
        "meaning": "string (A beautiful 1-2 sentence description explaining the spiritual importance and auspicious characteristics of this tithi and nakshatra combination)"
      }`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              tithi: { type: Type.STRING },
              nakshatra: { type: Type.STRING },
              yoga: { type: Type.STRING },
              karana: { type: Type.STRING },
              paksha: { type: Type.STRING },
              masam: { type: Type.STRING },
              sunrise: { type: Type.STRING },
              sunset: { type: Type.STRING },
              rahuKaal: { type: Type.STRING },
              gulikaKaal: { type: Type.STRING },
              abhijitMuhurat: { type: Type.STRING },
              meaning: { type: Type.STRING }
            },
            required: [
              "tithi", "nakshatra", "yoga", "karana", "paksha", "masam",
              "sunrise", "sunset", "rahuKaal", "gulikaKaal", "abhijitMuhurat", "meaning"
            ]
          }
        }
      });

      const data = JSON.parse(response.text?.trim() || "{}");
      res.json(data);
    } catch (error) {
      console.error("Panchang API error:", error);
      res.status(500).json({ error: "Failed to load panchang data" });
    }
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
