import dotenv from "dotenv";
import mongoose from 'mongoose';
import connectDB from "./db/index.js";
import { app } from './app.js';  // Import the app from app.js


dotenv.config({
    path: './.env'
});

// Connect to MongoDB
connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port :${process.env.PORT || 8000}`);
    });
})
.catch((err) => {
    console.log("MONGO DB connection failed", err);
});
