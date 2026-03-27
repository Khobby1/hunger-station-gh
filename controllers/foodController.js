const Food = require('../models/Food');
const cloudinary = require('../config/cloudinary');

exports.getFoods = async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    if (search) {
      query.$text = { $search: search };
    }

    if (category) {
      query.category = category;
    }

    const foods = await Food.find(query).sort({ orderCount: -1 });
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.json(food);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    
    let image = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      image = result.secure_url;
    }

    const food = await Food.create({ name, description, price, category, image });
    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.json(food);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.json({ message: 'Food deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};