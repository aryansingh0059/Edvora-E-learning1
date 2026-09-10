import { contactUsController } from "../controllers/ContactUs.js";
import express from "express";
const router = express.Router();

router.post("/contact", contactUsController);

export default router;
