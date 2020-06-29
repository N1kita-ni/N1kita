const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const catalogRoutes = require('./routes/catalogRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const carttRoutes = require('./routes/carttRoutes');
const orderRoutes = require('./routes/orderRoutes');
const User = require('./models/User');
var cors = require('cors')

// Uncomment to seed products to the database
const seedProducts = require('./seeds/products');
seedProducts();

const publicPath = path.join(__dirname, 'client', 'public');
const port = process.env.PORT || 5000;

const app = express();
mongoose.connect("mongodb+srv://egorMiwa:madcock12@cluster0-gwghy.mongodb.net/test");

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static(publicPath));
app.use(cors());
// app.use(expressSession({
//   secret: "dsaas",
//   resave: false,
//   saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

app.use('/auth', authRoutes);
app.use('/api/catalog', catalogRoutes);
app.use('/api/user', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/cartt', carttRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => console.log('SERVER NOW RUNNING...'));
