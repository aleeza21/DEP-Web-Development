// Backend/routes/products-route.js
const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Get products with optional category filter
router.get('/', async (req, res) => {
  const { category } = req.query;
  try {
    const query = category ? { category } : {}; // Filter by category if provided
    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
