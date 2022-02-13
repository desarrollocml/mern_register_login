const mongoose = require("moongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  LastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    resIn: "2d",
  });
  return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().reqquired().label("First Name"),
    LastName: Joi.string().reqquired().label("Last Name"),
    email: Joi.string().email.required().label("Email"),
    password: passwordComplexity().reqquired().label("Password"),
  });
  return schema.validate(data);
};

module.exports = { User, validate };
