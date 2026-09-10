import {
  createVideoJobController,
  generateScriptController,
  pollVideoStatusController
} from "../controllers/virtualTeacherController.js"

import express from "express";

const router = express.Router();

router.post("/script", generateScriptController);
router.post("/video", createVideoJobController);
router.get("/video/:id", pollVideoStatusController);
router.get("/video-status/:id", pollVideoStatusController);

export default router;
