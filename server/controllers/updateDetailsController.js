const { storeClientData } = require("../helper/StoreStudentDetails");
const Student = require("../model/studentModel");
const Teacher = require("../model/teacherModel");


module.exports.updateStudentDetails = async (req, res, next) => {
    storeClientData(req.body)
    res.json({status:req.status,success:true ,message:"Stored"})
}

module.exports.updateTeacherDetails = async (req, res, next) => {
    const { username } = req.body;
// TODO
    await Teacher.updateOne({username: username},{})
}