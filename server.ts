import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
