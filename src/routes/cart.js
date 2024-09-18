const express = require('express');
const router = express.Router();
const cartController = require("../controllers/cartController"); // Assuming productsController for consistency

// Route for adding a new product
router.post("/cart", cartController.addCart);

// Route for retrieving all products
router.get("/cart/:userId", cartController.getCart);

// Route for updating a product by updateCart
router.put("/cart", cartController.updateCart);

// Route for deleting a product by ID
router.delete("/cart", cartController.deleteCartById);



module.exports = router;
