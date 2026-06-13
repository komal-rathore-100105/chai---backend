import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const mongoUrl = process.env.MONGODB_URL?.replace(/\/+$/, "")
        if (!mongoUrl) {
            throw new Error("MONGODB_URL environment variable is required")
        }
        const connectionInstance = await mongoose.connect(`${mongoUrl}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host} \n`)
    } catch (error) {
        console.log("MONGODB connection error", error);
        process.exit(1);
    }
}
export default connectDB;