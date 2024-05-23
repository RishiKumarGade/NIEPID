const User = require("../model/userModel");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (username) => {
  return jwt.sign({ username }, "TOKENSECRET", {
    expiresIn: maxAge,
  });
};

const handleAuthErrors = (err) => {
  let errors = { username: "", password: "" };

  console.log(err);
  if (err.message === "incorrect username") {
    errors.username = "That username is not registered";
  }

  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  if (err.code === 11000) {
    errors.username = "username is already registered";
    return errors;
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    const token = createToken(user.username);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });

    res.status(201).json({ user: user.username, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleAuthErrors(err);
    res.json({ errors, created: false });
  }
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    const token = createToken(user.username);
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user.username, status: true });
  } catch (err) {
    const errors = handleAuthErrors(err);
    res.json({ errors, status: false });
  }
};


