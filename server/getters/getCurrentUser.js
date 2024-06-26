const Student = require("../model/studentModel");
const Teacher = require("../model/teacherModel");

const jwt = require("jsonwebtoken");


module.exports.getCurrentUser = async (req, res, next) => {
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
                const student = await Student.findOne({username:decodedToken.username});
                if (student){
                    res.json({data:{isStudent:true,...student},username:req.username,status:req.status});
                }
                else{
                    const teacher = await Teacher.findOne({username:decodedToken.username});
                    if (teacher){
                        res.json({data:{isTeacher:true,...teacher},username:req.username,status:req.status});
                    }else{
                        res.json({ status: false,message:"there is no student with given username" });
                    }
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
