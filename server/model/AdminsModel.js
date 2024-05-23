const mongoose = require("mongoose");


const adminSchema = new mongoose.Schema({
    username: {
      type: String,
      required: [true, "username is Required"],
      unique: true,
    },
  });

module.exports = mongoose.model("admins", adminSchema);
