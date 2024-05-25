const Report = require("../model/ReportModel");
const Question = require("../model/QuestionModel");
const { PromoteStudents} = require("../helper/PromoteStudent")
const {calculatePercentage} = require("../helper/CalculatePercentage")


module.exports.studentevaluation = async (req, res, next) => {
  // QAEvaluations structure is {question area answer}
  const { studentusername, termYear, group, QAEvaluations, checked } = req.body;
  let tests = [];
  QAEvaluations.map(async (QAEvaluation) => {
    if(QAEvaluation.question.question != "")
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
    )
      .then((res) => {
        tests.push({ question: res._id, answer: QAEvaluation.answer });
      });
  })
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
    return;
  } else {
   
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
    ).populate("tests.question").then(async(a) => {
      let c = false
      if (checked) {
        const p = await calculatePercentage(a.tests)
        console.log(p)
        c = await PromoteStudents(studentusername,p)
      }
      if(c){
        await Report.findOneAndUpdate(
          {
            student: studentusername,
            termYear: termYear,
            group: group,
          },
          {
            checked:true,
          }
        )
      }

    })
  }
};
