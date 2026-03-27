const paystack = require('paystack')(process.env.PAYSTACK_SECRET_KEY);
const Order = require('../models/Order');

exports.initializePayment = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const paymentData = {
      amount: order.totalPrice * 100, // Paystack expects amount in kobo
      email: req.user.email,
      reference: `order_${orderId}_${Date.now()}`,
      callback_url: `${process.env.FRONTEND_URL}/payment/callback`,
    };

    const response = await paystack.transaction.initialize(paymentData);
    
    // Update order with reference
    order.paystackReference = paymentData.reference;
    await order.save();

    res.json({ authorization_url: response.data.authorization_url, reference: paymentData.reference });
  } catch (error) {
    res.status(500).json({ message: 'Payment initialization failed' });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { reference } = req.body;
    const response = await paystack.transaction.verify(reference);

    if (response.data.status === 'success') {
      const orderId = reference.split('_')[1];
      await Order.findByIdAndUpdate(orderId, { paymentStatus: 'paid' });
      res.json({ message: 'Payment verified' });
    } else {
      res.status(400).json({ message: 'Payment failed' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Payment verification failed' });
  }
};

// Webhook for Paystack
exports.paystackWebhook = async (req, res) => {
  try {
    const event = req.body;
    if (event.event === 'charge.success') {
      const reference = event.data.reference;
      const orderId = reference.split('_')[1];
      await Order.findByIdAndUpdate(orderId, { paymentStatus: 'paid' });
    }
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};