const mongoose = require("mongoose");

const areaQuestionAnswerSchema = new mongoose.Schema({
    area: {
      type: String,
      enum : ['PERSONAL'], // TODO other areas
      required: [true, "Area is Required"],
    
    },
    question: {
      type: String,
      required: [true, "question is Required"],
    },
    answer: {
      type: String,
      enum : ['YES'], // TODO other answers 
      required: [true, "Answer is Required"],
    
    },
  });
  module.exports = mongoose.model("areaQuestionAnswers", areaQuestionAnswerSchema)
  