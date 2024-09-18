const Cart = require("../models/cart");

// Function to add a new carousel
exports.addCart = async (req, res) => {
    const { cart, userId, totalPrice } = req.body;

    if (!cart || !userId) {
        return res.status(400).json({ message: 'Invalid request' });
    }

    try {
        const newCarousel = new Cart({ cart, userId, totalPrice });
        await newCarousel.save();
        res.status(201).json({ message: 'cart successfully added' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateCart = async (req, res) => {
    const { cart, userId, totalPrice } = req.body;

    if (!cart || !userId) {
        return res.status(400).json({ message: 'Invalid request' });
    }
    try {
        const existingCart = await Cart.findOne({ userId });
        if (existingCart) {
            existingCart.cart = cart;
            existingCart.userId = userId;
            existingCart.totalPrice = totalPrice;

            await existingCart.save();
            res.status(201).json({ message: 'cart successfully update' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// Function to get all carousels
exports.getCart = async (req, res) => {
    try {

        const { userId } = req.params
        console.log(userId)
        const cartList = await Cart.findOne({ userId });

        if (cartList.length === 0) {
            return res.status(404).json({ message: 'No cart found' });
        }

        res.status(200).json(cartList);
    } catch (error) {
        console.error('Error fetching cartList:', error); // Log error for debugging
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Function to delete a carousel by ID
exports.deleteCartById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }

    try {
        const deletedCarousel = await Cart.findOneAndDelete({ _id: id });

        if (!deletedCarousel) {
            return res.status(404).json({ message: 'Carousel not found' });
        }

        res.status(200).json({ message: 'Carousel successfully deleted' });
    } catch (error) {
        console.error('Error deleting carousel:', error); // Log error for debugging
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
