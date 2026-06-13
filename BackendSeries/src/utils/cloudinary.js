import { v2 as cloudinary } from "cloudinary"
import fs from "fs";

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // Configure cloudinary every time before upload to ensure env vars are loaded
        console.log("Before config - env vars:", {
            CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
            CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY ? "SET" : "MISSING",
            CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ? "SET" : "MISSING"
        });

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });

        const cfg = cloudinary.config();
        console.log("After config - cloudinary config:", {
            cloud_name: cfg.cloud_name,
            api_key: cfg.api_key ? "SET" : "MISSING",
            api_secret: cfg.api_secret ? "SET" : "MISSING"
        });

        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });
        // file has been uploaded successfully
        //console.log("file is uploaded on cloudinary", response.secure_url || response.url);
        // remove the locally saved temporary file
        try {
            fs.unlinkSync(localFilePath);
        } catch (e) {
            // ignore unlink errors
        }
        return response;
    } catch (error) {
        // log full error for debugging
        console.error('Cloudinary upload error for', localFilePath, error.message);
        // remove the locally saved temporary file as the upload operation failed
        if (localFilePath) {
            try {
                fs.unlinkSync(localFilePath);
            } catch (e) {
                // ignore unlink errors
            }
        }
        return null;
    }
}

export { uploadOnCloudinary }
// Click 'API Keys' above to copy your API secret

/*
    // Upload an image
    const uploadResult = await cloudinary.uploader
        .upload(
            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
            public_id: 'main-sample',
        }
        )
        .catch((error) => {
            console.log(error);
        });

    console.log(uploadResult);

    // Transform the image
    const imageUrl = cloudinary.image("main-sample");

    console.log(imageUrl);

})();
*/