//import validation by @hapi/joi module installation
const joi = require("@hapi/joi");

//creating validation rule schema
const registerValidation = data => {
  const schema = {
    name: joi
      .string()
      .required()
      .min(3),
    email: joi
      .string()
      .required()
      .email(),
    password: joi.string().required()
  };
  //returning validation
  return joi.validate(data, schema);
};

//login validation
const loginValidation = data => {
  const schema = {
    email: joi
      .string()
      .required()
      .email(),
    password: joi.string().required()
  };
  //returning validation
  return joi.validate(data, schema);
};

//export module
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
