const express = require('express');
const router = express.Router();
const productsController = require("../controllers/categoriesController"); // Assuming productsController for consistency

// Route for adding a new product
router.post("/products", productsController.addNewProducts);

// Route for retrieving all products
router.get("/products", productsController.getAllProductsList);

// Route for updating a product by ID
router.put("/products", productsController.editProducts);

// Route for deleting a product by ID
router.delete("/products", productsController.deleteProductById);

// dropDown
router.get("/products/category", productsController.getAllProductCategory);


module.exports = router;
