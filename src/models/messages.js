const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  roomId: String,
  username: String,
  message: String,
  image: {
    type: Buffer, // Store image data as binary
    required: false, // Make it optional in case not every message has an image
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
