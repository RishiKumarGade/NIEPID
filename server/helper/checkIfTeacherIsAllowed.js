const User = require("../model/userModel");
const jwt = require("jsonwebtoken");

module.exports.checkIfTeacherIsAllowed = (req, res, next) => {
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
          
          
          if (user) res.json({ status: true, user: user.username });
          else res.json({ status: false });
          next();
        }
      }
    );
  } else {
    res.json({ status: false,message:"you are not allowed to do this" });
    // next();
  }
};

