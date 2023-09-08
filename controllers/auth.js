exports.register = (req, res, next) => {
  res.send("this is register route");
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
