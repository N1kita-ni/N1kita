const express = require('express');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

router.post('/register', (req, res) => {
  const newUser = {
    username: req.body.username,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
    password:req.body.password,
    orders: []
  };
  User.create(newUser).then(()=>{
    res.redirect('/')
  })
});

router.post('/login',(req,res)=>{
  User.findOne({username:req.body.username,password:req.body.password},(err,user)=>{
    if(!err){
      res.redirect('/');
    }
  })
})

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;