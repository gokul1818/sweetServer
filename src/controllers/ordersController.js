const Orders = require("../models/orders");

// Function to add a new carousel
exports.addOrders = async (req, res) => {
    const { products, userId, totalPrice, paymentsMethod, address } = req.body;

    if (!products || !userId || !totalPrice || !paymentsMethod || !address) {
        return res.status(400).json({ message: 'Invalid request' });
    }

    try {
        const newCarousel = new Orders({ products, userId, totalPrice, paymentsMethod, address });
        await newCarousel.save();
        res.status(201).json({ message: 'Orders successfully added' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Function to update an existing order
exports.updateOrder = async (req, res) => {
    const { id } = req.params; // Get the order ID from the request parameters
    const { products, userId, totalPrice, paymentsMethod, address } = req.body; // Extract order details from the request body

    if (!id || !products || !userId || !totalPrice || !paymentsMethod || !address) {
        return res.status(400).json({ message: 'Invalid request' });
    }

    try {
        const existingOrder = await Orders.findById(id); // Find the order by ID
        if (!existingOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Update the order details
        existingOrder.products = products;
        existingOrder.userId = userId;
        existingOrder.totalPrice = totalPrice;
        existingOrder.paymentsMethod = paymentsMethod;
        existingOrder.address = address;

        await existingOrder.save(); // Save the updated order
        res.status(200).json({ message: 'Order successfully updated' });
    } catch (error) {
        console.error('Error updating order:', error); // Log error for debugging
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// Function to get all orders for a specific user
exports.getOrders = async (req, res) => {
    const { userId } = req.params; // Get the user ID from the request parameters

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const orders = await Orders.find({ userId }); // Find orders for the specified user
        if (!orders.length) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }

        res.status(200).json(orders); // Return the list of orders
    } catch (error) {
        console.error('Error fetching orders:', error); // Log error for debugging
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

