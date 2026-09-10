import { useEffect, useState } from "react"

import { BiDotsVerticalRounded } from "react-icons/bi"
import ProgressBar from "@ramonak/react-progress-bar"
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState(null)

  const getEnrolledCourses = async () => {
    try {
      const res = await getUserEnrolledCourses(token)
      setEnrolledCourses(res)
    } catch (error) {
      console.log("Could not fetch enrolled courses.")
    }
  }

  useEffect(() => {
    getEnrolledCourses()
  }, [])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-3xl font-bold text-richblack-5">
        Enrolled <span className="text-yellow-50">Courses</span>
      </div>

      {!enrolledCourses ? (
        // Loading State
        <div className="grid min-h-[400px] place-items-center rounded-2xl border border-richblack-700 bg-richblack-800/50">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-richblack-500 border-t-yellow-400 rounded-full animate-spin mx-auto"></div>
            <p className="text-richblack-200">Loading your courses...</p>
          </div>
        </div>
      ) : !enrolledCourses.length ? (
        // Empty State
        <div className="grid min-h-[400px] place-items-center rounded-2xl border border-richblack-700 bg-richblack-800/50">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-richblack-700 rounded-full flex items-center justify-center mx-auto">
              <BiDotsVerticalRounded className="text-3xl text-richblack-400" />
            </div>
            <p className="text-xl text-richblack-200 font-medium">
              No Courses Enrolled Yet
            </p>
            <p className="text-richblack-400 max-w-md">
              You haven't enrolled in any courses. Start your learning journey by exploring our catalog.
            </p>
          </div>
        </div>
      ) : (
        // Courses List
        <div className="space-y-4">
          {/* Table Headings */}
          <div className="flex rounded-2xl bg-richblack-700 px-6 py-4 shadow-lg">
            <p className="w-[45%] text-sm font-semibold text-richblack-50">COURSE NAME</p>
            <p className="w-1/4 text-sm font-semibold text-richblack-50">DURATION</p>
            <p className="flex-1 text-sm font-semibold text-richblack-50">PROGRESS</p>
          </div>

          {/* Courses List */}
          <div className="space-y-3">
            {enrolledCourses.map((course, i) => (
              <div
                className="group flex items-center rounded-2xl border border-richblack-700 bg-richblack-800/50 p-4 transition-all duration-300 hover:border-richblack-500 hover:bg-richblack-700/30 hover:shadow-xl"
                key={course._id}
              >
                {/* Course Info */}
                <div
                  className="flex w-[45%] cursor-pointer items-center gap-4"
                  onClick={() => {
                    navigate(
                      `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.Subsection?.[0]?._id}`
                    )
                  }}
                >
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="h-16 w-16 rounded-xl object-cover shadow-md transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="flex flex-col gap-2">
                    <p className="font-semibold text-richblack-5 group-hover:text-yellow-50 transition-colors duration-300">
                      {course.courseName}
                    </p>
                    <p className="text-xs text-richblack-300 line-clamp-2">
                      {course.courseDescription.length > 60
                        ? `${course.courseDescription.slice(0, 60)}...`
                        : course.courseDescription}
                    </p>
                  </div>
                </div>

                {/* Duration */}
                <div className="w-1/4 px-4">
                  <p className="text-sm font-medium text-richblack-50">
                    {course?.totalDuration}
                  </p>
                </div>

                {/* Progress */}
                <div className="flex w-1/5 flex-col gap-3 px-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-richblack-50">
                      {course.progressPercentage || 0}%
                    </span>
                  </div>
                  <ProgressBar
                    completed={course.progressPercentage || 0}
                    height="10px"
                    bgColor="#E2C044"
                    baseBgColor="#2C333F"
                    isLabelVisible={false}
                    borderRadius="4px"
                    className="shadow-inner"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}