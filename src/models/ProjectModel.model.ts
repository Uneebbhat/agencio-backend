import mongoose, { Model, Schema } from "mongoose";
import { IProject, ProjectStatus } from "../interfaces";

const ProjectModel: Schema<IProject> = new Schema(
  {
    agencyId: {
      type: Schema.Types.ObjectId,
      ref: "Agency",
      required: [true, "Agency ID is required"],
    },
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: [true, "Client ID is required"],
    },
    projectName: {
      type: String,
      required: [true, "Project name is required"],
    },
    projectStatus: {
      type: String,
      enum: Object.values(ProjectStatus),
      default: ProjectStatus.IN_PROGRESS,
    },
    projectBudget: {
      type: Number,
      required: [true, "Project budget is required"],
      default: 0,
    },
  },
  { timestamps: true }
);

const Project: Model<IProject> = mongoose.model<IProject>(
  "Project",
  ProjectModel
);

export default Project;
