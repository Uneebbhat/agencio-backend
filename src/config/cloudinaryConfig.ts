import { v2 as cloudinary } from "cloudinary";
import { CLOUD_API_KEY, CLOUD_API_SECRET, CLOUD_NAME } from "./constants";
import { config } from "dotenv";

config();

const cloudinaryConfig = () => {
  cloudinary.config({
    cloud_name: "dhxelcjwn",
    api_key: "239882197132722",
    api_secret: "AI2FZu6iavHX3kglJBHsc9KNajM",
  });
};

export default cloudinaryConfig;
