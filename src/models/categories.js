const mongoose = require('mongoose');
const { generateUniqueId } = require('../utils/createId');

const Schema = mongoose.Schema;

// Categories Schema
const categoriesSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Ensures price cannot be negative
  },
  offerPrice: {
    type: Number,
    required: true,
    min: 0, // Ensures offer price cannot be negative
  },
  quantity: {
    type: Number,
    required: true,
    min: 0, // Ensures quantity cannot be negative
  },
  description: {
    type: String,
    required: true,
  },
  offersAvailable: {
    type: Boolean,
    default: false,
  },
  isStock: {
    type: Boolean,
    default: false,
  },
  images: [
    {
      url: { type: String, required: true },
    }
  ],
  category: {
    type: Schema.Types.ObjectId,
    ref: 'CategoriesList',
    required: true,
  },
}, { timestamps: true });

// Categories List Schema
const categoriesListSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  sub: [
    {
      label: { type: String, required: true },
      value: { type: String, required: true },
    }
  ]
}, { timestamps: true });

// Pre-save middleware to generate unique ID
categoriesSchema.pre('save', async function (next) {
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

// Models
const Categories = mongoose.model('Categories', categoriesSchema);
const CategoriesList = mongoose.model('CategoriesList', categoriesListSchema);

// Exporting models
module.exports = {
  Categories,
  CategoriesList,
};
