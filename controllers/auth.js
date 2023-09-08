const User = require("../models/User");

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.login = (req, res, next) => {
  res.send("this is login route");
};

exports.forgotPassword = (req, res, next) => {
  res.send("this is forgot password route");
};

exports.resetPassword = (req, res, next) => {
  res.send("this is reset password route");
};
