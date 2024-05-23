const User = require("../model/userModel");
const Student = require("../model/studentModel");

const jwt = require("jsonwebtoken");

module.exports.checkIfStudent = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,
      "TOKENSECRET",
      async (err, decodedToken) => {
        if (err) {
          res.json({ status: false });
          next();
        } else {
          const user = await User.findOne({username:decodedToken.username});
          const isStudent = await Student.exists({username: user.username})
          if (isStudent){
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
    // next();
  }
};

