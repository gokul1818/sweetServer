const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables

// Create a transporter using SMTP or your email service provider
const transporter = nodemailer.createTransport({
    service: "gmail", // You can use "Outlook", "Yahoo", or other providers
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email app password
    },
});

// Function to send an email
exports.sendMail = async (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email, // Sender's email
        to: "gokulakrishnan.developer18@gmail.com", // Recipient (your email)
        subject: `New Contact from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        console.error("Email sending failed:", error);
        res.status(500).json({ success: false, message: "Error sending email" });
    }
};
