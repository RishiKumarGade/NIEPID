const { questions } = require("../constants/questions/questions")
const QuestionModel = require("../model/QuestionModel")

module.exports.testQuestions = async()=>{
    const tests = Object.keys(questions).map(q=>q)
          const qids= await QuestionModel.find({question: {$in: tests}}).select('_id')
          const quesanswers = []
          qids.forEach(q=>{quesanswers.push({question:q._id, answer:""})})
    return quesanswers
}