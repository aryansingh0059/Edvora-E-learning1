import Section from "../models/Section.js";
import Subsection from "../models/SubSection.js";
import { uploadImageToCloudinary } from "../utils/imageUploader.js";
// Create a new sub-section for a given section
export const createSubsection = async (req, res) => {
  try {
    // Extract necessary information from the request body
    const { sectionId, title, description } = req.body
    const video = req.files.video

    // Check if all necessary fields are provided
    if (!sectionId || !title || !description || !video) {
      return res
        .status(404)
        .json({ success: false, message: "All Fields are Required" })
    }
    console.log(video)

    // Upload the video file to Cloudinary
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    )
    console.log(uploadDetails)
    // Create a new sub-section with the necessary information
    const SubsectionDetails = await Subsection.create({
      title: title,
      timeDuration: `${uploadDetails.duration}`,
      description: description,
      videoUrl: uploadDetails.secure_url,
    })

    // Update the corresponding section with the newly created sub-section
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      { $push: { Subsection: SubsectionDetails._id } },
      { new: true }
    ).populate("Subsection")

    // Return the updated section in the response
    return res.status(200).json({ success: true, data: updatedSection })
  } catch (error) {
    // Handle any errors that may occur during the process
    console.error("Error creating new sub-section:", error)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}

export const updateSubsection = async (req, res) => {
  try {
    const { sectionId, SubsectionId, title, description } = req.body
    const Subsection = await Subsection.findById(SubsectionId)

    if (!Subsection) {
      return res.status(404).json({
        success: false,
        message: "Subsection not found",
      })
    }

    if (title !== undefined) {
      Subsection.title = title
    }

    if (description !== undefined) {
      Subsection.description = description
    }
    if (req.files && req.files.video !== undefined) {
      const video = req.files.video
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      )
      Subsection.videoUrl = uploadDetails.secure_url
      Subsection.timeDuration = `${uploadDetails.duration}`
    }

    await Subsection.save()

    // find updated section and return it
    const updatedSection = await Section.findById(sectionId).populate(
      "Subsection"
    )

    console.log("updated section", updatedSection)

    return res.json({
      success: true,
      message: "Section updated successfully",
      data: updatedSection,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the section",
    })
  }
}

export const deleteSubsection = async (req, res) => {
  try {
    const { SubsectionId, sectionId } = req.body
    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          Subsection: SubsectionId,
        },
      }
    )
    const Subsection = await Subsection.findByIdAndDelete({ _id: SubsectionId })

    if (!Subsection) {
      return res
        .status(404)
        .json({ success: false, message: "Subsection not found" })
    }

    // find updated section and return it
    const updatedSection = await Section.findById(sectionId).populate(
      "Subsection"
    )

    return res.json({
      success: true,
      message: "Subsection deleted successfully",
      data: updatedSection,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the Subsection",
    })
  }
}