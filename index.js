require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/authRoute');
const categoriesRoutes = require('./src/routes/categories');
const carouselRoutes = require('./src/routes/carousel');
const cartRoutes = require('./src/routes/cart');
const orderRoutes = require('./src/routes/orders');
const webhookRoutes = require('./src/routes/webhook');
const fileUpload = require('./src/routes/uploadFile');
const cronScheduler = require('./src/utils/scheduler');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const Message = require('./src/models/messages');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow all origins (use cautiously in production)
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let connectedUsers = 0; // Track connected users

// Connect to MongoDB
(async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
    // Optionally start data import or cron jobs
    // await importData();
    // cronScheduler.start();
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
})();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json()); // For parsing JSON bodies
app.use(helmet()); // Security middleware


io.on('connection', (socket) => {
  console.log('A user connected');

  // Join a specific chat room
  socket.on('joinRoom', async (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);

    // Fetch previous messages and send to the client
    try {
      const messages = await Message.find({ roomId }).sort({ timestamp: 1 }); // Sort by oldest first
      socket.emit('previousMessages', messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  });

  // Handle sending a message
  socket.on('sendMessage', async ({ roomId, username, message, image }) => {
    try {
      // Save the new message to the database
      const newMessage = new Message({ roomId, username, message, image });
      await newMessage.save();

      // Emit the new message to all users in the room
      io.to(roomId).emit('receiveMessage', newMessage);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
})

// API routes
app.use('/api', authRoutes);
app.use('/api', categoriesRoutes);
app.use('/api', carouselRoutes);
app.use('/api', cartRoutes);
app.use('/api', orderRoutes);
app.use('/api', webhookRoutes);
app.use('/api', fileUpload);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
