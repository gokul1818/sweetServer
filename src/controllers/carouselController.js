const Carousel = require("../models/carousel")

exports.addNewCarousel = async (req, res) => {


    const { images } = req.body
    try {
        // Create a new user
        const categories = new Carousel({ images });
        await categories.save();
        res.status(200).json({ message: 'successfully added' });

    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });

    }
}


exports.getAllCarousel = async (req, res) => {


    try {
        const products = await Carousel.find({});

        if (products.length === 0) {
            return res.status(404).json({ message: 'No found' });
        }
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });

    }
}




exports.deleteCarouselById = async (req, res) => {
    const { id } = req.body;
    console.log(id)
    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }

    try {
        const deletedProduct = await Carousel.findOneAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'not found' });
        }

        res.status(200).json({ message: 'successfully deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};