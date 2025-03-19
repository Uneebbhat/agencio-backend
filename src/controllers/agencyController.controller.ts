import { Request, Response } from "express";
import CreateAgencySchema from "../schemas/CreateAgencySchema.schema";
import ErrorHandler from "../utils/ErrorHandler";
import Agency from "../models/AgencyModel.model";
import ResponseHandler from "../utils/ResponseHandler";
import generateToken from "../helpers/generateToken";
import cloudinaryUpload from "../services/cloudinaryUpload";
import path from "path";

export const createAgency = async (req: Request, res: Response) => {
  const { error } = CreateAgencySchema.validate(req.body);
  if (error) {
    ErrorHandler.send(res, 400, error.details[0].message);
    return;
  }

  const {
    userId,
    agencyName,
    agencyEmail,
    agencyWebsite,
    agencyPhone,
    agencySize,
    industry,
  } = req.body;

  try {
    const existingAgency = await Agency.findOne({ agencyEmail });
    if (existingAgency) {
      ErrorHandler.send(res, 409, "Agency with the same email already exists");
      return;
    }

    const agencyLogo = req.file;
    // console.log("agencyLogo", agencyLogo);
    // console.log(req.file?.path);

    let agencyLogoUrl;

    if (agencyLogo) {
      const filePath = path.resolve(agencyLogo.path);
      // console.log("filePath", filePath);

      try {
        const cloudinaryResponse = await cloudinaryUpload(filePath, {
          folder: "agencio/agency_logos",
        });
        agencyLogoUrl = cloudinaryResponse.secure_url;
        // console.log(`Image uploaded successfully: ${agencyLogoUrl}`);
      } catch (error: any) {
        ErrorHandler.send(res, 500, `${error}`);
        return;
      }
    }

    const newAgency = await Agency.create({
      userId,
      agencyName,
      agencyEmail,
      agencyWebsite,
      agencyPhone,
      agencySize,
      industry,
      agencyLogo: agencyLogoUrl,
    });
    if (!newAgency) {
      ErrorHandler.send(res, 400, "Failed to create agency");
      return;
    }

    const token = generateToken(res, newAgency);

    ResponseHandler.send(
      res,
      201,
      "Agencies created successfully",
      newAgency,
      token
    );
  } catch (error: any) {
    ErrorHandler.send(res, 500, `Internal Server Error: ${error.message}`);
  }
};

export const getAgency = async (req: Request, res: Response) => {
  const { agencyId } = req.params;

  try {
    const agency = await Agency.find({ _id: agencyId }).populate(
      "userId",
      "name email"
    );
    if (!agency) {
      ErrorHandler.send(res, 404, "Agency not found");
      return;
    }

    ResponseHandler.send(res, 200, "Agency data found", agency);
  } catch (error: any) {
    ErrorHandler.send(res, 500, `Internal Server Error: ${error.message}`);
  }
};
