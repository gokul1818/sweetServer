const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { generateUniqueId } = require('../utils/createId');

const ordersSchema = new Schema({

  products: [
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
  paymentsMethod: {
    type: String,
    required: true
  },
  address:
  {
    address: {
      type: String,
      required: true,

    },
    city: {
      type: String,
      required: true,

    },
    state: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    alternativePhoneNumber: {
      type: Number,
      required: true,
    },
  },
  totalPrice: {
    type: Number,
    required: true
  },
  id: {
    type: String,

  }

}, { timestamps: true });


ordersSchema.pre('save', async function (next) {
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

const Orders = mongoose.model('orders', ordersSchema);

module.exports = Orders;
