// require('dotenv').config({ path: './env' })
import dotenv from "dotenv";

console.log("[1] dotenv module imported");

// Load env vars IMMEDIATELY before any other imports
dotenv.config({
    path: './.env'
});
console.log("[2] dotenv.config() called - vars loaded");
console.log("[2.1] CLOUDINARY_API_KEY in process.env:", process.env.CLOUDINARY_API_KEY ? "✓ SET" : "✗ MISSING");

// Use dynamic imports to ensure dotenv runs first
console.log("[3] About to import app.js...");
const { app } = await import("./app.js");
console.log("[4] app.js imported");
console.log("[4.1] CLOUDINARY_API_KEY still in process.env:", process.env.CLOUDINARY_API_KEY ? "✓ SET" : "✗ MISSING");

const connectDB = (await import("./db/index.js")).default;
console.log("[5] db/index.js imported");

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port : ${process.env.PORT || 8000}`);
        });
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!!", err);
    });









/*
import express from "express";
const app = express()
(async () => {
    try {
       await mongoose.connect(`${process.env.MONGODB_URL}`)
        app.on("error", (error) => {
            console.log("ERRor: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`)
        })
    }
    catch (error) {
        console.error("Error: ", error)
        throw error
    }
})()
*/