const mongoose = require("mongoose");
const { AnswerEnums } = require("../constants/enums/AnswerEnums");

const areaQuestionAnswerSchema = new mongoose.Schema({
    
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"questions",
      required: [true, "question is Required"],
    },
    answer: {
      type: String,
      enum : AnswerEnums, // TODO other answers 
      required: [true, "Answer is Required"],
    
    },
  });
  module.exports = mongoose.model("areaQuestionAnswers", areaQuestionAnswerSchema)
  