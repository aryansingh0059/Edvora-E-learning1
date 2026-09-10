// import React, { useEffect, useRef, useState } from "react"

// import { AiOutlineDown } from "react-icons/ai"
// import { HiOutlineVideoCamera } from "react-icons/hi"

// function CourseSubsectionAccordion({ subSec }) {
//   return (
//     <div>
//       <div className="flex justify-between py-2">
//         <div className={`flex items-center gap-2`}>
//           <span>
//             <HiOutlineVideoCamera />
//           </span>
//           <p>{subSec?.title}</p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CourseSubsectionAccordion

import { BsCheckCircleFill, BsCircle } from "react-icons/bs"
import {
  HiLockClosed,
  HiOutlineVideoCamera,
  HiPlay
} from "react-icons/hi"
import React, { useState } from "react"

import { motion } from "framer-motion"

function CourseSubsectionAccordion({ subSec, index, isCompleted = false }) {
  const [isHovered, setIsHovered] = useState(false)
  const duration = subSec?.timeDuration || "10:00"

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group"
    >
      <div 
        className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 cursor-pointer ${
          isCompleted 
            ? "bg-green-500/10 border border-green-500/20" 
            : "bg-richblack-700/30 hover:bg-richblack-700/50 border border-transparent hover:border-richblack-500/30"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center gap-4 flex-1">
          {/* Status Indicator */}
          <div className="flex-shrink-0">
            {isCompleted ? (
              <BsCheckCircleFill className="text-2xl text-green-400" />
            ) : (
              <div className="relative">
                <BsCircle className="text-2xl text-richblack-400" />
                {isHovered && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <HiPlay className="text-richblack-900 text-sm font-bold" />
                  </motion.div>
                )}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <HiOutlineVideoCamera className={`text-lg flex-shrink-0 ${
                isCompleted ? "text-green-400" : "text-richblack-300"
              }`} />
              <h4 className={`font-medium truncate ${
                isCompleted ? "text-green-200" : "text-richblack-5"
              }`}>
                {subSec?.title}
              </h4>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className={`px-2 py-1 rounded-full ${
                isCompleted 
                  ? "bg-green-400/20 text-green-300" 
                  : "bg-richblack-600 text-richblack-200"
              }`}>
                {duration}
              </span>
              {subSec?.isPreview && (
                <span className="px-2 py-1 rounded-full bg-blue-400/20 text-blue-300">
                  Preview
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`p-2 rounded-lg transition-colors duration-200 ${
            isCompleted
              ? "text-green-400 hover:text-green-300"
              : "text-richblack-300 hover:text-yellow-400"
          }`}
        >
          {isCompleted ? (
            <HiPlay className="text-xl" />
          ) : subSec?.isPreview ? (
            <HiPlay className="text-xl" />
          ) : (
            <HiLockClosed className="text-lg" />
          )}
        </motion.button>
      </div>
    </motion.div>
  )
}

export default CourseSubsectionAccordion