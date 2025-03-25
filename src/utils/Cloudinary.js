import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: "dimockbzs",
  api_key: "348235559219491",
  api_secret: "yq2wlT3QDeScHuXcMFcaUisrmuQ",
});

// Upload an image
const uploadfile = async (local_file_path) => {
  try {
    if (!local_file_path) return;

    const response = await cloudinary.uploader.upload(local_file_path, {
      resource_type: "auto",
    });
    //file uploader
    console.log("file uploaded on cloudinary", response.url);
    return response.url;
  } catch {
    //if file is not uploaded , it is still on our local storage . unlink from there to prevent corruption of files
    fs.unlinkSync(local_file_path);
    return null;
  }
};
