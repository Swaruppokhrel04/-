import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Gemini
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

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

      res.json(newsContent);
    } catch (error: any) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Failed to generate daily news" });
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
