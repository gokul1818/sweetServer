require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/authRoute');
const categoriesRoutes = require('./src/routes/categories');
const carouselRoutes = require('./src/routes/carousel');
const cartRoutes = require('./src/routes/cart');
const cronScheduler = require('./src/utils/scheduler');
const helmet = require('helmet');
const importData = require('./src/utils/importCategoryList');
const cors = require("cors");

const app = express();
// Connect to MongoDB
(async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
    // await importData();
    // cronScheduler.start();


  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
})();

// Middleware
app.use(cors());

app.use(express.json()); // For parsing JSON bodies
app.use(helmet()); // For security

// Routes
app.use('/api', authRoutes);
app.use('/api', categoriesRoutes);
app.use('/api', carouselRoutes);
app.use('/api', cartRoutes);

// Root route
app.get("/", (req, res) => {
  res.json("hello welcome");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Initialize the scheduler

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
