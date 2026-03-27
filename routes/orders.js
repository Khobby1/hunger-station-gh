const express = require('express');
const { createOrder, getUserOrders, getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

router.post('/', auth, createOrder);
router.get('/my', auth, getUserOrders);
router.get('/', auth, admin, getAllOrders);
router.put('/:id/status', auth, admin, updateOrderStatus);

module.exports = router;