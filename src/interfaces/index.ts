// Add all interfaces here and then export them to use

import { Types } from "mongoose";

// User Interface
export interface IUser {
  name: string;
  email: string;
  password: string;
  profilePic: File | null | any;
}

export interface IUserDTO {
  // Add more fields as needed
  _id: Types.ObjectId;
  name: string;
  email: string;
  profilePic: File | null | any;
}
