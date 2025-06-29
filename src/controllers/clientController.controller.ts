import { Request, Response } from "express";
import CreateClientSchema from "../schemas/CreateClientSchema.schema";
import ErrorHandler from "../utils/ErrorHandler";
import Client from "../models/ClientModel.model";
import ResponseHandler from "../utils/ResponseHandler";

export const createClient = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { error } = CreateClientSchema.validate(req.body);
  if (error) {
    ErrorHandler.send(res, 400, error.details[0].message);
    return;
  }

  const { agencyId, clientName, clientEmail, status } = req.body;

  try {
    const existingClient = await Client.findOne({ clientEmail });
    if (existingClient) {
      ErrorHandler.send(res, 409, "Client with the same email already exists");
      return;
    }

    const newClient = await Client.create({
      agencyId,
      clientName,
      clientEmail,
      status,
    });
    if (!newClient) {
      ErrorHandler.send(res, 400, "Failed to create client");
      return;
    }

    ResponseHandler.send(
      res,
      201,
      "Client created successfuly",
      newClient as any
    );
  } catch (error: any) {
    ErrorHandler.send(res, 500, `Internal Server Error: ${error.message}`);
  }
};

export const getAllClients = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allClients = await Client.find().populate("agencyId");
    if (!allClients) {
      ErrorHandler.send(res, 404, "No clients found");
      return;
    }

    ResponseHandler.send(res, 200, "All clients fetched", {
      lenght: allClients.length,
      allClients,
    });
  } catch (error: any) {
    ErrorHandler.send(res, 500, `Internal Server Error: ${error.message}`);
  }
};

export const editClient = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { agencyId, clientName, clientEmail, status, clientId } = req.body;
  if (!clientId) {
    ErrorHandler.send(res, 400, "Client ID is required");
    return;
  }

  try {
    const updatedClient = await Client.findByIdAndUpdate(
      clientId,
      { clientName, clientEmail, status },
      { new: true }
    );
    if (!updatedClient) {
      ErrorHandler.send(res, 404, "Client not found");
      return;
    }

    ResponseHandler.send(
      res,
      200,
      "Client updated successfully",
      updatedClient
    );
  } catch (error: any) {
    ErrorHandler.send(res, 500, `Internal Server Error: ${error.message}`);
  }
};

export const deleteClient = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { clientId } = req.query;
  try {
    const deletedClient = await Client.findByIdAndDelete({ _id: clientId });
    if (!deletedClient) {
      ErrorHandler.send(res, 404, "Client not found");
      return;
    }

    ResponseHandler.send(res, 200, "Client deleted successfully");
  } catch (error: any) {
    ErrorHandler.send(res, 500, `Internal Server Error: ${error.message}`);
  }
};
