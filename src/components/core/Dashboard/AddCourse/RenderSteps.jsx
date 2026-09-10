import CourseBuilderForm from "./CourseInformation/CourseBuilderForm";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import { FaCheck } from "react-icons/fa";
import PublishCourse from "./PublishCourse/PublishCourse";
import React from "react";
import { useSelector } from "react-redux";

const RenderSteps = () => {
  // ✅ Safely access step from Redux, with fallback value
  const step = useSelector((state) => state.course?.step || 1);

  const steps = [
    { id: 1, title: "Course Information" },
    { id: 2, title: "Course Builder" },
    { id: 3, title: "Publish" },
  ];

  return (
    <div className="w-full flex flex-col items-center gap-12 bg-richblack-950 pt-4 px-2 min-h-screen">
      {/* Steps Progress Section */}
      <div className="bg-richblack-900 rounded-3xl p-8 mb-4 w-full max-w-4xl mx-auto shadow-xl border border-richblack-700 mt-2">
        <div className="flex items-center justify-between relative">
          {steps.map((item, index) => {
            const isCompleted = step > item.id;
            const isCurrent = step === item.id;
            return (
              <React.Fragment key={item.id}>
                {/* Step Circle */}
                <div className="flex flex-col items-center relative z-10">
                  <div
                    className={`flex items-center justify-center w-14 h-14 rounded-full font-bold text-lg transition-all duration-300 border-2 shadow-md hover:scale-105 cursor-pointer
                      ${isCompleted ? "bg-richblack-300 border-green-400 text-white " : isCurrent ? "bg-richblack-900 border-yellow-400 text-yellow-200" : "bg-richblack-800 border-richblack-600 text-richblack-300"}`}
                  >
                    {isCompleted ? (
                      <FaCheck className="text-white text-2xl font-bold" />
                    ) : (
                      <span>{item.id}</span>
                    )}
                  </div>
                  {/* Step Title */}
                  <div className="mt-3 text-center">
                    <span className={`text-base font-semibold tracking-wide ${isCurrent ? "text-yellow-200" : isCompleted ? "text-richblack-200" : "text-richblack-400"}`}>{item.title}</span>
                    {/* Status Badge */}
                    <div className={`mt-1 px-3 py-1 rounded text-xs font-medium border transition-all duration-200 ${isCurrent ? "bg-richblack-900 border-yellow-400 text-yellow-200" : isCompleted ? "bg-richblack-800 border-richblack-600 text-richblack-200 " : "bg-richblack-800 border-richblack-600 text-richblack-400"}`}>
                      {isCompleted ? "Completed" : isCurrent ? "Current" : "Upcoming"}
                    </div>
                  </div>
                </div>
                {/* Connecting Line */}
                {index !== steps.length - 1 && (
                  <div className="flex-1 h-1 mx-4 rounded-full bg-richblack-800 relative -top-6">
                    <div className={`h-full rounded-full transition-all duration-500 ${isCompleted ? "w-full bg-green-400 text-white" : isCurrent ? "w-1/2 bg-yellow-400" : "w-0"}`}></div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
        {/* Progress Bar */}
        <div className="mt-10">
          <div className="flex justify-between text-sm text-richblack-400 mb-2">
            <span>Progress</span>
            <span className="font-bold text-yellow-400">{Math.round(((step - 1) / (steps.length - 1)) * 100)}%</span>
          </div>
          <div className="w-full bg-richblack-800 rounded-full h-4 overflow-hidden shadow-md">
            <div
              className="bg-yellow-400 h-4 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      {/* Step Content Section */}
      <div className="w-full max-w-4xl">
        <div className="bg-richblack-900 rounded-3xl p-8 shadow-xl border border-richblack-700 animate-fadein mt-0">
          {step === 1 && <CourseInformationForm />}
          {step === 2 && <CourseBuilderForm />}
          {step === 3 && <PublishCourse/>}
        </div>
      </div>
      {/* Custom Animations */}
      <style>{`
      @keyframes fadein {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadein { animation: fadein 0.7s ease; }
    `}</style>
    </div>
  );
};

export default RenderSteps;

