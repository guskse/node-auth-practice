const User = require("../models/User");
const errorResponse = require("../utils/errorResponse");

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
    });

    return res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new errorResponse("Please provide EMAIL and PASSWORD", 400));
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new errorResponse("Invalid Credentials", 401));

    }

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      return next(new errorResponse("Invalid Credentials", 401));
    }

    return res.status(200).json({
      success: true,
      token: "uhasuah",
    });
  } catch (error) {
    next(error);
  }
};

exports.forgotPassword = (req, res, next) => {
  res.send("this is forgot password route");
};

exports.resetPassword = (req, res, next) => {
  res.send("this is reset password route");
};
