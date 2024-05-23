const Report = require("../model/ReportModel")
const AreaQuestionAnswer = require("../model/areaQuestionAnswerModel")


module.exports.studentevaluation = async (req, res, next) => {

    // QAEvaluations structure is {question area answer}
    const { studentusername , termYear,group , QAEvaluations,dateOfEvaluation } = req.body
    let tests = [];
    QAEvaluations.map(async (QAEvaluation)=>{

        const AQ = await AreaQuestionAnswer.findOneAndUpdate(
            { area:QAEvaluation.area,question:QAEvaluation.question , answer:QAEvaluation.answer },  // query
            { area: QAEvaluation.area,question:QAEvaluation.question,answer:QAEvaluation.answer },  // update
            { upsert: true, new: true, setDefaultsOnInsert: true }  // options
        );
        tests.push(AQ.username)
    })
    await Report.create({
        tests:tests,
        student:studentusername,
        termYear: termYear,
        dateOfEvaluation:dateOfEvaluation,
        group:group
    })
}
