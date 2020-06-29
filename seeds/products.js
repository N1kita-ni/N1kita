const mongoose = require('mongoose');
const Product = require('../models/Product');

const products = [
  {
    info: {
      name: 'Bouquet',
      color: 'White',
      price: 20,
      photo: '/img/white-bucket.jpg'
    },
    tags: {
      color: 'white',
      priceRange: '10>',
    }
  },
  {
    info: {
      name: 'Rose',
      color: 'Red',
      price: 2,
      photo: '/img/red-rose.jpg'
    },
    tags: {
      color: 'red',
      priceRange: '<5',
    }
  }, {
    info: {
      name: 'Tulip',
      color: 'White',
      price: 1,
      photo: '/img/white-tulip.jpg'
    },
    tags: {
      color: 'white',
      priceRange: '<5',
    }
  },

];

const seedProducts = () => {
  Product.remove({}, (err) => {
    if (err) {
      console.log(err);
    }
    console.log('PRODUCTS REMOVED');
    products.forEach((product) => {
      Product.create(product, (err, createdProduct) => {
        if (err) {
          console.log(err);
        } else {
          console.log('PRODUCT CREATED');
          createdProduct.save();
        }
      })
    })
  })
}

module.exports = seedProducts;