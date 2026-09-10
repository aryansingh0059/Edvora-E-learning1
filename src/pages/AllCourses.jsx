import { AnimatePresence, motion } from "framer-motion"
import {
  BsPeople,
  BsStarFill
} from "react-icons/bs"
import {
  FiChevronDown,
  FiGrid,
  FiList,
  FiSearch,
  FiTrendingUp
} from "react-icons/fi"
import React, { useEffect, useState } from "react"

import { IoSparkles } from "react-icons/io5"
import { apiConnector } from "../services/apiConnector"
import { courseEndpoints } from "../services/apis"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const AllCourses = () => {
  const [allCourses, setAllCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [viewMode, setViewMode] = useState("grid")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await apiConnector("GET", courseEndpoints.GET_ALL_COURSE_API)
        if (res?.data?.success) {
          setAllCourses(res.data.data)
        } else {
          console.error("Invalid response:", res)
        }
      } catch (error) {
        console.error("❌ Error fetching courses:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  const filteredCourses = allCourses
    .filter((course) => {
      const matchesSearch =
        course.courseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return (b.rating || 0) - (a.rating || 0)
        case "students":
          return (b.studentsEnrolled?.length || 0) - (a.studentsEnrolled?.length || 0)
        default:
          return (b.studentsEnrolled?.length || 0) - (a.studentsEnrolled?.length || 0)
      }
    })

  const categories = [...new Set(allCourses.map((c) => c.category).filter(Boolean))]

  const cardVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 20 },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: { type: "spring", stiffness: 300, damping: 22 },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-richblack-900 via-richblack-800 to-richblack-900 text-white overflow-hidden">
      {/* Hero */}
      <div className="relative py-24 text-center border-b border-richblack-700/40 bg-gradient-to-br from-richblack-800/70 to-richblack-900/80 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 px-6 py-3 rounded-2xl border border-yellow-400/30 mb-6 backdrop-blur-sm">
              <IoSparkles className="text-yellow-400 text-xl" />
              <span className="text-yellow-400 font-semibold">
                Learn. Grow. Succeed.
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent mb-6 animate-gradient">
              Explore Courses
            </h1>

            <p className="text-xl text-richblack-200 max-w-3xl mx-auto leading-8 mb-8">
              Discover your potential with{" "}
              <span className="text-yellow-400 font-semibold">{allCourses.length}+</span>{" "}
              expert-led courses and hands-on learning.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-richblack-800/70 backdrop-blur-lg border border-richblack-700/50 rounded-3xl shadow-2xl p-8 mb-12"
        >
          <div className="flex flex-col lg:flex-row items-center gap-6 justify-between">
            {/* Search */}
            <div className="relative w-full lg:max-w-lg">
              <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-richblack-400 text-xl" />
              <input
                type="text"
                placeholder="Search for courses, instructors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-richblack-700/80 border border-richblack-600 rounded-2xl text-richblack-50 placeholder-richblack-400 focus:border-yellow-500 focus:outline-none text-lg transition-all"
              />
            </div>

            {/* Category + Sort + View */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Category */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-richblack-700/80 border border-richblack-600 rounded-2xl pl-5 pr-10 py-3 text-richblack-50 focus:border-yellow-500 focus:outline-none transition-all min-w-[180px]"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-richblack-400 pointer-events-none" />
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-richblack-700/80 border border-richblack-600 rounded-2xl pl-5 pr-10 py-3 text-richblack-50 focus:border-yellow-500 focus:outline-none transition-all min-w-[180px]"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="students">Most Enrolled</option>
                </select>
                <FiTrendingUp className="absolute right-4 top-1/2 transform -translate-y-1/2 text-richblack-400 pointer-events-none" />
              </div>

              {/* View toggle */}
              <div className="flex bg-richblack-700/80 rounded-2xl p-2 border border-richblack-600">
                {["grid", "list"].map((mode) => (
                  <motion.button
                    key={mode}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setViewMode(mode)}
                    className={`p-3 rounded-xl ${viewMode === mode
                      ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-richblack-900 shadow-lg"
                      : "text-richblack-400 hover:text-yellow-400"
                      }`}
                  >
                    {mode === "grid" ? <FiGrid /> : <FiList />}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Course grid */}
        {loading ? (
          <div className="flex justify-center py-24">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full"
            />
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-20">
            <FiSearch className="text-5xl text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">No courses found</h3>
            <p className="text-richblack-300">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <motion.div
            layout
            className={`${viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              : "flex flex-col gap-6"
              }`}
          >
            <AnimatePresence>
              {filteredCourses.map((course) => (
                <motion.div
                  key={course._id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  className="group relative bg-richblack-800/70 border border-richblack-700 rounded-3xl overflow-hidden backdrop-blur-md shadow-xl hover:shadow-yellow-500/20 transition-all flex flex-col"
                >
                  <div className="relative">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      src={course.thumbnail}
                      alt={course.courseName}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-richblack-900/90 via-richblack-900/40 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 text-xs font-bold px-3 py-1 rounded-full">
                        {course.category || "Development"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between flex-1 p-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-yellow-400 transition">
                        {course.courseName}
                      </h3>
                      <p className="text-sm text-richblack-300 mb-4">
                        By{" "}
                        <span className="text-yellow-400">
                          {course.instructor?.firstName} {course.instructor?.lastName}
                        </span>
                      </p>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-yellow-400">
                          <BsStarFill />
                          <span>4.8</span>
                        </div>
                        <div className="text-richblack-400 flex items-center gap-1">
                          <BsPeople />
                          <span>{course.studentsEnrolled?.length || 0}</span>
                        </div>
                      </div>
                    </div>

                    {/* ✅ Enroll button always visible */}
                    {/* <div className="mt-5 flex justify-between items-center border-t border-richblack-700 pt-3">
                      <span className="text-xl font-bold text-yellow-400">₹{course.price}</span>
                      <motion.button
                      oncClick={() => toast.success("Enroll feature coming soon!")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold hover:from-yellow-500 hover:to-orange-600 shadow-md shadow-yellow-500/30 transition"
                      >
                        Enroll
                      </motion.button>
                    </div> */}
                    <div className="mt-5 flex justify-between items-center border-t border-richblack-700 pt-3">
                      <span className="text-xl font-bold text-yellow-400">₹{course.price}</span>
                      <motion.button
                        onClick={() => navigate(`/courses/${course._id}`)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold hover:from-yellow-500 hover:to-orange-600 shadow-md shadow-yellow-500/30 transition"
                      >
                        Enroll
                      </motion.button>
                    </div>

                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AllCourses
