// import { useEffect, useState } from "react"
// import { useLocation, useNavigate, useParams } from "react-router-dom"

// import { BsChevronDown } from "react-icons/bs"
// import IconBtn from "../../common/IconBtn"
// import { IoIosArrowBack } from "react-icons/io"
// import { useSelector } from "react-redux"

// export default function VideoDetailsSidebar({ setReviewModal }) {
//   const [activeStatus, setActiveStatus] = useState("")
//   const [videoBarActive, setVideoBarActive] = useState("")
//   const navigate = useNavigate()
//   const location = useLocation()
//   const { sectionId, SubsectionId } = useParams()
//   const {
//     courseSectionData,
//     courseEntireData,
//     totalNoOfLectures,
//     completedLectures,
//   } = useSelector((state) => state.viewCourse)

//   useEffect(() => {
//     ;(() => {
//       if (!courseSectionData.length) return
//       const currentSectionIndx = courseSectionData.findIndex(
//         (data) => data._id === sectionId
//       )
//       const currentSubsectionIndx = courseSectionData?.[
//         currentSectionIndx
//       ]?.Subsection.findIndex((data) => data._id === SubsectionId)
//       const activeSubsectionId =
//         courseSectionData[currentSectionIndx]?.Subsection?.[
//           currentSubsectionIndx
//         ]?._id
//       setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
//       setVideoBarActive(activeSubsectionId)
//     })()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [courseSectionData, courseEntireData, location.pathname])

//   return (
//     <>
//       <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
//         <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
//           <div className="flex w-full items-center justify-between ">
//             <div
//               onClick={() => {
//                 navigate(`/dashboard/enrolled-courses`)
//               }}
//               className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
//               title="back"
//             >
//               <IoIosArrowBack size={30} />
//             </div>
//             <IconBtn
//               text="Add Review"
//               customClasses="ml-auto"
//               onclick={() => setReviewModal(true)}
//             />
//           </div>
//           <div className="flex flex-col">
//             <p>{courseEntireData?.courseName}</p>
//             <p className="text-sm font-semibold text-richblack-500">
//               {completedLectures?.length} / {totalNoOfLectures}
//             </p>
//           </div>
//         </div>

//         <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
//           {courseSectionData.map((course, index) => (
//             <div
//               className="mt-2 cursor-pointer text-sm text-richblack-5"
//               onClick={() => setActiveStatus(course?._id)}
//               key={index}
//             >
//               {/* Section */}
//               <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
//                 <div className="w-[70%] font-semibold">
//                   {course?.sectionName}
//                 </div>
//                 <div className="flex items-center gap-3">
//                   {/* <span className="text-[12px] font-medium">
//                     Lession {course?.Subsection.length}
//                   </span> */}
//                   <span
//                     className={`${
//                       activeStatus === course?.sectionName
//                         ? "rotate-0"
//                         : "rotate-180"
//                     } transition-all duration-500`}
//                   >
//                     <BsChevronDown />
//                   </span>
//                 </div>
//               </div>

//               {/* Sub Sections */}
//               {activeStatus === course?._id && (
//                 <div className="transition-[height] duration-500 ease-in-out">
//                   {course.Subsection.map((topic, i) => (
//                     <div
//                       className={`flex gap-3  px-5 py-2 ${
//                         videoBarActive === topic._id
//                           ? "bg-yellow-200 font-semibold text-richblack-800"
//                           : "hover:bg-richblack-900"
//                       } `}
//                       key={i}
//                       onClick={() => {
//                         navigate(
//                           `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
//                         )
//                         setVideoBarActive(topic._id)
//                       }}
//                     >
//                       <input
//                         type="checkbox"
//                         checked={completedLectures.includes(topic?._id)}
//                         onChange={() => {}}
//                       />
//                       {topic.title}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   )
// }

import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import { BsChevronDown } from "react-icons/bs"
import IconBtn from "../../common/IconBtn"
import { IoIosArrowBack } from "react-icons/io"
import { useSelector } from "react-redux"

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const { sectionId, SubsectionId } = useParams()
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)

  useEffect(() => {
    if (!courseSectionData.length) return
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    const currentSubsectionIndx = courseSectionData?.[
      currentSectionIndx
    ]?.Subsection.findIndex((data) => data._id === SubsectionId)
    const activeSubsectionId =
      courseSectionData[currentSectionIndx]?.Subsection?.[
        currentSubsectionIndx
      ]?._id
    setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
    setVideoBarActive(activeSubsectionId)
  }, [courseSectionData, sectionId, SubsectionId, location.pathname])

  const handleAddReview = () => {
    setReviewModal(true)
    // Force scroll to top to ensure modal is visible
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r border-r-richblack-700 bg-richblack-800">
      {/* Header Section */}
      <div className="mx-5 flex flex-col items-start justify-between gap-4 border-b border-richblack-600 py-6">
        <div className="flex w-full items-center justify-between">
          <button
            onClick={() => navigate(`/dashboard/enrolled-courses`)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-richblack-100 text-richblack-700 hover:scale-95 transition-all duration-300"
            title="Back to courses"
          >
            <IoIosArrowBack size={24} />
          </button>
          <IconBtn
            text="Add Review"
            onclick={handleAddReview}
            customClasses="px-4 py-2 text-sm bg-yellow-50 text-richblack-900 hover:bg-yellow-200"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-bold text-richblack-5">
            {courseEntireData?.courseName}
          </p>
          <p className="text-sm font-semibold text-richblack-400">
            {completedLectures?.length} of {totalNoOfLectures} lectures completed
          </p>
        </div>
      </div>

      {/* Course Content */}
      <div className="flex-1 overflow-y-auto">
        {courseSectionData.map((course, index) => (
          <div key={course._id} className="text-richblack-5">
            {/* Section Header */}
            <div 
              className="flex justify-between items-center bg-richblack-700 px-5 py-4 hover:bg-richblack-600 transition-colors duration-200 cursor-pointer"
              onClick={() => setActiveStatus(activeStatus === course._id ? "" : course._id)}
            >
              <div className="font-semibold text-richblack-5">
                {course.sectionName}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-richblack-300">
                  {course.Subsection.length} lessons
                </span>
                <BsChevronDown 
                  className={`transition-transform duration-300 ${
                    activeStatus === course._id ? "rotate-180" : ""
                  }`} 
                />
              </div>
            </div>

            {/* Subsections */}
            {activeStatus === course._id && (
              <div className="bg-richblack-900/50">
                {course.Subsection.map((topic) => (
                  <div
                    key={topic._id}
                    className={`flex items-center gap-3 px-5 py-3 cursor-pointer transition-all duration-200 ${
                      videoBarActive === topic._id
                        ? "bg-yellow-400 text-richblack-900 font-semibold"
                        : "hover:bg-richblack-700 text-richblack-200"
                    }`}
                    onClick={() => {
                      navigate(
                        `/view-course/${courseEntireData?._id}/section/${course._id}/sub-section/${topic._id}`
                      )
                      setVideoBarActive(topic._id)
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={completedLectures.includes(topic._id)}
                      onChange={() => {}}
                      className="h-4 w-4 rounded border-richblack-300 bg-richblack-600 text-yellow-400 focus:ring-yellow-400"
                    />
                    <span className="flex-1 text-sm">{topic.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}