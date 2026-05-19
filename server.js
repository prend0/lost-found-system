const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());

// =====================
// BASIC TEST ROUTE
// =====================
app.get("/", (req, res) => {
  res.send("Lost & Found Server is running 🚀");
});

// =====================
// EMAIL TRANSPORTER
// =====================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "aretralostnfoundta@gmail.com",
    pass: "crdu rkma gwjt jvbd" // App Password (DO NOT use normal password)
  }
});

// Verify email connection on startup
transporter.verify((error) => {
  if (error) {
    console.log("❌ Email server error:", error);
  } else {
    console.log("✅ Email server ready");
  }
});

// =====================
// REPORT ENDPOINT
// =====================
app.post("/report", async (req, res) => {
  try {
    const { name, location, description } = req.body;

    // Validate input
    if (!name || !location || !description) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    console.log("📩 New report received:", req.body);

    // Send email
    await transporter.sendMail({
      from: `"Lost & Found System" <aretralostnfoundta@gmail.com>`,
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
        <div style="font-family: Arial; padding: 20px;">
          <h2 style="color:#2b6cb0;">New Lost & Found Report</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Location:</b> ${location}</p>
          <p><b>Description:</b> ${description}</p>
          <hr>
          <p style="font-size:12px;color:gray;">
            Automated Notification from Lost & Found System
          </p>
        </div>
      `
    });

    console.log("✅ Email sent successfully");

    return res.status(200).json({
      success: true,
      message: "Report received and email sent"
    });

  } catch (error) {
    console.error("❌ Error sending email:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send email"
    });
  }
});

// =====================
// START SERVER
// =====================
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});