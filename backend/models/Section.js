import mongoose from "mongoose";

// Define the Section schema
const sectionSchema = new mongoose.Schema({
	sectionName: {
		type: String,
	},
	Subsection: [
		{
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Subsection",
		},
	],
});

// Export the Section model
export default mongoose.model("Section", sectionSchema);