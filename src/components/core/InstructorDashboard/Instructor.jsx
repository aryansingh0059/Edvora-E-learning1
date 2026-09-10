import { BsGraphUp, BsPeople } from 'react-icons/bs'
import { FiBook, FiDollarSign, FiPlus, FiTrendingUp, FiUsers } from 'react-icons/fi'
import React, { useEffect, useState } from 'react'

import InstructorChart from './InstructorChart'
import { Link } from 'react-router-dom'
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI'
import { getInstructorData } from '../../../services/operations/profileAPI'
import { useSelector } from 'react-redux'

export default function Instructor() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const [loading, setLoading] = useState(false)
  const [instructorData, setInstructorData] = useState(null)
  const [courses, setCourses] = useState([])

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const instructorApiData = await getInstructorData(token)
      const result = await fetchInstructorCourses(token)
      
      if (instructorApiData?.length) setInstructorData(instructorApiData)
      if (result) setCourses(result)
      setLoading(false)
    })()
  }, [token])

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  ) || 0

  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  ) || 0

  // Loading Skeleton
  if (loading) {
    return (
      <div className="min-h-screen p-6 bg-richblack-900">
        <div className="animate-pulse space-y-6">
          {/* Header Skeleton */}
          <div className="space-y-3">
            <div className="h-8 bg-richblack-800 rounded w-48"></div>
            <div className="h-4 bg-richblack-800 rounded w-64"></div>
          </div>
          
          {/* Stats and Chart Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-96 bg-richblack-800 rounded-xl"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-richblack-800 rounded-xl"></div>
              ))}
            </div>
          </div>
          
          {/* Courses Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-richblack-800 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-richblack-900 p-4 lg:p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <h1 className="text-3xl lg:text-4xl font-bold text-richblack-5">
              Welcome back, <span className="bg-gradient-to-r from-yellow-50 to-yellow-100 bg-clip-text text-transparent">{user?.firstName}</span>! 👋
            </h1>
            <p className="text-lg text-richblack-200 font-medium italic">
              Ready to inspire your next generation of learners?
            </p>
          </div>
          
          {courses.length > 0 && (
            <Link 
              to="/dashboard/add-course"
              className="mt-4 lg:mt-0 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 text-richblack-900 font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
            >
              <FiPlus className="text-lg" />
              Create New Course
            </Link>
          )}
        </div>
      </div>

      {courses.length > 0 ? (
        <div className="space-y-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-richblack-800 border border-richblack-600 rounded-2xl p-6 transform hover:-translate-y-1 transition-all duration-300 hover:border-yellow-50/30 hover:shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-richblack-200 text-sm font-semibold uppercase tracking-wide">Total Courses</p>
                  <p className="text-3xl font-bold text-richblack-5 mt-2">{courses.length}</p>
                </div>
                <div className="p-3 bg-yellow-400/10 rounded-xl">
                  <FiBook className="text-2xl text-yellow-50" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-4">
                <FiTrendingUp className="text-blue-100" />
                <span className="text-blue-100 text-sm font-bold italic">Active and growing</span>
              </div>
            </div>

            <div className="bg-richblack-800 border border-richblack-600 rounded-2xl p-6 transform hover:-translate-y-1 transition-all duration-300 hover:border-yellow-50/30 hover:shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-richblack-200 text-sm font-semibold uppercase tracking-wide">Total Students</p>
                  <p className="text-3xl font-bold text-richblack-5 mt-2">{totalStudents.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-yellow-400/10 rounded-xl">
                  <FiUsers className="text-2xl text-yellow-50" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-4">
                <BsPeople className="text-blue-100" />
                <span className="text-blue-100 text-sm font-medium italic">Amazing learners</span>
              </div>
            </div>

            <div className="bg-richblack-800 border border-richblack-600 rounded-2xl p-6 transform hover:-translate-y-1 transition-all duration-300 hover:border-yellow-50/30 hover:shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-richblack-200 text-sm font-semibold uppercase tracking-wide">Total Income</p>
                  <p className="text-3xl font-bold text-richblack-5 mt-2">₹{totalAmount.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-yellow-400/10 rounded-xl">
                  <FiDollarSign className="text-2xl text-yellow-50" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-4">
                <BsGraphUp className="text-blue-100" />
                <span className="text-blue-100 text-sm font-medium italic">Impressive revenue</span>
              </div>
            </div>
          </div>

          {/* Chart and Additional Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart Section */}
            <div className="lg:col-span-2">
              {totalAmount > 0 || totalStudents > 0 ? (
                <InstructorChart courses={instructorData} />
              ) : (
                <div className="h-full bg-richblack-800 border border-richblack-600 rounded-2xl p-6 flex flex-col items-center justify-center">
                  <BsGraphUp className="text-6xl text-richblack-400 mb-4" />
                  <p className="text-xl font-bold text-richblack-5 text-center">Not Enough Data To Visualize</p>
                  <p className="text-richblack-300 text-center mt-2 italic">Start teaching to see your analytics here</p>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <div className="bg-richblack-800 border border-richblack-600 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-richblack-5 mb-4 flex items-center gap-2">
                  <FiTrendingUp className="text-yellow-50" />
                  Performance Insights
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-richblack-200">Avg. Students/Course</span>
                    <span className="text-richblack-5 font-semibold">
                      {courses.length > 0 ? Math.round(totalStudents / courses.length) : 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-richblack-200">Avg. Revenue/Course</span>
                    <span className="text-richblack-5 font-semibold">
                      ₹{courses.length > 0 ? Math.round(totalAmount / courses.length).toLocaleString() : 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-richblack-200">Completion Rate</span>
                    <span className="text-green-400 font-semibold italic">85%</span>
                  </div>
                </div>
              </div>

              <div className="bg-richblack-800 border border-richblack-600 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-richblack-5 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link 
                    to="/dashboard/add-course"
                    className="block w-full text-center py-2 bg-yellow-50 hover:bg-yellow-100 text-richblack-900 font-semibold rounded-lg transition-all duration-200 transform hover:-translate-y-0.5"
                  >
                    Create Course
                  </Link>
                  <Link 
                    to="/dashboard/my-courses"
                    className="block w-full text-center py-2 border border-yellow-50 text-yellow-50 hover:bg-yellow-50/10 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5"
                  >
                    Manage Courses
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Courses */}
          <div className="bg-richblack-800 border border-richblack-600 rounded-2xl p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <h2 className="text-2xl font-bold text-richblack-5 flex items-center gap-2">
                <FiBook className="text-yellow-50" />
                Your Courses
              </h2>
              <Link 
                to="/dashboard/my-courses"
                className="mt-2 lg:mt-0 inline-flex items-center gap-2 text-yellow-50 hover:text-yellow-100 font-semibold transition-colors duration-200 italic"
              >
                View All Courses
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.slice(0, 3).map((course) => (
                <div 
                  key={course._id} 
                  className="group bg-richblack-700 border border-richblack-600 rounded-xl overflow-hidden hover:border-yellow-50/50 transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.courseName}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-richblack-900/80 to-transparent"></div>
                    <div className="absolute bottom-3 left-3">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-50/90 text-richblack-900 text-xs font-semibold rounded-full">
                        <FiUsers className="w-3 h-3" />
                        {course.studentsEnrolled?.length || 0} students
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-richblack-5 line-clamp-2 group-hover:text-yellow-50 transition-colors duration-200">
                      {course.courseName}
                    </h3>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-lg font-bold text-green-400">
                        ₹{course.price}
                      </span>
                      <span className="text-sm text-richblack-300 italic">
                        {course.category?.name || 'General'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Empty State
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-32 h-32 bg-richblack-800 rounded-full flex items-center justify-center mb-6 border border-yellow-50/20">
            <FiBook className="text-6xl text-yellow-50" />
          </div>
          <h2 className="text-3xl font-bold text-richblack-5 mb-4">
            Start Your Teaching Journey
          </h2>
          <p className="text-richblack-300 text-lg mb-8 max-w-md italic">
            Create your first course and share your knowledge with students around the world.
          </p>
          <Link 
            to="/dashboard/add-course"
            className="inline-flex items-center gap-3 px-8 py-4 bg-yellow-50 hover:bg-yellow-100 text-richblack-900 font-bold rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
          >
            <FiPlus className="text-xl" />
            Create Your First Course
          </Link>
        </div>
      )}
    </div>
  )
}




