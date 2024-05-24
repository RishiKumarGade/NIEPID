const Student = require("../model/studentModel");

const Report = require("../model/ReportModel");


module.exports.getStudentEvaluation = async (req, res, next) => {
  try {
    const student = await Student.findOne({username:req.body.username});
    if (!student) {
      res.json({ message: "there is no student" });
    } else {
      const reports = await Report.find({
        student: student.username,
        checked:false 
      }).populate('tests.question');
      res.json({ data: reports, status: req.status, username: req.username });
    }
  } catch (error) {
    return;
  }
};
