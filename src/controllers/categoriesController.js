const { Categories, CategoriesList } = require("../models/categories")

exports.addNewProducts = async (req, res) => {


    const { productName, price, offerPrice, quantity, description, images, offersAvailable, isStock, category } = req.body
    try {
        const existProductName = await Categories.findOne({ productName })
        if (existProductName) {
            return res.status(400).json({ message: 'product already taken' });
        }
        // Create a new user
        const categories = new Categories({ productName, price, offerPrice, quantity, description, images, offersAvailable, isStock, category    });
        await categories.save();
        res.status(200).json({ message: 'product successfully added' });

    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });

    }
}


exports.getAllProductsList = async (req, res) => {


    try {
        const products = await Categories.find({});

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });

    }
}

exports.editProducts = async (req, res) => {
    const { productName, price, offerPrice, quantity, offersAvailable, description, images, id, isStock ,category} = req.body;

    if (!id) {
        return res.status(400).json({ message: 'Product Id is required' });
    }

    try {
        // Check if product exists
        const existingProduct = await Categories.findOne({ id });

        if (existingProduct) {
            console.log(existingProduct)
            // Update the existing product
            existingProduct.productName = productName;
            existingProduct.price = price;
            existingProduct.offerPrice = offerPrice;
            existingProduct.quantity = quantity;
            existingProduct.description = description;
            existingProduct.images = images;
            existingProduct.offersAvailable = offersAvailable
            existingProduct.isStock = isStock,
            existingProduct.category = category,

            await existingProduct.save();
            res.status(200).json({ message: 'Product successfully updated' });
        } else {
            // Create a new product
            const newProduct = new Categories({ productName, price, offerPrice, quantity, description, images, offersAvailable, isStock });
            await newProduct.save();
            res.status(201).json({ message: 'Product successfully created' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}


exports.deleteProductById = async (req, res) => {
    const { id } = req.body;
    console.log(id)
    if (!id) {
        return res.status(400).json({ message: 'Product ID is required' });
    }

    try {
        const deletedProduct = await Categories.findOneAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product successfully deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.getAllProductCategory = async (req, res) => {


    try {
        const products = await CategoriesList.find({});

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });

    }
}

