const StudentGroupModel = require("../model/StudentGroupModel");
const Student = require("../model/studentModel");
const Teacher = require("../model/teacherModel");
const jwt = require("jsonwebtoken");




module.exports.getAssignedStudents = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (token) {
          jwt.verify(
            token,
            "TOKENSECRET",
            async (err, decodedToken) => {
              if (err) {
                return
              } else {
                const teacher = await Teacher.findOne({username:decodedToken.username});
                const studentgroups = await StudentGroupModel.find({group: teacher.assignedGroup}).populate('student.username')
                const students = studentgroups.map(studentgrp =>studentgrp.student)
                if (teacher){
                    res.json({data:students,username:req.username,status:req.status});
                    next();
                } 
                else{
                    res.json({ status: false });
                } 
              }
            }
          );
        } else {
          res.json({ status: false });
        }
    } catch (error) {
       return 
    }

}
