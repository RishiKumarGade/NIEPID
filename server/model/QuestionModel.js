const mongoose = require("mongoose");
const { AreaEnums } = require("../constants/enums/AreaEnums");

const QuestionSchema = new mongoose.Schema({
    question: {
      type: String,
      required: [true, "question is Required"],
    },
    area: {
      type: String,
      enum : AreaEnums, 
      required: [true, "Area is Required"],
    },
  });
  module.exports = mongoose.model("questions", QuestionSchema)
  