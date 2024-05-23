const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  tests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "areaQuestionAnswers",
      required: [true, "Q id is Required"],
    },
  ],
  student: {
    type: String,
    ref: "students",
    required: [true, "Student Required"],
  },
  termYear: {
    type: String,
    enum: ["21"], // TODO other termyears
    required: [true, "termyear is Required"],
  },
  dateOfEvaluation: {
    type: Date,
    required: [true, "date of evaluation is Required"],
  },
  group: {
    type: String,
    enum : ['PRIMARY'], // TODO other GRoup 
    required: [true, "Group is Required"],
  },
});

module.exports = mongoose.model("reports", ReportSchema);
