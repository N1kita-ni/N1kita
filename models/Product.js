const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  info: {
    name: String,
    color: String,
    price: Number,
    photo: String
  },
  tags: {
    priceRange: String,
    color: String,
  }
});

module.exports = mongoose.model('Product', productSchema);