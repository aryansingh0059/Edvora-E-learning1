import {
  fetchCourseDetails,
  getFullDetailsOfCourse,
} from "../../../../services/operations/courseDetailsAPI"
import { setCourse, setEditCourse } from "../../../../slices/courseSlice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

import RenderSteps from "../AddCourse/RenderSteps"
import { useParams } from "react-router-dom"

export default function EditCourse() {
  const dispatch = useDispatch()
  const { courseId } = useParams()
  const { course } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const result = await getFullDetailsOfCourse(courseId, token)
      if (result?.courseDetails) {
        dispatch(setEditCourse(true))
        dispatch(setCourse(result?.courseDetails))
      }
      setLoading(false)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return (
      <div className="grid flex-1 place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Course
      </h1>
      <div className="mx-auto max-w-[600px]">
        {course ? (
          <RenderSteps />
        ) : (
          <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
            Course not found
          </p>
        )}
      </div>
    </div>
  )
}

// import { FiBook, FiEdit3, FiLoader } from "react-icons/fi"
// import {
//   fetchCourseDetails,
//   getFullDetailsOfCourse,
// } from "../../../../services/operations/courseDetailsAPI"
// import { setCourse, setEditCourse } from "../../../../slices/courseSlice"
// import { useDispatch, useSelector } from "react-redux"
// import { useEffect, useState } from "react"

// import RenderSteps from "../AddCourse/RenderSteps"
// import { useParams } from "react-router-dom"

// export default function EditCourse() {
//   const dispatch = useDispatch()
//   const { courseId } = useParams()
//   const { course } = useSelector((state) => state.course)
//   const [loading, setLoading] = useState(false)
//   const { token } = useSelector((state) => state.auth)

//   useEffect(() => {
//     ;(async () => {
//       setLoading(true)
//       try {
//         const result = await getFullDetailsOfCourse(courseId, token)
//         if (result?.courseDetails) {
//           dispatch(setEditCourse(true))
//           dispatch(setCourse(result?.courseDetails))
//         }
//       } catch (error) {
//         console.error("Error fetching course details:", error)
//       } finally {
//         setLoading(false)
//       }
//     })()
//   }, [courseId, token, dispatch])

//   // Beautiful loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-richblack-900 flex items-center justify-center p-6">
//         <div className="flex flex-col items-center justify-center space-y-6">
//           <div className="relative">
//             <div className="w-20 h-20 border-4 border-yellow-50/30 border-t-yellow-50 rounded-full animate-spin"></div>
//             <FiLoader className="absolute inset-0 m-auto text-yellow-50 text-2xl animate-pulse" />
//           </div>
//           <div className="text-center space-y-2">
//             <h3 className="text-2xl font-bold text-white">Loading Course Details</h3>
//             <p className="text-richblack-200 text-lg">Preparing your course for editing...</p>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-richblack-900 p-4 lg:p-6">
//       {/* Header Section */}
//       <div className="mb-8 lg:mb-12">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
//           <div className="space-y-4">
//             <div className="flex items-center gap-3">
//               <div className="p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
//                 <FiEdit3 className="text-2xl text-yellow-50" />
//               </div>
//               <div>
//                 <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
//                   Edit Course
//                 </h1>
//                 <p className="text-lg text-richblack-100">
//                   Update and refine your course content
//                 </p>
//               </div>
//             </div>
            
//             {/* Course Info Preview */}
//             {course && (
//               <div className="flex flex-wrap gap-4 mt-4">
//                 <div className="flex items-center gap-3 px-4 py-3 bg-richblack-800 rounded-xl border border-richblack-600">
//                   <FiBook className="text-yellow-50 text-xl" />
//                   <div>
//                     <p className="text-white font-semibold text-lg">{course.courseName}</p>
//                     <p className="text-richblack-200 text-sm">Course Name</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center gap-3 px-4 py-3 bg-richblack-800 rounded-xl border border-richblack-600">
//                   <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//                   <div>
//                     <p className="text-white font-semibold text-lg capitalize">{course.status || 'Draft'}</p>
//                     <p className="text-richblack-200 text-sm">Status</p>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-4xl mx-auto">
//         {course ? (
//           <div className="space-y-8">
//             {/* Progress Section */}
//             <div className="bg-richblack-800 rounded-2xl border border-richblack-600 p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-2xl font-bold text-white flex items-center gap-2">
//                   <FiEdit3 className="text-yellow-50" />
//                   Edit Course Steps
//                 </h2>
//                 <div className="text-richblack-200 text-sm">
//                   Complete all steps to publish
//                 </div>
//               </div>
//               <RenderSteps />
//             </div>

//             {/* Quick Tips */}
//             <div className="bg-blue-500/10 rounded-2xl border border-blue-500/20 p-6">
//               <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
//                 💡 Editing Tips
//               </h3>
//               <ul className="text-richblack-100 space-y-2 text-sm">
//                 <li className="flex items-start gap-2">
//                   <span className="text-blue-400 mt-1">•</span>
//                   Update course information in the first step
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <span className="text-blue-400 mt-1">•</span>
//                   Add or modify course content in the second step
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <span className="text-blue-400 mt-1">•</span>
//                   Review and publish your changes in the final step
//                 </li>
//               </ul>
//             </div>
//           </div>
//         ) : (
//           // Course Not Found State
//           <div className="flex flex-col items-center justify-center py-20 text-center">
//             <div className="w-24 h-24 bg-richblack-800 rounded-full flex items-center justify-center mb-6 border border-richblack-600">
//               <FiBook className="text-4xl text-richblack-400" />
//             </div>
//             <h3 className="text-2xl font-bold text-white mb-3">
//               Course Not Found
//             </h3>
//             <p className="text-richblack-200 text-lg mb-6 max-w-md">
//               The course you're trying to edit doesn't exist or you don't have permission to access it.
//             </p>
//             <div className="flex gap-4">
//               <button
//                 onClick={() => window.history.back()}
//                 className="px-6 py-3 bg-richblack-700 hover:bg-richblack-600 text-white font-semibold rounded-xl transition-all duration-200 border border-richblack-600"
//               >
//                 Go Back
//               </button>
//               <button
//                 onClick={() => window.location.reload()}
//                 className="px-6 py-3 bg-yellow-50 hover:bg-yellow-100 text-richblack-900 font-semibold rounded-xl transition-all duration-200"
//               >
//                 Try Again
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }