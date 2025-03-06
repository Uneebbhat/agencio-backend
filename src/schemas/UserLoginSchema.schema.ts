import Joi from "joi";

const UserLoginSchema = Joi.object({
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

  password: Joi.string().required().min(8).max(100).messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters long",
    "string.max": "Password cannot exceed 100 characters",
  }),
});

export default UserLoginSchema;
