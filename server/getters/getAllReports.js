const StudentReports = require("../model/ReportModel");
const jwt = require("jsonwebtoken");




module.exports.getAllReports = async (req, res, next) => {
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
                const reports = await StudentReports.find({checked:true,username:req.body.username})
                res.json({data:reports,username:req.username,status:req.status});
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
