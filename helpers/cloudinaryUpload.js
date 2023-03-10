const cloudinary = require("cloudinary").v2;
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;
const Jimp = require("jimp");
const fs = require("fs");

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true,
});

const uploadToCloudinary = async (path) => {
  try {
    const resizeImg = await Jimp.read(path);
    resizeImg.cover(450, 450);
    await resizeImg.writeAsync(path);
    const result = await cloudinary.uploader.upload(path);
    fs.unlinkSync(path);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = uploadToCloudinary;
