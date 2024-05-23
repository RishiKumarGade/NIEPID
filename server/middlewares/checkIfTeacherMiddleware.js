const User = require("../model/userModel");
const Teacher = require("../model/teacherModel");

const jwt = require("jsonwebtoken");

module.exports.checkIfTeacher = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,
      "TOKENSECRET",
      async (err, decodedToken) => {
        if (err) {
          res.json({ status: false,message:"something wrong happened"  });
        } else {
          const user = await User.findOne({username:decodedToken.username});
          const isTeacher = await Teacher.exists({username: user.username})
          if (isTeacher){
            req.status = true;
            req.username = decodedToken.username;
          } 
          else return res.json({ status: false,message:"you are not allowed to access this"});
          next();
        }
      }
    );
  } else {
    res.json({ status: false });
  }
};

