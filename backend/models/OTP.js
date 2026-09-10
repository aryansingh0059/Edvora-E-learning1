import emailTemplate from "../mail/templates/emailVerificationTemplate.js";
import mailSender from "../utils/mailSender.js";
import mongoose from "mongoose";

// Define OTP Schema
const OTPSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	otp: {
		type: String, // ✅ Fixed this line
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 5, // Automatically delete after 5 minutes
	},
});

// Function to send verification email
async function sendVerificationEmail(email, otp) {
	try {
		const mailResponse = await mailSender(
			email,
			"Verification Email",
			emailTemplate(otp)
		);
		console.log("✅ Email sent successfully:", mailResponse?.response);
	} catch (error) {
		console.error("❌ Error while sending email:", error);
	}
}

// Send email only when a new OTP document is created
OTPSchema.pre("save", async function (next) {
	console.log("📩 New OTP document created in DB");

	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
});

// Create and export OTP model
const OTP = mongoose.model("OTP", OTPSchema);
export default OTP;
