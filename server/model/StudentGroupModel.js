const mongoose = require("mongoose");
const { GroupEnums } = require("../constants/enums/GroupEnums");

const studentGroupsSchema = new mongoose.Schema({
    group: {
      type: String,
      enum : GroupEnums, 
      required: [true, "Group is Required"],
    
    },
    student: {
      type: String,
      ref:'students',
      required: [true, "student username is Required"],
    },
  });

  module.exports = mongoose.model("studentgroups", studentGroupsSchema)
  