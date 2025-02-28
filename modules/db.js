import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_ATLAS}`;

//MONGODB FUNCTIONS
async function db() {
    try {
        await mongoose.connect(dbUrl);
        return true; 
    } catch (err) {
        console.error("DB Connection Error:", err);
    }
}

export default db;