const express = require('express');
const multer = require('multer');
const { getFoods, getFood, createFood, updateFood, deleteFood } = require('../controllers/foodController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.get('/', getFoods);
router.get('/:id', getFood);
router.post('/', auth, admin, upload.single('image'), createFood);
router.put('/:id', auth, admin, updateFood);
router.delete('/:id', auth, admin, deleteFood);

module.exports = router;