require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const app = express();

app.use(cors());
app.use(express.json());

// =====================
// HEALTH CHECK
// =====================
app.get("/", (req, res) => {
  res.send("Lost & Found Server is running 🚀");
});

// =====================
// RESEND SETUP
// =====================
const resend = new Resend(process.env.RESEND_API_KEY);

// =====================
// REPORT ENDPOINT
// =====================
app.post("/report", async (req, res) => {
  try {
    const { name, location, description } = req.body;

    if (!name || !location || !description) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    console.log("📩 New report received:", req.body);

    const result = await resend.emails.send({
      from: "Lost & Found <onboarding@resend.dev>",
      to: [
        "adrianvesmin2@gmail.com",
        "macazo.386667@novaliches.sti.edu.ph",
        "acuna.385093@novaliches.sti.edu.ph",
        "forcadas.388049@novaliches.sti.edu.ph",
        "wales.385103@novaliches.sti.edu.ph",
        "melendez.399317@novaliches.sti.edu.ph",
        "piedad.385095@novaliches.sti.edu.ph",
        "garcia.416782@novaliches.sti.edu.ph",
        "huellas.385486@novaliches.sti.edu.ph",
        "pabilada.389207@novaliches.sti.edu.ph",
        "tubal.384863@novaliches.sti.edu.ph",
        "aralar.388650@novaliches.sti.edu.ph",
        "esmeres.385881@novaliches.sti.edu.ph",
        "gabilan.415071@novaliches.sti.edu.ph"
      ],
      subject: "🚨 New Lost & Found Report",
      html: `
        <h2>New Lost & Found Report</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Location:</b> ${location}</p>
        <p><b>Description:</b> ${description}</p>
      `,
    });

    console.log("✅ Email result:", result);

    res.status(200).json({
      success: true,
      message: "Report sent successfully",
    });

  } catch (error) {
    console.error("❌ Email error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
});

// =====================
// START SERVER
// =====================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
