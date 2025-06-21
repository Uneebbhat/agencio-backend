import { Request, Response } from "express";
import Pipeline from "../models/PipelinesModel.model";

// Create a new pipeline
export const createPipeline = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Implementation here
};

// Get all pipelines for a project
export const getPipelinesByProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { projectId } = req.params;
    if (!projectId) {
      res.status(400).json({ message: "Project ID is required" });
      return;
    }

    const pipelines = await Pipeline.find({ projectId }).sort({ order: 1 });
    if (!pipelines || pipelines.length === 0) {
      res.status(404).json({ message: "No pipelines found for this project" });
      return;
    }

    res.status(200).json({
      message: "Pipelines fetched successfully",
      data: pipelines,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Internal Server Error: ${error.message}` });
  }
};

// Update pipeline order
export const updatePipelineOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Implementation here
};

// Delete a pipeline
export const deletePipeline = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Implementation here
};
