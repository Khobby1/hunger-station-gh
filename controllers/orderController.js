const Order = require('../models/Order');
const Food = require('../models/Food');
const { sendEmail } = require('../utils/email');

exports.createOrder = async (req, res) => {
  try {
    const { items, deliveryAddress, phone } = req.body;
    
    let totalPrice = 0;
    const orderItems = [];

    for (const item of items) {
      const food = await Food.findById(item.food);
      if (!food) {
        return res.status(404).json({ message: `Food ${item.food} not found` });
      }
      orderItems.push({
        food: item.food,
        quantity: item.quantity,
        price: food.price,
      });
      totalPrice += food.price * item.quantity;
    }

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalPrice,
      deliveryAddress,
      phone,
    });

    // Send email
    await sendEmail(
      req.user.email,
      'Order Placed - Hunger Station Gh',
      `<h1>Order Confirmed</h1><p>Your order #${order._id} has been placed. Total: GHS ${totalPrice}</p>`
    );

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('items.food').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').populate('items.food').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate('user', 'email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Send email on status change
    await sendEmail(
      order.user.email,
      'Order Status Update - Hunger Station Gh',
      `<h1>Order Update</h1><p>Your order #${order._id} status is now: ${status}</p>`
    );

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};