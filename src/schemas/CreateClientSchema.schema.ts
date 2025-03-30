import Joi from "joi";
import { ClientStatus } from "../interfaces";

const CreateClientSchema = Joi.object({
  agencyId: Joi.string().required().messages({
    "string.pattern.base": "Invalid agency ID format",
    "any.required": "Agency ID is required",
  }),

  clientName: Joi.string().trim().required().messages({
    "any.required": "Client name is required",
  }),

  clientEmail: Joi.string().trim().email().required().messages({
    "string.email": "Invalid email format",
    "any.required": "Client email is required",
  }),

  status: Joi.string()
    .valid(...Object.values(ClientStatus))
    .default(ClientStatus.ACTIVE)
    .messages({
      "any.only": "Invalid client status",
      "any.required": "Client status is required",
    }),
});

export default CreateClientSchema;
