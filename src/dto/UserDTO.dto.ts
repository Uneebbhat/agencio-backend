import { Types } from "mongoose";
import { IUserDTO } from "../interfaces/index";

class UserDTO {
  _id: Types.ObjectId;
  name: string;
  email: string;
  profilePic: string;
  constructor(user: IUserDTO) {
    this._id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.profilePic = user.profilePic;
  }
}

export default UserDTO;
