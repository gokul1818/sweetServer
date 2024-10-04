const express = require('express');
const router = express.Router();
const webhookController = require("../controllers/webhookController"); // Assuming productsController for consistency

router.post("/webhook", webhookController.webhook);
router.get("/webhook", webhookController.webhookData);


module.exports = router;
