import Razorpay from "razorpay";
import dotenv from "dotenv";
import { fileURLToPath } from "url"; // ✅ required for __dirname in ES module
import path from "path";

// ✅ define __dirname manually (ESM fix)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load .env file
dotenv.config({ path: path.join(__dirname, "../.env") });

// Debug logs (optional)
console.log("🔹 Razorpay Config Loaded");
console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
console.log("RAZORPAY_SECRET:", process.env.RAZORPAY_SECRET ? "Loaded ✅" : "Missing ❌");

// ✅ Validate keys
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_SECRET) {
  throw new Error("❌ RAZORPAY_KEY_ID or RAZORPAY_SECRET missing in .env file");
}

// ✅ Create Razorpay instance
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});
