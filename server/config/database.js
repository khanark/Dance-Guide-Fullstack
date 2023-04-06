const mongoose = require("mongoose");
require("dotenv").config();

const database =
  process.env.NODE_ENV === "production"
    ? process.env.MONGODB_URL
    : process.env.MONGODB_URL_DEV;

module.exports = async () => {
  try {
    await mongoose.connect(database, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("***Database connected***");
  } catch (error) {
    console.log(`Database error on connection: ${error.message}`);
  }
};
