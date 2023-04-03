const mongoose = require("mongoose");
require("dotenv").config();

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("***Database connected***");
  } catch (error) {
    console.log(`Database error on connection: ${error.message}`);
  }
};
