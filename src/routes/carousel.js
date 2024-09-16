const express = require('express');
const router = express.Router();
const carouselController = require("../controllers/carouselController"); // Assuming productsController for consistency

router.post("/carousel", carouselController.addNewCarousel);
router.get("/carousel", carouselController.getAllCarousel);
router.delete("/carousel", carouselController.deleteCarouselById);

module.exports = router;
    