const mongoose = require('mongoose');

const DATABASE_URL = 'mongodb://127.0.0.1:27017/danceguide';

module.exports = async () => {
  try {
    await mongoose.connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('***Database connected***');
  } catch (error) {
    console.log(`Database error on connection: ${error.message}`);
  }
};
