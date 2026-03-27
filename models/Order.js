const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [{
    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
    },
    price: {
      type: Number,
      required: true,
    },
  }],
  totalPrice: {
    type: Number,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: [true, 'Delivery address is required'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'out-for-delivery', 'delivered'],
    default: 'pending',
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending',
  },
  paystackReference: {
    type: String,
  },
}, {
  timestamps: true,
});

// Update food orderCount when order is placed
orderSchema.post('save', async function() {
  if (this.status === 'confirmed') {
    for (const item of this.items) {
      await mongoose.model('Food').findByIdAndUpdate(item.food, { $inc: { orderCount: item.quantity } });
    }
  }
});

module.exports = mongoose.model('Order', orderSchema);