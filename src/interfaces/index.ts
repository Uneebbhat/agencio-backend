// Add all interfaces here and then export them to use

import { Document, Types } from "mongoose";

// User Interface
export interface IUser {
  name: string;
  email: string;
  password: string;
  profilePic: File | null | any;
  resetPasswordToken?: any;
  resetPasswordExpires?: any;
}

export interface IUserDTO {
  // Add more fields as needed
  _id: Types.ObjectId;
  name: string;
  email: string;
  profilePic: File | null | any;
}

// Agency Interface
export interface IAgency extends Document {
  userId: Types.ObjectId;
  agencyLogo?: File | null;
  agencyName: string;
  agencyEmail: string;
  agencyWebsite?: string;
  agencyPhone: string;
  agencySize: number;
  industry: string;
}
