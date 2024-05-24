const mongoose = require("mongoose");
const { GroupEnums } = require("../constants/enums/GroupEnums");
const { AnswerEnums } = require("../constants/enums/AnswerEnums");
const { TermYearEnums } = require("../constants/enums/TermYearEnums");



const ReportSchema = new mongoose.Schema({
  tests: [
    {
      question:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "questions",
      },
      answer: {
        type: String,
        enum :AnswerEnums, // TODO other answers 
      }
    }
  ],
  student: {
    type: String,
    ref: "students",
    required: [true, "Student Required"],
  },
  termYear: {
    type: Number,
    enum: TermYearEnums, // TODO other termyears
    required: [true, "termyear is Required"],
  },
  dateOfEvaluation: {
    type: Date,
  },
  group: {
    type: String,
    enum : GroupEnums, // TODO other GRoup 
    required: [true, "Group is Required"],
  },
  checked:{
    type: Boolean,
    default:false
  }
});

module.exports = mongoose.model("reports", ReportSchema);
