const express = require("express");
const { sendMail } = require("../controllers/sendMailController");

const router = express.Router();

// Define the email route
router.post("/send-email", sendMail);

module.exports = router;
