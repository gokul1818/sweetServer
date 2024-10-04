const FileUpload = require('../models/fileUpload');

exports.FileUploadAPI = async (req, res) => {
  // Check if the file is present
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  // Create a new image instance
  const newImage = new FileUpload({
    name: req.file.originalname,
    data: req.file.buffer,
    contentType: req.file.mimetype,
  });

  try {
    await newImage.save();
    return res.status(201).json({ message: 'Image uploaded successfully!' });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
