const mongoose = require("mongoose");

const studentGroupsSchema = new mongoose.Schema({
    group: {
      type: String,
      enum : ['PRIMARY'], // TODO other GRoup 
      required: [true, "Group is Required"],
    
    },
    student: {
      type: String,
      ref:'students',
      required: [true, "student username is Required"],
    },
  });

  module.exports = mongoose.model("studentgroups", studentGroupsSchema)
  