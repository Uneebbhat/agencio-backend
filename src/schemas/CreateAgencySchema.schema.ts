import Joi from "joi";
import mongoose from "mongoose";

const CreateAgencySchema = Joi.object({
  userId: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .required(),

  agencyLogo: Joi.string().uri().allow("", null).optional(),

  agencyName: Joi.string().min(3).max(100).required().messages({
    "string.base": "Agency name must be a string",
    "string.empty": "Agency name is required",
    "string.min": "Agency name must be at least 3 characters long",
    "string.max": "Agency name cannot exceed 100 characters",
  }),

  agencyEmail: Joi.string().email().lowercase().trim().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Agency email is required",
  }),

  agencyWebsite: Joi.string().uri().allow("", null).optional(),

  agencyPhone: Joi.string().required().messages({
    "string.empty": "Agency phone number is required",
  }),

  agencySize: Joi.number().integer().min(1).required().messages({
    "number.base": "Agency size must be a number",
    "number.min": "Agency size must be at least 1",
  }),

  industry: Joi.string().required().messages({
    "string.empty": "Agency industry is required",
  }),
});

export default CreateAgencySchema;
