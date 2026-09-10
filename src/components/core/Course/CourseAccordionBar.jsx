// import { useEffect, useRef, useState } from "react"

// import { AiOutlineDown } from "react-icons/ai"
// import CourseSubsectionAccordion from "./CourseSubSectionAccordion"

// export default function CourseAccordionBar({ course, isActive, handleActive }) {
//   const contentEl = useRef(null)

//   // Accordian state
//   const [active, setActive] = useState(false)
//   useEffect(() => {
//     setActive(isActive?.includes(course._id))
//   }, [isActive])
//   const [sectionHeight, setSectionHeight] = useState(0)
//   useEffect(() => {
//     setSectionHeight(active ? contentEl.current.scrollHeight : 0)
//   }, [active])

//   return (
//     <div className="overflow-hidden border border-solid border-richblack-600 bg-richblack-700 text-richblack-5 last:mb-0">
//       <div>
//         <div
//           className={`flex cursor-pointer items-start justify-between bg-opacity-20 px-7  py-6 transition-[0.3s]`}
//           onClick={() => {
//             handleActive(course._id)
//           }}
//         >
//           <div className="flex items-center gap-2">
//             <i
//               className={
//                 isActive.includes(course._id) ? "rotate-180" : "rotate-0"
//               }
//             >
//               <AiOutlineDown />
//             </i>
//             <p>{course?.sectionName}</p>
//           </div>
//           <div className="space-x-4">
//             <span className="text-yellow-25">
//               {`${course.Subsection.length || 0} lecture(s)`}
//             </span>
//           </div>
//         </div>
//       </div>
//       <div
//         ref={contentEl}
//         className={`relative h-0 overflow-hidden bg-richblack-900 transition-[height] duration-[0.35s] ease-[ease]`}
//         style={{
//           height: sectionHeight,
//         }}
//       >
//         <div className="text-textHead flex flex-col gap-2 px-7 py-6 font-semibold">
//           {course?.Subsection?.map((subSec, i) => {
//             return <CourseSubsectionAccordion subSec={subSec} key={i} />
//           })}
//         </div>
//       </div>
//     </div>
//   )
// }

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

import { AiOutlineDown } from "react-icons/ai"
import CourseSubsectionAccordion from "./CourseSubSectionAccordion"

export default function CourseAccordionBar({ course, isActive, handleActive }) {
  const contentEl = useRef(null)
  const [active, setActive] = useState(false)
  const [sectionHeight, setSectionHeight] = useState(0)

  useEffect(() => {
    setActive(isActive?.includes(course._id))
  }, [isActive])

  useEffect(() => {
    setSectionHeight(active ? contentEl.current.scrollHeight : 0)
  }, [active])

  const lecturesCount = course.Subsection?.length || 0
  const completedLectures = 0 // You can add logic to track completed lectures

  return (
    <div className="overflow-hidden rounded-2xl border border-richblack-300/20 bg-gradient-to-br from-richblack-700 to-richblack-800 shadow-lg shadow-richblack-500/10 transition-all duration-300 hover:shadow-xl hover:shadow-richblack-500/20">
      <div>
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className={`flex cursor-pointer items-center justify-between p-6 transition-all duration-300 ${
            active 
              ? "bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border-b border-yellow-400/20" 
              : "hover:bg-richblack-600/30"
          }`}
          onClick={() => handleActive(course._id)}
        >
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: active ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-richblack-900 shadow-lg"
            >
              <AiOutlineDown className="text-sm font-bold" />
            </motion.div>
            <div className="flex flex-col">
              <h3 className="text-lg font-bold text-richblack-5">
                {course?.sectionName}
              </h3>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs font-medium text-yellow-200 bg-yellow-400/20 px-2 py-1 rounded-full">
                  {lecturesCount} {lecturesCount === 1 ? 'lecture' : 'lectures'}
                </span>
                <div className="w-24 h-1.5 bg-richblack-500 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${(completedLectures / lecturesCount) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-richblack-300">
                  {completedLectures}/{lecturesCount}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-yellow-25 bg-yellow-500/20 px-3 py-1 rounded-full">
              {Math.round((completedLectures / lecturesCount) * 100)}%
            </span>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: "auto", 
              opacity: 1,
              transition: {
                height: { duration: 0.4, ease: "easeInOut" },
                opacity: { duration: 0.3, delay: 0.1 }
              }
            }}
            exit={{ 
              height: 0, 
              opacity: 0,
              transition: {
                height: { duration: 0.3 },
                opacity: { duration: 0.2 }
              }
            }}
            className="overflow-hidden"
          >
            <div
              ref={contentEl}
              className="bg-gradient-to-b from-richblack-800 to-richblack-900"
            >
              <div className="flex flex-col gap-1 p-4">
                {course?.Subsection?.map((subSec, i) => (
                  <CourseSubsectionAccordion 
                    subSec={subSec} 
                    key={i}
                    index={i}
                    isCompleted={i < completedLectures} // Example logic
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}