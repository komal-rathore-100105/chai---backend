import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const config = cloudinary.config();
console.log('Env vars:');
console.log('  CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('  CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? process.env.CLOUDINARY_API_KEY.substring(0, 6) + '...' : 'MISSING');
console.log('  CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? '***' : 'MISSING');

console.log('\nCloudinary config:');
console.log('  cloud_name:', config.cloud_name);
console.log('  api_key:', config.api_key ? config.api_key.substring(0, 6) + '...' : 'MISSING');
console.log('  api_secret:', config.api_secret ? '***' : 'MISSING');
