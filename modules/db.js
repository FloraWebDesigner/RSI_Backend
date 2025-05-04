import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_ATLAS}`;

//MONGODB FUNCTIONS
async function db() {
    if (mongoose.connection.readyState !== 1) { 
      try {
        await mongoose.connect(dbUrl, {
          readPreference: 'primary',
          serverSelectionTimeoutMS: 5000
        });
        return true;
      } catch (err) {
        console.error("DB Connection Error:", err);
        return false;
      }
    }
    return true;
  }

export default db;