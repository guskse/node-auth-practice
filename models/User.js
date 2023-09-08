const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs"); //encriptar password

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide an username"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please provide a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false, //hide password
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//encriptar o password antes do user ser "salvo / criado"
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt); //change the password with salt
  next();
});

//checar se password dé igual
UserSchema.methods.matchPasswords = async function(password){
  return await bcryptjs.compare(password, this.password);
}


const User = mongoose.model("User", UserSchema);

module.exports = User;