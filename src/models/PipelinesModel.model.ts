// src/models/PipelineModel.model.ts
import mongoose, { Model, Schema } from "mongoose";
// import { IPipeline } from "../interfaces";

const PipelineModel = new Schema(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: [true, "Project ID is required"],
    },
    name: {
      type: String,
      required: [true, "Pipeline name is required"],
    },
    order: {
      type: Number,
      required: [true, "Order is required"],
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true }
);

const Pipeline = mongoose.model("Pipeline", PipelineModel);

export default Pipeline;
