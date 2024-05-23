const mongoose = require("mongoose");
const User = require("../model/userModel");

const teacherSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is Required"],
    unique: true
  },
  Name: {
    type: String,
    required: [true, "Name is Required"],
  },
  gender:{
    type: String,
    enum: ["Male", "Female"],
  },
  MobileNo:{
    type:Number,
  },
  assignedGroup:{
      type: String,
      enum : ['PRIMARY'], // TODO other groups 
  }
});

teacherSchema.pre("save", async function (next) {
  const user = await User.create({
    username: this.username,
    password: "sample@123",
  });
  next();
});

module.exports = mongoose.model("teachers", teacherSchema);
