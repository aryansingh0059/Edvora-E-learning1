import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"

import { FaCheck, FaEye, FaRegClock } from "react-icons/fa"
import { FiEdit2, FiEye } from "react-icons/fi"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI"
import { setCourse, setEditCourse } from "../../../../slices/courseSlice"
import { useDispatch, useSelector } from "react-redux"

import { COURSE_STATUS } from "../../../../utils/constants"
import ConfirmationModal from "../../../common/ConfirmationModal"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { formatDate } from "../../../../services/formatDate"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function CourseTable({ courses, setCourses }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const TRUNCATE_LENGTH = 25

  const handleCourseDelete = async (courseId) => {
    setLoading(true)
    await deleteCourse({ courseId: courseId }, token)
    const result = await fetchInstructorCourses(token)
    if (result) {
      setCourses(result)
    }
    setConfirmationModal(null)
    setLoading(false)
  }

  const getStatusBadge = (status) => {
    if (status === COURSE_STATUS.DRAFT) {
      return (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-richblack-700 border border-pink-500/30">
          <HiClock className="text-pink-400 text-sm" />
          <span className="text-pink-300 text-xs font-semibold">Drafted</span>
        </div>
      )
    }
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-richblack-700 border border-green-500/30">
        <div className="w-3 h-3 rounded-full bg-green-400 flex items-center justify-center">
          <FaCheck className="text-richblack-900 text-xs" />
        </div>
        <span className="text-green-300 text-xs font-semibold">Published</span>
      </div>
    )
  }

  return (
    <>
      <div className="overflow-x-auto">
        <Table className="w-full">
          <Thead>
            <Tr className="bg-richblack-700 border-b border-richblack-600">
              <Th className="px-6 py-4 text-left text-sm font-semibold text-richblack-5 uppercase tracking-wider">
                Course Details
              </Th>
              <Th className="px-6 py-4 text-left text-sm font-semibold text-richblack-5 uppercase tracking-wider">
                Duration
              </Th>
              <Th className="px-6 py-4 text-left text-sm font-semibold text-richblack-5 uppercase tracking-wider">
                Price
              </Th>
              <Th className="px-6 py-4 text-left text-sm font-semibold text-richblack-5 uppercase tracking-wider">
                Status
              </Th>
              <Th className="px-6 py-4 text-left text-sm font-semibold text-richblack-5 uppercase tracking-wider">
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody className="divide-y divide-richblack-600">
            {courses?.length === 0 ? (
              <Tr>
                <Td colSpan={5} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <FiEye className="text-4xl text-richblack-400 mb-3" />
                    <p className="text-xl font-semibold text-richblack-5 mb-2">No courses found</p>
                    <p className="text-richblack-300 italic">Create your first course to get started</p>
                  </div>
                </Td>
              </Tr>
            ) : (
              courses?.map((course) => (
                <Tr 
                  key={course._id} 
                  className="bg-richblack-800 hover:bg-richblack-750 transition-all duration-200 group"
                >
                  <Td className="px-6 py-4">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <img
                          src={course?.thumbnail}
                          alt={course?.courseName}
                          className="h-20 w-32 rounded-xl object-cover group-hover:scale-105 transition-transform duration-300 shadow-lg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-richblack-900/50 to-transparent rounded-xl"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-richblack-5 group-hover:text-yellow-50 transition-colors duration-200 line-clamp-1">
                          {course.courseName}
                        </h3>
                        <p className="text-richblack-300 text-sm mt-1 line-clamp-2 italic">
                          {course.courseDescription.split(" ").length > TRUNCATE_LENGTH
                            ? course.courseDescription
                                .split(" ")
                                .slice(0, TRUNCATE_LENGTH)
                                .join(" ") + "..."
                            : course.courseDescription}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs text-richblack-400">
                            Created: {course.createdAt ? formatDate(course.createdAt) : 'N/A'}
                          </span>
                          <span className="text-xs text-richblack-400 flex items-center gap-1">
                            <FiEye className="text-sm" />
                            {course.studentsEnrolled?.length || 0} students
                          </span>
                        </div>
                      </div>
                    </div>
                  </Td>
                  <Td className="px-6 py-4">
                    <div className="text-richblack-5 font-medium">
                      2h 30m
                    </div>
                    <div className="text-richblack-400 text-sm italic">
                      Total duration
                    </div>
                  </Td>
                  <Td className="px-6 py-4">
                    <div className="text-lg font-bold text-green-400">
                      ₹{course.price}
                    </div>
                    <div className="text-richblack-400 text-sm">
                      Course price
                    </div>
                  </Td>
                  <Td className="px-6 py-4">
                    {getStatusBadge(course.status)}
                  </Td>
                  <Td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        disabled={loading}
                        onClick={() => {
                          navigate(`/dashboard/edit-course/${course._id}`)
                        }}
                        className="p-2 rounded-lg bg-richblack-700 hover:bg-yellow-50 hover:text-richblack-900 border border-richblack-600 hover:border-yellow-50 transition-all duration-200 transform hover:scale-110 group"
                        title="Edit Course"
                      >
                        <FiEdit2 size={18} className="text-richblack-300 group-hover:text-richblack-900" />
                      </button>
                      
                      <button
                        onClick={() => {
                          navigate(`/course-preview/${course._id}`)
                        }}
                        className="p-2 rounded-lg bg-richblack-700 hover:bg-blue-500 border border-richblack-600 hover:border-blue-500 transition-all duration-200 transform hover:scale-110 group"
                        title="Preview Course"
                      >
                        <FaEye size={16} className="text-richblack-300 group-hover:text-white" />
                      </button>

                      <button
                        disabled={loading}
                        onClick={() => {
                          setConfirmationModal({
                            text1: "Delete This Course?",
                            text2: "This action cannot be undone. All course data will be permanently removed.",
                            btn1Text: !loading ? "Delete Course" : "Deleting...",
                            btn2Text: "Cancel",
                            btn1Handler: !loading
                              ? () => handleCourseDelete(course._id)
                              : () => {},
                            btn2Handler: !loading
                              ? () => setConfirmationModal(null)
                              : () => {},
                          })
                        }}
                        className="p-2 rounded-lg bg-richblack-700 hover:bg-red-500 border border-richblack-600 hover:border-red-500 transition-all duration-200 transform hover:scale-110 group"
                        title="Delete Course"
                      >
                        <RiDeleteBin6Line size={18} className="text-richblack-300 group-hover:text-white" />
                      </button>
                    </div>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}