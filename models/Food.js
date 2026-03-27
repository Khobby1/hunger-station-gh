const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Food name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be positive'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Jollof', 'Pizza', 'Local Specials', 'Continental', 'Sides'],
  },
  image: {
    type: String,
    required: [true, 'Image is required'],
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  orderCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Index for search
foodSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Food', foodSchema);