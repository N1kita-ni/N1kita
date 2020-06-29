const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('../models/User');

const router = express.Router();
const jsonParser = bodyParser.json();

router.get('/', (req, res) => {
  res.send(req.user);
});


router.post('/', (req, res) => {
  User.findOne({username:req.body.userName,password:req.body.password})
  .then((foundUser) => {
    res.send(foundUser)
  });
});

module.exports = router;