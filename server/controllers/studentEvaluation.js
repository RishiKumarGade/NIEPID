const Report = require("../model/ReportModel");
const Question = require("../model/QuestionModel");
const { PromoteStudents } = require("../helper/PromoteStudent");
const { calculatePercentage } = require("../helper/CalculatePercentage");

module.exports.studentevaluation = async (req, res, next) => {
  // QAEvaluations structure is {question area answer}
  const { studentusername, termYear, group, QAEvaluations, checked } = req.body;

  const rep = await Report.findOne({
    student: studentusername,
    termYear: termYear,
    group: group,
  }
)

if(rep.checked){
  res.json({
    status: false,
    success: false,
    message: "Already Evaluated",
  });
}else{

  let tests = [];
  QAEvaluations.map(async (QAEvaluation) => {
    if (QAEvaluation.question.question != "")
      Question.findOneAndUpdate(
        {
          question: QAEvaluation.question.question,
          area: QAEvaluation.question.area,
        },
        {
          question: QAEvaluation.question.question,
          area: QAEvaluation.question.area,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      ).then((res) => {
        tests.push({ question: res._id, answer: QAEvaluation.answer });
      });
  });

  const ch = await Report.findOne({
    checked: false,
    termYear: { $lt: termYear },
  });

  if (ch) {
    res.json({
      status: false,
      success: false,
      message: "there are other terms which are not submitted",
    });
  }

  else {
    await Report.findOneAndUpdate(
      {
        student: studentusername,
        termYear: termYear,
        group: group,
      },
      {
        tests: tests,
        dateOfEvaluation: Date.now(),
      }
    )
      .populate("tests.question")
      .then(async (a) => {
        let c = false;
        if (checked) {
          const p = await calculatePercentage(a.tests);
          c = await PromoteStudents(studentusername, p,rep._id);
          if (c == null) {
            res.json({
              status: false,
              success: false,
              message: "Student is not qualified",
            });
          } else {
            res.json({
              status: true,
              success: true,
              message: "student is promoted",
              data: c,
            });
          }
          rep.checked = true;
          await rep.save();
        } else {
          
          res.json({
            status: true,
            success: true,
            message: "successfully saved the progress",
          });
        }
      });
  }

}
   
};
