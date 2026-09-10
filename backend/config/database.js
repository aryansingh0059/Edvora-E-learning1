import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL || process.env.MONGODB_URI)
    .then(() => console.log("✅ DB Connected Successfully"))
    .catch((error) => {
      console.log("❌ DB Connection Failed");
      console.error(error);
      process.exit(1);
    });
};

