const express = require('express');
const multer = require('multer');
const upload = multer();
const router = express.Router();
const {FileUploadAPI} = require('../controllers/uploadController');

// Upload endpoint
router.post('/upload', upload.single('image'), FileUploadAPI);
router.get('/images', async (req, res) => {
    try {
        const images = await FileUploadAPI.find(); // Fetch all images
        res.json(images); // Return images as JSON
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;
