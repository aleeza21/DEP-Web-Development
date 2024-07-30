const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
  category: String
});

// Check if the model is already defined
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

module.exports = Product;
