const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { generateUniqueId } = require('../utils/createId');

const carouselSchema = new Schema({

  image:
  {
    url: {
      type: String,
      required: true,
      trim: true
    },
    redirection: {
      type: String,
      required: true,
      default: "/"
    },
    expiry: {
      type: String,
      required: true,
    },
  },
   id: {
    type: Number,
    unique: true

  }

}, { timestamps: true });


carouselSchema.pre('save', async function (next) {
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

const Carousel = mongoose.model('carousel', carouselSchema);

module.exports = Carousel;
