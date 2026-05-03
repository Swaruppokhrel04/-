import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { createServer as createViteServer } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import admin from "firebase-admin";
import fs from "node:fs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SERVICES, PUJA_SCHEDULE, AUSPICIOUS_DATES, CONTACT_INFO } from "./src/constants.ts";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

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

// Initialize Firebase Admin lazily
let firebaseAdminApp: admin.app.App | null = null;
const getFirebaseAdmin = () => {
  if (firebaseAdminApp) return firebaseAdminApp;

  const firebaseConfigPath = path.join(process.cwd(), "firebase-applet-config.json");
  if (fs.existsSync(firebaseConfigPath)) {
    try {
      const firebaseConfig = JSON.parse(fs.readFileSync(firebaseConfigPath, "utf-8"));
      firebaseAdminApp = admin.initializeApp({
        projectId: firebaseConfig.projectId,
      });
      console.log("Firebase Admin initialized");
    } catch (error) {
      console.error("Error initializing Firebase Admin:", error);
    }
  }
  return firebaseAdminApp;
};

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  const PORT = 3000;

  // Simple message storage (in-memory for demo)
  const messages: any[] = [];

  app.use(express.json());

  // Function to send push notification
  const sendPushNotification = async (userId: string, title: string, body: string) => {
    const adminApp = getFirebaseAdmin();
    if (!adminApp) return;

    try {
      const userRef = admin.firestore().collection("users").doc(userId);
      const userDoc = await userRef.get();
      
      if (!userDoc.exists) return;
      
      const tokens = userDoc.data()?.fcmTokens || [];
      if (tokens.length === 0) return;

      const message = {
        notification: {
          title,
          body,
        },
        tokens,
      };

      const response = await admin.messaging().sendEachForMulticast(message);
      console.log("Push notifications status:", response.successCount, "success,", response.failureCount, "failure");
    } catch (error) {
      console.error("Error sending push notification:", error);
    }
  };

  // Nodemailer transporter (lazy initialization)
  let transporter: nodemailer.Transporter | null = null;

  const getTransporter = async () => {
    if (transporter) return transporter;

    // Use environment variables if available
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      // Fallback for demo: use a test account
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      console.log("Demo: Use this URL to view sent emails:", nodemailer.getTestMessageUrl({} as any));
    }
    return transporter;
  };

  app.post("/api/book", async (req, res) => {
    const { fullName, email, phone, pujaType, date, location, message, userId } = req.body;
    
    console.log("New Booking Received:", req.body);

    try {
      const mailTransporter = await getTransporter();
      
      const info = await mailTransporter.sendMail({
        from: '"Shree Nar Narayan Religious Service" <noreply@shreenarnarayan.com>',
        to: email,
        subject: `Booking Confirmation - ${pujaType}`,
        text: `Pranam ${fullName},\n\nYour booking for ${pujaType} on ${date} has been received.\nLocation: ${location}\n\nWe will contact you soon at ${phone}.\n\nThank you,\nShree Nar Narayan Service`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #800000; text-align: center;">Booking Confirmation</h2>
            <p>Pranam <strong>${fullName}</strong>,</p>
            <p>Your booking for <strong>${pujaType}</strong> has been successfully received.</p>
            <div style="background: #fdf6e3; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 5px 0;"><strong>Date:</strong> ${date}</p>
              <p style="margin: 5px 0;"><strong>Location:</strong> ${location}</p>
              <p style="margin: 5px 0;"><strong>Service:</strong> ${pujaType}</p>
            </div>
            <p>We will contact you soon at <strong>${phone}</strong> to discuss further details.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 0.8em; color: #666; text-align: center;">ॐ सर्वे भवन्तु सुखिनः</p>
          </div>
        `,
      });

      if (process.env.NODE_ENV !== "production") {
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      }

      // Send Push Notification if userId is provided
      if (userId) {
        await sendPushNotification(
          userId,
          "Booking Confirmed!",
          `Pranam ${fullName}, your booking for ${pujaType} on ${date} is received.`
        );
      }

      res.json({ success: true, booking: req.body });
    } catch (error) {
      console.error("Email error:", error);
      // Still return success but log the error if email fails (or return error if critical)
      res.status(500).json({ success: false, error: "Failed to send confirmation email" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    const { name, email, subject, message } = req.body;
    
    console.log("Contact Message Received:", req.body);

    try {
      const mailTransporter = await getTransporter();
      
      const info = await mailTransporter.sendMail({
        from: `"${name}" <${email}>`,
        to: "pokhrelswarupji@gmail.com", // Admin email
        subject: `Contact Form: ${subject}`,
        text: `New contact message from ${name} (${email}):\n\nSubject: ${subject}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #800000; text-align: center;">New Contact Message</h2>
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <div style="background: #fdf6e3; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 0.8em; color: #666; text-align: center;">Sent from Shri Nar Narayan Contact Form</p>
          </div>
        `,
      });

      if (process.env.NODE_ENV !== "production") {
        console.log("Contact email sent: %s", info.messageId);
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Contact email error:", error);
      res.status(500).json({ success: false, error: "Failed to send message" });
    }
  });

  app.post("/api/newsletter", (req, res) => {
    const { email } = req.body;
    if (!email || !email.includes("@")) {
      return res.status(400).json({ success: false, error: "कृपया मान्य ईमेल ठेगाना राख्नुहोस्।" });
    }
    console.log("Newsletter subscription:", email);
    res.json({ success: true, message: "तपाईंको ईमेल सफलतापूर्वक दर्ता भयो!" });
  });

  app.post("/api/chat", async (req, res) => {
    const { message, history } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "Gemini API key not configured on server" });
    }

    try {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: systemInstruction
      });

      const result = await model.generateContent({
        contents: [
          ...history.map((h: any) => ({ role: h.role, parts: [{ text: h.content }] })),
          { role: 'user', parts: [{ text: message }] }
        ],
        generationConfig: {
          temperature: 0.7,
        }
      });

      const responseText = result.response.text();
      res.json({ response: responseText });
    } catch (error) {
      console.error("Gemini AI Error:", error);
      res.status(500).json({ error: "I apologize, but I am having trouble connecting to my spiritual knowledge base right now." });
    }
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Send existing messages to the newly connected user
    socket.emit("previous_messages", messages);

    socket.on("send_message", (data) => {
      const newMessage = {
        ...data,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
      };
      messages.push(newMessage);
      
      // Keep only last 50 messages
      if (messages.length > 50) messages.shift();

      // Broadcast to all clients
      io.emit("receive_message", newMessage);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
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

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
