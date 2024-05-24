const mongoose = require("mongoose");
const User = require("../model/userModel");


const studentSchema = new mongoose.Schema({
    Name: {
      type: String,
      required: [true, "Name is Required"],
    },
    username: {
      type: String,
      required: [true, "Username is Required"],
      unique: true,
    },
    gender:{
      type: String,
      enum: ["Male","Female"],
    },
    Aadhaar:{
      type: Number
    },
    RegnNo:{
      type: Number
    }
    ,
    Education: {
      type: String
    },
  });


  studentSchema.pre("save", async function (next) {
    const user = await User.create({
      username: this.username,
      password:  "sample@123",
    });
    next();
  });
  

  module.exports = mongoose.model("students", studentSchema)