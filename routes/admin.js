const express = require('express');
const { getStats } = require('../controllers/adminController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

router.get('/stats', auth, admin, getStats);

module.exports = router;