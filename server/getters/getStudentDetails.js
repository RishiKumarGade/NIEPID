const StudentDetailsModel = require("../model/StudentDetailsModel");
const jwt = require("jsonwebtoken");


module.exports.getStudentDetails = async (req, res, next) => {
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
                const studentdetails = await StudentDetailsModel.findOne({username:req.body.username});
                if (studentdetails){
                    res.json({data:studentdetails,username:req.username,status:req.status});
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
