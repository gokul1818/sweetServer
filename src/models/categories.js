const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { generateUniqueId } = require('../utils/createId');

const categoriesSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
  },
  price: {
    type: String,
    required: true,
  },
  offerPrice: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true

  },
  description: {
    type: String,
    required: true

  },
  images: [
    {
      url: {
        type: String,
        required: false
      }

    }]

}, { timestamps: true });

const categoriesListSchema = new Schema({

  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  }

}, { timestamps: true });

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

const Categories = mongoose.model('categories', categoriesSchema);

module.exports = Categories;


const CategoriesList = mongoose.model('categoriesList', categoriesListSchema);

module.exports = CategoriesList;
