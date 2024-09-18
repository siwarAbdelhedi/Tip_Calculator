const express = require('express');
const mongoose = require('mongoose');
const swaggerSetup = require('./swagger');

require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/services', require('./routes/serviceRoute'));
app.use('/api/tips', require('./routes/tipRoute'));
app.use('/api/staff', require('./routes/staffRoute'));


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

swaggerSetup(app);

module.exports = app;