const mongoose = require("mongoose");

const studentPromotionSchema = new mongoose.Schema({
    date: {
      type: Date,
      required: [true, "date is Required"],
    },
    student: {
        type: String,
        ref:'students',
        required: [true, "student username is Required"],
    },
    promoteFromgroup: {
        type: String,
        enum : ['PRIMARY'], // TODO other groups 
        required: [true, "group is Required"],
    },
    promoteTogroup: {
        type: String,
        enum : ['PRIMARY'], // TODO other groups 
        required: [true, "group is Required"],
    },
      report:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "reports",
          required: [true, "report id is Required"],
      }
  });

  module.exports = mongoose.model("studentPromotions", studentPromotionSchema)
