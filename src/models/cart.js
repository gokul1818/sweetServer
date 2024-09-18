const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { generateUniqueId } = require('../utils/createId');

const cartSchema = new Schema({

  cart: [
    {
      productName: {
        type: String,
        required: true,

      },
      quantity: {
        type: String,
        required: true,

      },
      price: {
        type: Number,
        required: true,

      },
    }
  ],
  userId: {
    type: String,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  id: {
    type: String,

  }

}, { timestamps: true });


cartSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const nextId = generateUniqueId();
      this.id = nextId;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const Carousel = mongoose.model('carts', cartSchema);

module.exports = Carousel;
