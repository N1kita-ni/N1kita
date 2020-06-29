const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('../models/User');
const requireLogin = require('../middleware/requireLogin');

const router = express.Router();
const jsonParser = bodyParser.json();

router.post('/', jsonParser, (req, res) => {
  console.log(req.body)
  User.findOne({username: req.body.userData.username, password:req.body.userData.password})
    .then((foundUser) => {
      foundUser.orders = foundUser.orders.concat(req.body.order);
      foundUser.save(() => res.end());
    });
});

module.exports = router;