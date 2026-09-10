// import * as Icon1 from "react-icons/bi"
// import * as Icon2 from "react-icons/io5"
// import * as Icon3 from "react-icons/hi2"

// import React from "react"

// const contactDetails = [
//   {
//     icon: "HiChatBubbleLeftRight",
//     heading: "Chat on us",
//     description: "Our friendly team is here to help.",
//     details: "info@Edvora.com",
//   },
//   {
//     icon: "BiWorld",
//     heading: "Visit us",
//     description: "Come and say hello at our office HQ.",
//     details:
//       "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
//   },
//   {
//     icon: "IoCall",
//     heading: "Call us",
//     description: "Mon - Fri From 8am to 5pm",
//     details: "+123 456 7869",
//   },
// ]

// const ContactDetails = () => {
//   return (
//     <div className="flex flex-col gap-6 rounded-xl bg-richblack-800 p-4 lg:p-6">
//       {contactDetails.map((ele, i) => {
//         let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon]
//         return (
//           <div
//             className="flex flex-col gap-[2px] p-3 text-sm text-richblack-200"
//             key={i}
//           >
//             <div className="flex flex-row items-center gap-3">
//               <Icon size={25} />
//               <h1 className="text-lg font-semibold text-richblack-5">
//                 {ele?.heading}
//               </h1>
//             </div>
//             <p className="font-medium">{ele?.description}</p>
//             <p className="font-semibold">{ele?.details}</p>
//           </div>
//         )
//       })}
//     </div>
//   )
// }

// export default ContactDetails

import * as Icon1 from "react-icons/bi"
import * as Icon2 from "react-icons/io5"
import * as Icon3 from "react-icons/hi2"

import React from "react"

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@Edvora.com",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details: "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
    gradient: "from-purple-500 to-pink-500",
  },
]

const ContactDetails = () => {
  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-gradient-to-br from-richblack-800 to-richblack-900 p-6 lg:p-8 border border-richblack-600 shadow-xl">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-richblack-5 mb-2">Get in Touch</h2>
        <p className="text-richblack-200 text-sm">We'd love to hear from you</p>
      </div>
      
      {contactDetails.map((ele, i) => {
        let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon]
        return (
          <div
            className="flex flex-col gap-4 p-5 rounded-xl bg-richblack-700/50 hover:bg-richblack-700/70 transition-all duration-300 group cursor-pointer border border-richblack-600 hover:border-richblack-400 hover:shadow-lg"
            key={i}
          >
            <div className="flex flex-row items-start gap-4">
              {/* Icon with gradient background */}
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r ${ele.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                <Icon size={24} className="text-white" />
              </div>
              
              {/* Content */}
              <div className="flex-1 flex flex-col gap-2">
                <h3 className="text-lg font-bold text-richblack-5 group-hover:text-yellow-50 transition-colors duration-200">
                  {ele?.heading}
                </h3>
                <p className="text-richblack-200 text-sm leading-5 font-medium">
                  {ele?.description}
                </p>
                <p className="text-richblack-5 font-semibold text-base mt-1 bg-richblack-800/50 px-3 py-2 rounded-lg border border-richblack-600 group-hover:border-richblack-400 transition-colors duration-200">
                  {ele?.details}
                </p>
              </div>
            </div>
            
            {/* Hover effect line */}
            <div className="w-0 h-0.5 bg-gradient-to-r from-yellow-50 to-yellow-100 transition-all duration-300 group-hover:w-full"></div>
          </div>
        )
      })}
      
      {/* Additional Info */}
      <div className="mt-4 p-4 rounded-lg bg-richblack-700/30 border border-richblack-600">
        <div className="flex items-center gap-3 text-sm text-richblack-200">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <p className="font-medium">Typically replies within 2 hours</p>
        </div>
      </div>
    </div>
  )
}

export default ContactDetails