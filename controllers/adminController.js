const Order = require('../models/Order');
const Food = require('../models/Food');

exports.getStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);

    const popularFoods = await Food.find().sort({ orderCount: -1 }).limit(5);
    const recentOrders = await Order.find().populate('user', 'name').sort({ createdAt: -1 }).limit(10);

    res.json({
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      popularFoods,
      recentOrders,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};