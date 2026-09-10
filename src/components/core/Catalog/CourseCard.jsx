import {
  BsClock,
  BsFire,
  BsPeople,
  BsPlayCircle,
  BsShieldCheck,
  BsStarFill
} from 'react-icons/bs'
import { IoRibbon, IoTimer } from 'react-icons/io5'
import { useEffect, useState } from 'react'

import { FiCheckCircle } from 'react-icons/fi'
import GetAvgRating from '../../../utils/avgRating'
import { Link } from 'react-router-dom'
// import RatingStars from '../../common/RatingStars'
import { motion } from 'framer-motion'
// import { use } from 'react'
import { useNavigate } from 'react-router-dom'

const CourseCard = ({ course, Height, index }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews)
    setAvgReviewCount(count)
  }, [course])

  // const handleBookmark = (e) => {
  //   e.preventDefault()
  //   e.stopPropagation()
  //   setIsBookmarked(!isBookmarked)
  // }
  const navigate=useNavigate()

  const difficultyLevel = course?.difficulty || 'Beginner'
  const totalStudents = course?.studentsEnrolled?.length || 1247
  // const totalLessons = course?.courseContent?.reduce((acc, section) => 
  //   acc + (section?.Subsection?.length || 0), 0
  // ) || 24

  // Calculate discount
  const originalPrice = Math.round(course?.price * 1.5)
  const discountPercent = Math.round(((originalPrice - course?.price) / originalPrice) * 100)

  const getDifficultyColor = (level) => {
    switch(level.toLowerCase()) {
      case 'beginner': return 'from-green-400 to-emerald-500'
      case 'intermediate': return 'from-yellow-400 to-orange-500'
      case 'advanced': return 'from-red-400 to-pink-500'
      default: return 'from-blue-400 to-purple-500'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative flex-1 min-w-0"
    >
      <Link to={`/courses/${course._id}`}>
        <div className="relative h-full bg-gradient-to-br from-richblack-800 via-richblack-900 to-richblack-800 rounded-2xl overflow-hidden shadow-xl shadow-black/30 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300 border border-richblack-600/30">
          
          {/* 🔥 Hot Deal Floating Badge */}
          <motion.div 
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: -15 }}
            transition={{ delay: index * 0.2 + 0.3 }}
            className="absolute -top-2 -right-2 z-20"
          >
            <div className="relative">
              <div className="px-4 py-1 bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center shadow-lg rounded-full">
                <BsFire className="text-white mr-1 text-xs" />
                <span className="text-white font-bold text-xs">
                  {discountPercent}% OFF
                </span>
              </div>
            </div>
          </motion.div>

          {/* Trust Badges */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
            <div className="flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-600 px-2 py-1 rounded-full shadow-lg">
              <BsShieldCheck className="text-white text-xs" />
              <span className="text-xs font-bold text-white">Verified</span>
            </div>
          </div>

          {/* Image Container */}
          <div className="relative overflow-hidden">
            <div className={`${Height} w-full relative`}>
              <img
                src={course?.thumbnail}
                alt={course?.courseName}
                className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
              />
              
              {/* Loading Animation */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-r from-richblack-700 to-richblack-600 animate-pulse" />
              )}
              
              {/* Video Play Icon Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1.1 }}
                  className="p-4 bg-white/20 backdrop-blur-sm rounded-full border border-white/30"
                >
                  <BsPlayCircle className="text-3xl text-white" />
                </motion.div>
              </div>

              {/* Course Duration */}
              <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <BsClock className="text-yellow-400" />
                <span>8h 30m</span>
              </div>
            </div>
          </div>

          {/* Course Content - Fixed Height Container */}
          <div className="p-4 flex flex-col" style={{ minHeight: '220px' }}>
            {/* Category & Difficulty */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-blue-400 bg-blue-400/10 px-2 py-1 rounded-full">
                {course?.category || 'Development'}
              </span>
              <span className={`text-xs font-bold text-white px-2 py-1 rounded-full bg-gradient-to-r ${getDifficultyColor(difficultyLevel)}`}>
                {difficultyLevel}
              </span>
            </div>

            {/* Title - Fixed Height */}
            <h3 className="text-base font-bold text-richblack-5 line-clamp-2 mb-2 leading-tight min-h-[40px] flex items-start">
              {course?.courseName}
            </h3>

            {/* Instructor */}
            <p className="text-richblack-200 text-xs font-medium mb-3">
              By {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>

            {/* Rating & Students */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-1 bg-yellow-400/10 px-2 py-1 rounded-full">
                  <BsStarFill className="text-yellow-400 text-xs" />
                  <span className="text-yellow-400 font-bold text-xs">{avgReviewCount || 4.8}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-richblack-300 text-xs">
                <BsPeople className="text-purple-400" />
                <span>{totalStudents.toLocaleString()}+</span>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-1 mb-3">
              <div className="flex items-center gap-1 text-xs text-richblack-300">
                <FiCheckCircle className="text-green-400 text-xs" />
                <span>Certificate</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-richblack-300">
                <IoTimer className="text-orange-400 text-xs" />
                <span>Lifetime</span>
              </div>
            </div>

            {/* Price & CTA Section - Always Visible */}
            <div className="mt-auto pt-3 border-t border-richblack-600/50">
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-white">
                      ₹{course?.price}
                    </span>
                    <span className="text-richblack-400 line-through text-xs">
                      ₹{originalPrice}
                    </span>
                  </div>
                  <span className="text-green-400 text-xs font-bold">
                    Save ₹{originalPrice - course?.price}
                  </span>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-richblack-900 rounded-lg text-xs font-bold hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 shadow-lg shadow-yellow-500/25 whitespace-nowrap min-w-[80px]"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    // Add to cart logic
                    navigate(`/courses/${course._id}`)
                  }}
                >
                  Enroll Now
                </motion.button>
              </div>
            </div>
          </div>

          {/* Bestseller Badge */}
          {course?.isBestSeller && (
            <div className="absolute top-2 right-2">
              <div className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 px-2 py-1 rounded-full shadow-lg">
                <IoRibbon className="text-white text-xs" />
                <span className="text-xs font-bold text-white">Bestseller</span>
              </div>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

export default CourseCard