const express = require('express');
const { initializePayment, verifyPayment, paystackWebhook } = require('../controllers/paymentController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/initialize', auth, initializePayment);
router.post('/verify', auth, verifyPayment);
router.post('/webhook', paystackWebhook);

module.exports = router;