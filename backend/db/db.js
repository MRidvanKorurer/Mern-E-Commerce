const mongoose = require("mongoose");

const conn = async () => {
  await mongoose.connect(process.env.DB_URI);
  console.log("Database connection success");
};

module.exports = conn;
