// import { useDispatch, useSelector } from "react-redux"

// import { ACCOUNT_TYPE } from "../../../utils/constants"
// import { BsFillCaretRightFill } from "react-icons/bs"
// import { FaShareSquare } from "react-icons/fa"
// import React from "react"
// import { addToCart } from "../../../slices/cartSlice"
// import copy from "copy-to-clipboard"
// import { toast } from "react-hot-toast"
// import { useNavigate } from "react-router-dom"

// function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
//   const { user } = useSelector((state) => state.profile)
//   const { token } = useSelector((state) => state.auth)
//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   const {
//     thumbnail: ThumbnailImage,
//     price: CurrentPrice,
//     _id: courseId,
//   } = course

//   const handleShare = () => {
//     copy(window.location.href)
//     toast.success("Link copied to clipboard")
//   }

//   const handleAddToCart = () => {
//     if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
//       toast.error("You are an Instructor. You can't buy a course.")
//       return
//     }
//     if (token) {
//       dispatch(addToCart(course))
//       return
//     }
//     setConfirmationModal({
//       text1: "You are not logged in!",
//       text2: "Please login to add To Cart",
//       btn1Text: "Login",
//       btn2Text: "Cancel",
//       btn1Handler: () => navigate("/login"),
//       btn2Handler: () => setConfirmationModal(null),
//     })
//   }

//   // console.log("Student already enrolled ", course?.studentsEnroled, user?._id)

//   return (
//     <>
//       <div
//         className={`flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5`}
//       >
//         {/* Course Image */}
//         <img
//           src={ThumbnailImage}
//           alt={course?.courseName}
//           className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
//         />

//         <div className="px-4">
//           <div className="space-x-3 pb-4 text-3xl font-semibold">
//             Rs. {CurrentPrice}
//           </div>
//           <div className="flex flex-col gap-4">
//             <button
//               className="yellowButton"
//               onClick={
//                 user && course?.studentsEnrolled.includes(user?._id)
//                   ? () => navigate("/dashboard/enrolled-courses")
//                   : handleBuyCourse
//               }
//             >
//               {user && course?.studentsEnrolled.includes(user?._id)
//                 ? "Go To Course"
//                 : "Buy Now"}
//             </button>
//             {(!user || !course?.studentsEnrolled.includes(user?._id)) && (
//               <button onClick={handleAddToCart} className="blackButton">
//                 Add to Cart
//               </button>
//             )}
//           </div>
//           <div>
//             <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
//               30-Day Money-Back Guarantee
//             </p>
//           </div>

//           <div className={``}>
//             <p className={`my-2 text-xl font-semibold `}>
//               This Course Includes :
//             </p>
//             <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
//               {course?.instructions?.map((item, i) => {
//                 return (
//                   <p className={`flex gap-2`} key={i}>
//                     <BsFillCaretRightFill />
//                     <span>{item}</span>
//                   </p>
//                 )
//               })}
//             </div>
//           </div>
//           <div className="text-center">
//             <button
//               className="mx-auto flex items-center gap-2 py-6 text-yellow-100 "
//               onClick={handleShare}
//             >
//               <FaShareSquare size={15} /> Share
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default CourseDetailsCard

import {
  BsClock,
  BsFillCaretRightFill,
  BsPlayCircle,
  BsShieldCheck,
  BsStarFill
} from "react-icons/bs"
import {
  FaCertificate,
  FaHeart,
  FaRegHeart,
  FaShareSquare,
  FaUsers
} from "react-icons/fa"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { ACCOUNT_TYPE } from "../../../utils/constants"
import { IoMdTime } from "react-icons/io"
import { MdOndemandVideo } from "react-icons/md"
import { addToCart } from "../../../slices/cartSlice"
import copy from "copy-to-clipboard"
import { motion } from "framer-motion"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLiked, setIsLiked] = useState(false)

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
    _id: courseId,
    rating,
    totalStudents,
    totalDuration,
    totalVideos,
  } = course

  const handleShare = () => {
    copy(window.location.href)
    toast.success("🎉 Link copied to clipboard!")
  }

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.")
      return
    }
    if (token) {
      dispatch(addToCart(course))
      toast.success("✅ Course added to cart!")
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  const isEnrolled = user && course?.studentsEnrolled.includes(user?._id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col rounded-3xl bg-gradient-to-br from-richblack-800 to-richblack-900 shadow-2xl shadow-richblack-500/20 overflow-hidden border border-richblack-600/30"
    >
      {/* Course Image with Overlay */}
      <div className="relative group">
        <img
          src={ThumbnailImage}
          alt={course?.courseName}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-richblack-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 p-2 rounded-full bg-richblack-700/80 backdrop-blur-sm text-richblack-100 hover:text-red-400 transition-colors duration-200"
        >
          {isLiked ? <FaHeart className="text-red-400" /> : <FaRegHeart />}
        </motion.button>
      </div>

      <div className="p-6">
        {/* Price Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
              ₹{CurrentPrice}
            </span>
            <span className="text-richblack-300 line-through text-lg">
              ₹{Math.round(CurrentPrice * 1.5)}
            </span>
          </div>
          <div className="text-sm font-semibold text-green-400 bg-green-400/20 px-3 py-1 rounded-full">
            33% OFF
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mb-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-4 px-6 rounded-xl font-bold text-richblack-900 transition-all duration-300 ${
              isEnrolled
                ? "bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 shadow-lg shadow-green-500/25"
                : "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 shadow-lg shadow-yellow-500/25"
            }`}
            onClick={
              isEnrolled
                ? () => navigate("/dashboard/enrolled-courses")
                : handleBuyCourse
            }
          >
            <div className="flex items-center justify-center gap-2">
              {isEnrolled ? (
                <>
                  <BsPlayCircle className="text-lg" />
                  <span>Continue Learning</span>
                </>
              ) : (
                <>
                  <BsShieldCheck className="text-lg" />
                  <span>Buy Now</span>
                </>
              )}
            </div>
          </motion.button>

          {!isEnrolled && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="w-full py-4 px-6 rounded-xl font-bold border-2 border-richblack-500 bg-richblack-700 text-richblack-5 hover:bg-richblack-600 hover:border-richblack-400 transition-all duration-300"
            >
              Add to Cart
            </motion.button>
          )}
        </div>

        {/* Guarantee Badge */}
        <div className="flex items-center justify-center gap-2 p-4 mb-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
          <BsShieldCheck className="text-blue-400 text-xl" />
          <span className="text-sm font-semibold text-richblack-5">
            30-Day Money-Back Guarantee
          </span>
        </div>

        {/* Course Highlights */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-richblack-5 mb-4 flex items-center gap-2">
            <BsStarFill className="text-yellow-400" />
            This Course Includes:
          </h3>
          <div className="space-y-3">
            {course?.instructions?.map((item, i) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                key={i}
                className="flex items-center gap-3 p-3 rounded-lg bg-richblack-700/50 hover:bg-richblack-700 transition-colors duration-200"
              >
                <BsFillCaretRightFill className="text-yellow-400 flex-shrink-0" />
                <span className="text-richblack-5 text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Course Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-richblack-700/50">
            <MdOndemandVideo className="text-blue-400 text-lg" />
            <div>
              <p className="text-xs text-richblack-300">Videos</p>
              <p className="text-sm font-semibold text-richblack-5">{totalVideos || 24}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-richblack-700/50">
            <IoMdTime className="text-green-400 text-lg" />
            <div>
              <p className="text-xs text-richblack-300">Duration</p>
              <p className="text-sm font-semibold text-richblack-5">{totalDuration || "8 hours"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-richblack-700/50">
            <FaUsers className="text-purple-400 text-lg" />
            <div>
              <p className="text-xs text-richblack-300">Students</p>
              <p className="text-sm font-semibold text-richblack-5">{totalStudents || "1.2k"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-richblack-700/50">
            <FaCertificate className="text-orange-400 text-lg" />
            <div>
              <p className="text-xs text-richblack-300">Certificate</p>
              <p className="text-sm font-semibold text-richblack-5">Yes</p>
            </div>
          </div>
        </div>

        {/* Share Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-300 hover:text-purple-200 hover:border-purple-400/30 transition-all duration-300"
        >
          <FaShareSquare className="text-lg" />
          <span className="font-semibold">Share this course</span>
        </motion.button>
      </div>
    </motion.div>
  )
}

export default CourseDetailsCard