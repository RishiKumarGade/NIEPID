const User = require("../model/userModel");
const Admin = require("../model/AdminsModel");
const Teacher = require("../model/teacherModel");

const jwt = require("jsonwebtoken");

module.exports.checkIfTeacherorAdminMiddleware = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,
      "TOKENSECRET",
      async (err, decodedToken) => {
        if (err) {
          res.json({ status: false,message:"something wrong happened" });
        } else {
          const user = await User.findOne({username:decodedToken.username});
          const isAdmin = await Admin.exists({username: user.username})
          const isTeacher = await Teacher.exists({username: user.username})
          if (isAdmin || isTeacher){
            req.status= true
            req.username= user.username
            next();
          } 
          else res.json({ status: false,message:"you are not allowed to access this"});
        }
      }
    );
  } else {
    res.json({ status: false });
  }
};

