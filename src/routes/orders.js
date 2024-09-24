const express = require('express');
const router = express.Router();
const ordersController = require("../controllers/ordersController");

router.post("/orders", ordersController.addOrders);
router.get("/orders", ordersController.getOrders);
router.put("/orders", ordersController.updateOrder);

module.exports = router;
