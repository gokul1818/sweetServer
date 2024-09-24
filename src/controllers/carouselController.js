const Carousel = require("../models/carousel");

// Function to add a new carousel
exports.addNewCarousel = async (req, res) => {
    const { image } = req.body;

    // Validate image structure
    if (!image || typeof image.url !== 'string' || typeof image.redirection !== 'string') {
        return res.status(400).json({ message: 'Invalid input: image must include url and redirection properties' });
    }

    try {
        const newCarousel = new Carousel({ image });
        await newCarousel.save();
        res.status(201).json({ message: 'Carousel successfully added' });
    } catch (error) {
        console.error('Error adding carousel:', error); // Log error for debugging
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Function to get all carousels
exports.getAllCarousel = async (req, res) => {
    try {
        const carousels = await Carousel.find({});

        if (carousels.length === 0) {
            return res.status(404).json({ message: 'No carousels found' });
        }

        res.status(200).json(carousels);
    } catch (error) {
        console.error('Error fetching carousels:', error); // Log error for debugging
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Function to delete a carousel by ID
exports.deleteCarouselById = async (req, res) => {
    const { id } = req.params; // Use req.params for RESTful API

    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }

    try {
        const deletedCarousel = await Carousel.findOneAndDelete({ id: id });

        if (!deletedCarousel) {
            return res.status(404).json({ message: 'Carousel not found' });
        }

        res.status(200).json({ message: 'Carousel successfully deleted' });
    } catch (error) {
        console.error('Error deleting carousel:', error); // Log error for debugging
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
