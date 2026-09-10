
// // import { Chart, registerables } from "chart.js"
// // import { Doughnut, Pie } from "react-chartjs-2"
// // import { FiDollarSign, FiUsers } from "react-icons/fi"

// // import { useState } from "react"

// // Chart.register(...registerables)

// // export default function InstructorChart({ courses }) {
// //   const [currChart, setCurrChart] = useState("students")

// //   // Professional color palette
// //   const colorPalettes = {
// //     students: [
// //       'rgba(59, 130, 246, 0.8)',
// //       'rgba(139, 92, 246, 0.8)',
// //       'rgba(14, 165, 233, 0.8)',
// //       'rgba(34, 197, 94, 0.8)',
// //       'rgba(245, 158, 11, 0.8)',
// //       'rgba(239, 68, 68, 0.8)',
// //     ],
// //     income: [
// //       'rgba(34, 197, 94, 0.8)',
// //       'rgba(14, 165, 233, 0.8)',
// //       'rgba(59, 130, 246, 0.8)',
// //       'rgba(139, 92, 246, 0.8)',
// //       'rgba(245, 158, 11, 0.8)',
// //       'rgba(239, 68, 68, 0.8)',
// //     ]
// //   }

// //   const chartDataStudents = {
// //     labels: courses.map((course) => course.courseName),
// //     datasets: [
// //       {
// //         data: courses.map((course) => course.totalStudentsEnrolled),
// //         backgroundColor: colorPalettes.students.slice(0, courses.length),
// //         borderColor: 'rgba(255, 255, 255, 0.1)',
// //         borderWidth: 2,
// //         hoverBackgroundColor: colorPalettes.students.map(color => color.replace('0.8', '1')),
// //         hoverBorderColor: 'rgba(255, 255, 255, 0.3)',
// //       },
// //     ],
// //   }

// //   const chartIncomeData = {
// //     labels: courses.map((course) => course.courseName),
// //     datasets: [
// //       {
// //         data: courses.map((course) => course.totalAmountGenerated),
// //         backgroundColor: colorPalettes.income.slice(0, courses.length),
// //         borderColor: 'rgba(255, 255, 255, 0.1)',
// //         borderWidth: 2,
// //         hoverBackgroundColor: colorPalettes.income.map(color => color.replace('0.8', '1')),
// //         hoverBorderColor: 'rgba(255, 255, 255, 0.3)',
// //       },
// //     ],
// //   }

// //   const options = {
// //     maintainAspectRatio: false,
// //     plugins: {
// //       legend: {
// //         position: 'bottom',
// //         labels: {
// //           color: '#e5e7eb',
// //           font: {
// //             size: 12,
// //             family: "'Inter', sans-serif"
// //           },
// //           padding: 20,
// //           usePointStyle: true,
// //         }
// //       },
// //       tooltip: {
// //         backgroundColor: 'rgba(17, 24, 39, 0.9)',
// //         titleColor: '#f3f4f6',
// //         bodyColor: '#e5e7eb',
// //         borderColor: 'rgba(255, 255, 255, 0.1)',
// //         borderWidth: 1,
// //         cornerRadius: 8,
// //         displayColors: true,
// //         callbacks: {
// //           label: function(context) {
// //             const label = context.label || '';
// //             const value = context.parsed;
// //             const total = context.dataset.data.reduce((a, b) => a + b, 0);
// //             const percentage = Math.round((value / total) * 100);
// //             return `${label}: ${value.toLocaleString()} (${percentage}%)`;
// //           }
// //         }
// //       }
// //     },
// //     cutout: '50%',
// //   }

// //   const totalStudents = courses.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0)
// //   const totalIncome = courses.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0)

// //   return (
// //     <div className="h-full bg-gradient-to-br from-gray-800 to-gray-700 backdrop-blur-sm border border-gray-600 rounded-2xl p-6">
// //       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
// //         <h3 className="text-xl font-bold text-white flex items-center gap-2">
// //           {currChart === "students" ? (
// //             <FiUsers className="text-blue-400" />
// //           ) : (
// //             <FiDollarSign className="text-green-400" />
// //           )}
// //           {currChart === "students" ? "Student Distribution" : "Revenue Analysis"}
// //         </h3>
        
// //         <div className="flex gap-2 mt-2 lg:mt-0">
// //           <button
// //             onClick={() => setCurrChart("students")}
// //             className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
// //               currChart === "students"
// //                 ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
// //                 : "text-gray-400 hover:text-white hover:bg-gray-600/50"
// //             }`}
// //           >
// //             <FiUsers className="text-sm" />
// //             Students
// //           </button>
// //           <button
// //             onClick={() => setCurrChart("income")}
// //             className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
// //               currChart === "income"
// //                 ? "bg-green-500/20 text-green-400 border border-green-500/30"
// //                 : "text-gray-400 hover:text-white hover:bg-gray-600/50"
// //             }`}
// //           >
// //             <FiDollarSign className="text-sm" />
// //             Income
// //           </button>
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[300px]">
// //         {/* Chart Container */}
// //         <div className="lg:col-span-2 relative">
// //           <Doughnut
// //             data={currChart === "students" ? chartDataStudents : chartIncomeData}
// //             options={options}
// //           />
// //         </div>

// //         {/* Summary Stats */}
// //         <div className="flex flex-col justify-center space-y-4">
// //           <div className="text-center">
// //             <p className="text-gray-400 text-sm font-medium mb-1">
// //               Total {currChart === "students" ? "Students" : "Revenue"}
// //             </p>
// //             <p className="text-2xl font-bold text-white">
// //               {currChart === "students" 
// //                 ? totalStudents.toLocaleString() 
// //                 : `₹${totalIncome.toLocaleString()}`
// //               }
// //             </p>
// //           </div>
          
// //           <div className="space-y-2">
// //             {courses.map((course, index) => (
// //               <div key={course._id} className="flex items-center justify-between text-sm">
// //                 <div className="flex items-center gap-2">
// //                   <div 
// //                     className="w-3 h-3 rounded-full"
// //                     style={{ 
// //                       backgroundColor: currChart === "students" 
// //                         ? colorPalettes.students[index] 
// //                         : colorPalettes.income[index] 
// //                     }}
// //                   ></div>
// //                   <span className="text-gray-300 truncate max-w-[100px]">
// //                     {course.courseName}
// //                   </span>
// //                 </div>
// //                 <span className="text-white font-semibold">
// //                   {currChart === "students" 
// //                     ? course.totalStudentsEnrolled.toLocaleString()
// //                     : `₹${course.totalAmountGenerated.toLocaleString()}`
// //                   }
// //                 </span>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

import { Chart, registerables } from "chart.js"
import { Doughnut, Pie } from "react-chartjs-2"
import { FiDollarSign, FiUsers } from "react-icons/fi"

import { useState } from "react"

Chart.register(...registerables)

export default function InstructorChart({ courses }) {
  const [currChart, setCurrChart] = useState("students")

  // Rich color palette optimized for richblack background
  const colorPalettes = {
    students: [
      'rgba(226, 192, 68, 0.9)',   // yellow-400
      'rgba(59, 130, 246, 0.9)',   // blue-500
      'rgba(139, 92, 246, 0.9)',   // purple-500
      'rgba(14, 165, 233, 0.9)',   // cyan-500
      'rgba(34, 197, 94, 0.9)',    // green-500
      'rgba(245, 158, 11, 0.9)',   // amber-500
    ],
    income: [
      'rgba(34, 197, 94, 0.9)',    // green-500
      'rgba(226, 192, 68, 0.9)',   // yellow-400
      'rgba(59, 130, 246, 0.9)',   // blue-500
      'rgba(139, 92, 246, 0.9)',   // purple-500
      'rgba(14, 165, 233, 0.9)',   // cyan-500
      'rgba(245, 158, 11, 0.9)',   // amber-500
    ]
  }

  const chartDataStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: colorPalettes.students.slice(0, courses.length),
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 2,
        hoverBackgroundColor: colorPalettes.students.map(color => color.replace('0.9', '1')),
        hoverBorderColor: 'rgba(255, 255, 255, 0.5)',
        hoverBorderWidth: 3,
      },
    ],
  }

  const chartIncomeData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: colorPalettes.income.slice(0, courses.length),
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 2,
        hoverBackgroundColor: colorPalettes.income.map(color => color.replace('0.9', '1')),
        hoverBorderColor: 'rgba(255, 255, 255, 0.5)',
        hoverBorderWidth: 3,
      },
    ],
  }

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#e5e7eb', // richblack-200
          font: {
            size: 12,
            family: "'Inter', sans-serif",
            weight: '500'
          },
          padding: 20,
          usePointStyle: true,
        }
      },
      tooltip: {
        backgroundColor: 'rgba(13, 17, 23, 0.95)', // Dark background for contrast
        titleColor: '#f8fafc', // Bright white
        bodyColor: '#e2e8f0', // Light gray
        borderColor: 'rgba(226, 192, 68, 0.5)', // Yellow border
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value.toLocaleString()} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '50%',
  }

  const totalStudents = courses.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0)
  const totalIncome = courses.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0)

  return (
    <div className="h-full bg-richblack-800 border border-richblack-600 rounded-2xl p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <h3 className="text-xl font-bold text-richblack-5 flex items-center gap-2">
          {currChart === "students" ? (
            <FiUsers className="text-yellow-50" />
          ) : (
            <FiDollarSign className="text-green-400" />
          )}
          {currChart === "students" ? "Student Distribution" : "Revenue Analysis"}
        </h3>
        
        <div className="flex gap-2 mt-2 lg:mt-0">
          <button
            onClick={() => setCurrChart("students")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              currChart === "students"
                ? "bg-yellow-400/20 text-yellow-50 border border-yellow-400/30"
                : "text-richblack-400 hover:text-richblack-5 hover:bg-richblack-700"
            }`}
          >
            <FiUsers className="text-sm" />
            Students
          </button>
          <button
            onClick={() => setCurrChart("income")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              currChart === "income"
                ? "bg-green-400/20 text-green-400 border border-green-400/30"
                : "text-richblack-400 hover:text-richblack-5 hover:bg-richblack-700"
            }`}
          >
            <FiDollarSign className="text-sm" />
            Income
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[300px]">
        {/* Chart Container */}
        <div className="lg:col-span-2 relative">
          <Doughnut
            data={currChart === "students" ? chartDataStudents : chartIncomeData}
            options={options}
          />
        </div>

        {/* Summary Stats */}
        <div className="flex flex-col justify-center space-y-4">
          <div className="text-center">
            <p className="text-richblack-300 text-sm font-medium mb-1 italic">
              Total {currChart === "students" ? "Students" : "Revenue"}
            </p>
            <p className="text-2xl font-bold text-richblack-5">
              {currChart === "students" 
                ? totalStudents.toLocaleString() 
                : `₹${totalIncome.toLocaleString()}`
              }
            </p>
          </div>
          
          <div className="space-y-2">
            {courses.map((course, index) => (
              <div key={course._id} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full border border-white/20"
                    style={{ 
                      backgroundColor: currChart === "students" 
                        ? colorPalettes.students[index] 
                        : colorPalettes.income[index] 
                    }}
                  ></div>
                  <span className="text-richblack-300 truncate max-w-[100px]">
                    {course.courseName}
                  </span>
                </div>
                <span className="text-richblack-5 font-semibold">
                  {currChart === "students" 
                    ? course.totalStudentsEnrolled.toLocaleString()
                    : `₹${course.totalAmountGenerated.toLocaleString()}`
                  }
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}



