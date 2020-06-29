const express = require('express');
const bodyParser = require('body-parser');
const Cart = require('../models/Cart');
const User = require('../models/User');

const router = express.Router();
const jsonParser = bodyParser.json();


router.post('/', (req, res) => {
  let id;
  User.findOne({ username: req.body.username, password:req.body.password })
  .then((user)=>{
    Cart.findOne({ user: user._id })
    .populate('items.product')
    .exec((err, cart) => {
      if (!cart) {
        return res.send(null);
      }

      res.send(cart);
    });
  })


});

module.exports = router;