import Joi from "joi";

const ResetPasswordSchema = Joi.object({
  password: Joi.string().required().min(8).max(100).messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters long",
    "string.max": "Password cannot exceed 100 characters",
  }),
});

export default ResetPasswordSchema;
