import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";
import multer from "multer";
import {CloudinaryStorage} from "multer-storage-cloudinary"
dotenv.config(); 


cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.API_KEY,
  api_secret:process.env.API_SECRET,
})



const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "blog-images",
  },
});

export const upload = multer({ storage });

export default cloudinary;

