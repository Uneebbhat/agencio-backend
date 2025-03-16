import mongoose, { Model, Schema } from "mongoose";
import { IAgency } from "../interfaces";

const AgencyModel: Schema<IAgency> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    agencyLogo: {
      type: String,
    },
    agencyName: {
      type: String,
      required: [true, "Agency name is required"],
      minlength: [3, "Agency name must be at least 3 characters long"],
      maxlength: [100, "Agency name cannot exceed 100 characters"],
    },
    agencyEmail: {
      type: String,
      required: [true, "Agency email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    agencyWebsite: {
      type: String,
    },
    agencyPhone: {
      type: String,
      required: [true, "Agency phone number is required"],
    },
    agencySize: {
      type: Number,
      required: [true, "Agency size is required"],
      min: [1, "Agency size must be at least 1"],
    },
    industry: {
      type: String,
      required: [true, "Agency industry is required"],
    },
  },
  { timestamps: true }
);

const Agency: Model<IAgency> = mongoose.model<IAgency>("Agency", AgencyModel);

export default Agency;
