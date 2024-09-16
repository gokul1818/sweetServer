const express = require('express');
const router = express.Router();
const carouselController = require("../controllers/carouselController"); // Assuming productsController for consistency

router.post("/carousel", carouselController.addNewProducts);
router.get("/carousel", carouselController.getAllProductsList);
router.delete("/carousel", carouselController.deleteProductById);

module.exports = router;
    