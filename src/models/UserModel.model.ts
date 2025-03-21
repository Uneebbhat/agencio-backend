import mongoose, { Schema, Model } from "mongoose";
import { IUser } from "../interfaces/index";
import { DEFAULT_IMG } from "../config/constants";

const UserModel: Schema<IUser> = new Schema(
  {
    profilePic: {
      type: String,
      default: DEFAULT_IMG,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      maxlength: [100, "Password cannot exceed 100 characters"],
    },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.model<IUser>("User", UserModel);

export default User;
