//Load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");

async function connectToDb() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("connected to database");
  } catch (err) {
    console.log(`error: ${err}`);
  }
}

module.exports = connectToDb;
