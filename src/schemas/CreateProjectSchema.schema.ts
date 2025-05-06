import Joi from "joi";
import { ProjectStatus } from "../interfaces";

const CreateProjectSchema = Joi.object({
  agencyId: Joi.string().hex().required().messages({
    "string.base": `"Agency ID" should be a string`,
    "string.hex": `"Agency ID" should be a valid ObjectId`,
    "any.required": `"Agency ID" is required`,
  }),

  clientId: Joi.string().hex().required().messages({
    "string.base": `"Client ID" should be a string`,
    "string.hex": `"Client ID" should be a valid ObjectId`,
    "any.required": `"Client ID" is required`,
  }),

  projectName: Joi.string().min(1).required().messages({
    "string.base": `"Project Name" should be a string`,
    "any.required": `"Project Name" is required`,
  }),

  projectStatus: Joi.string()
    .valid(...Object.values(ProjectStatus))
    .default(ProjectStatus.IN_PROGRESS)
    .messages({
      "string.base": `"Project Status" should be a string`,
      "any.only": `"Project Status" must be one of the following: ${Object.values(
        ProjectStatus
      ).join(", ")}`,
      "any.default": `"Project Status" is defaulted to "IN_PROGRESS"`,
    }),

  projectBudget: Joi.number().min(0).required().default(0).messages({
    "number.base": `"Project Budget" should be a number`,
    "number.min": `"Project Budget" should be a positive number`,
    "any.required": `"Project Budget" is required`,
    "any.default": `"Project Budget" is defaulted to 0`,
  }),
});

export default CreateProjectSchema;
