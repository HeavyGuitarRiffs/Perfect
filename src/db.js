require('dotenv').config();
const mongoose = require('mongoose');

const connectWithRetry = () => {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('MongoDB connection error:', err);
    setTimeout(connectWithRetry, 5000); // Retry connection after 5 seconds
  });
};

connectWithRetry();

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = db;

