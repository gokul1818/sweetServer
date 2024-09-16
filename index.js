require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/authRoute');
const categoriesRoutes = require('./src/routes/categories');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {

})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json()); // For parsing JSON bodies

app.get("/", (req, res) => {s
  res.json("hello welcome")
})
// Routes


app.use('/api', authRoutes); // Prefix API routes with /api
app.use('/api', categoriesRoutes); // Prefix API routes with /api

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
