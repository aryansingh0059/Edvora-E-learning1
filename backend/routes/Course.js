// Importing Middlewares
import { auth, isAdmin, isInstructor, isStudent } from "../middlewares/auth.js";
// Categories Controllers Import
import {
  categoryPageDetails,
  createCategory,
  showAllCategories,
} from "../controllers/Category.js";
// Course Controllers Import
import {
  createCourse,
  deleteCourse,
  editCourse,
  getAllCourses,
  getCourseDetails,
  getFullCourseDetails,
  getInstructorCourses,
} from "../controllers/Course.js";
// Rating Controllers Import
import {
  createRating,
  getAllRating,
  getAverageRating,
} from "../controllers/RatingandReview.js";
// Sections Controllers Import
import {
  createSection,
  deleteSection,
  updateSection,
} from "../controllers/Section.js";
// Sub-Sections Controllers Import
import {
  createSubsection,
  deleteSubsection,
  updateSubsection,
} from "../controllers/SubSection.js";

// Import the required modules
import express from "express";
// Course Progress Controller
import { updateCourseProgress } from "../controllers/CourseProgress.js";

const router = express.Router();

// Import the Controllers
// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse);
// Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection);
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection);
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection);
// Edit Sub Section
router.post("/updateSubsection", auth, isInstructor, updateSubsection);
// Delete Sub Section
router.post("/deleteSubsection", auth, isInstructor, deleteSubsection);
// Add a Sub Section to a Section
router.post("/addSubsection", auth, isInstructor, createSubsection);
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses);
// Get Details for a Specific Course
router.post("/getCourseDetails", getCourseDetails);
// Get Full Course Details
router.post("/getFullCourseDetails", auth, getFullCourseDetails);
// Edit Course routes
router.post("/editCourse", auth, isInstructor, editCourse);
// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);
// Delete a Course
router.delete("/deleteCourse", deleteCourse);

// Update Course Progress
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);

export default router;
