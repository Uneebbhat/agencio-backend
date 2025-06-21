import { Request, Response } from "express";
import CreateProjectSchema from "../schemas/CreateProjectSchema.schema";
import ErrorHandler from "../utils/ErrorHandler";
import Project from "../models/ProjectModel.model";
import ResponseHandler from "../utils/ResponseHandler";

export const createProject = async (req: Request, res: Response) => {
  const { error } = CreateProjectSchema.validate(req.body);
  if (error) {
    ErrorHandler.send(res, 400, error.details[0].message);
    return;
  }

  const { agencyId, clientName, projectName, projectStatus, projectBudget } =
    req.body;

  try {
    const newProject = await Project.create({
      agencyId,
      clientName,
      projectName,
      projectStatus,
      projectBudget,
    });
    if (!newProject) {
      ErrorHandler.send(res, 400, "An error occurred while creating project");
      return;
    }

    ResponseHandler.send(res, 201, "Project created successfully", newProject);
  } catch (error: any) {
    ErrorHandler.send(res, 500, `Internal Server Error: ${error.message}`);
  }
};

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find();
    if (!projects) {
      ErrorHandler.send(res, 404, "No projects found");
      return;
    }
    ResponseHandler.send(res, 200, "Projects fetched successfully", projects);
  } catch (error: any) {
    ErrorHandler.send(res, 500, `Internal Server Error: ${error.message}`);
  }
};
