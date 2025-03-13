import Joi from "joi";

const ForgotEmailSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .lowercase()
    .trim()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
      "string.base": "Email must be a string",
    }),
});

export default ForgotEmailSchema;
