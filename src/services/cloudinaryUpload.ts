import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import cloudinaryConfig from "../config/cloudinaryConfig";

cloudinaryConfig();

const cloudinaryUpload = async (
  filepath: string,
  options = {}
): Promise<UploadApiResponse> => {
  try {
    return await cloudinary.uploader.upload(filepath, options);
  } catch (error: any) {
    throw new Error(`Error while uploading image: ${error.message}`);
  }
};

export default cloudinaryUpload;
