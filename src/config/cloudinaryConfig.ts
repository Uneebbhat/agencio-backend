import { v2 as cloudinary } from "cloudinary";
import { CLOUD_API_KEY, CLOUD_API_SECRET, CLOUD_NAME } from "./constants";
import { config } from "dotenv";

config();

const cloudinaryConfig = (): void => {
  cloudinary.config({
    cloud_name: CLOUD_NAME as string,
    api_key: CLOUD_API_KEY as string,
    api_secret: CLOUD_API_SECRET as string,
  });
};

export default cloudinaryConfig;
