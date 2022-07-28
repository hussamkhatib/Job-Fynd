import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadFile = async (file: string) =>
  await cloudinary.v2.uploader.upload(file, {
    folder: process.env.CLOUDINARY_FOLDER,
  });

export { uploadFile };
