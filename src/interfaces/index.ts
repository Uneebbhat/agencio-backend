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

// Client Interface
export enum ClientStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
}
export interface IClient extends Document {
  agencyId: Types.ObjectId;
  clientName: string;
  clientEmail: string;
  status: ClientStatus;
}

// Project Interface
export enum ProjectStatus {
  PENDING = "Pending",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
  ON_HOLD = "On Hold",
  CANCELLED = "Cancelled",
}
export interface IProject extends Document {
  agencyId: Types.ObjectId;
  clientName: string;
  projectName: string;
  projectStatus: ProjectStatus;
  projectBudget: number;
}

// Chat Interface
// export enum ChatRole {
//   user = "user",
//   ai = "ai",
// }
export interface IChat {
  senderId: Types.ObjectId;
  messages: {
    role: "user" | "ai";
    content: string;
    timestamp: Date;
  }[];
}
