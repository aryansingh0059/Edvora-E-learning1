import { auth, isAdmin, isInstructor, isStudent } from "../middlewares/auth.js"
import { capturePayment, sendPaymentSuccessEmail, verifyPayment } from "../controllers/Payment.js"

import express from "express"

const router = express.Router()

router.post("/capturePayment",auth, isStudent, capturePayment)
router.post("/verifyPayment",auth, isStudent, verifyPayment)
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);

export default router