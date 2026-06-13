import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

console.log("=== Cloudinary Upload Diagnostic ===\n");

// Check env vars
console.log("1. Env Vars:");
console.log("  CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("  CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY?.substring(0, 6) + '...');
console.log("  CLOUDINARY_API_SECRET:", process.env.CLOUDINARY_API_SECRET?.substring(0, 6) + '...');

// Configure Cloudinary
console.log("\n2. Configuring Cloudinary...");
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const cfg = cloudinary.config();
console.log("  cloud_name:", cfg.cloud_name);
console.log("  api_key:", cfg.api_key?.substring(0, 6) + '...');
console.log("  api_secret:", cfg.api_secret?.substring(0, 6) + '...');

// Try uploading a test file if it exists
const testFile = 'public/temp/IMG20260607162242.jpg';
console.log("\n3. Test File:");
console.log("  Path:", testFile);
console.log("  Exists:", fs.existsSync(testFile) ? 'YES' : 'NO');

if (fs.existsSync(testFile)) {
    console.log("\n4. Attempting Upload...");
    try {
        const result = await cloudinary.uploader.upload(testFile, {
            resource_type: 'auto'
        });
        console.log("  ✓ SUCCESS!");
        console.log("  public_id:", result.public_id);
        console.log("  secure_url:", result.secure_url);
    } catch (err) {
        console.log("  ✗ FAILED!");
        console.log("  Error:", err.message);
        console.log("  Code:", err.code);
        console.log("  Full error:", JSON.stringify(err, null, 2));
    }
} else {
    console.log("  Test file not found - cannot attempt upload");
}
