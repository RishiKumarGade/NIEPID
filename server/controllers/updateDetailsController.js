const Student = require("../model/studentModel");
const Teacher = require("../model/teacherModel");


module.exports.updateStudentDetails = async (req, res, next) => {
    const { username } = req.body;
// TODO
    await Student.updateOne({username: username},{})
}

module.exports.updateTeacherDetails = async (req, res, next) => {
    const { username } = req.body;
// TODO
    await Teacher.updateOne({username: username},{})
}