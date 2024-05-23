const Student = require("../model/studentModel");
const jwt = require("jsonwebtoken");


module.exports.getStudentBasicDetails = async (req, res, next) => {
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
                const student = await Student.findOne({username:req.body.username});
                if (student){
                    res.json({data:student,username:req.username,status:req.status});
                    next();
                } 
                else{
                    res.json({ status: false,message:"there is no student with given username" });
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
