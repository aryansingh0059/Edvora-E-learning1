import React from 'react'
import RenderSteps from './RenderSteps'

const AddCourse = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-richblack-950 to-richblack-900 flex items-center justify-center px-4 py-8">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-8">
        {/* Main Content */}
        <div className="flex-1">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent mb-2">
              Create New Course
            </h1>
            <p className="text-richblack-300 text-lg">
              Follow the steps below to build and publish your course
            </p>
          </div>
          <RenderSteps />
        </div>
        
        {/* Enhanced Tips Sidebar */}
        <div className="w-full lg:w-96">
          <div className="bg-gradient-to-b from-richblack-800 to-richblack-900 border border-richblack-600 rounded-2xl shadow-2xl p-8 h-fit sticky top-8 self-start backdrop-blur-sm bg-opacity-95">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-richblack-900" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Course Creation Guide</h2>
                <p className="text-richblack-300 text-sm">Best practices for success</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  icon: "💰",
                  title: "Pricing Strategy",
                  text: "Set competitive pricing or offer free access to attract initial students"
                },
                {
                  icon: "🏷️",
                  title: "SEO Optimization",
                  text: "Add relevant tags and keywords to improve course discoverability"
                },
                {
                  icon: "📢",
                  title: "Promotion Ready",
                  text: "Prepare marketing materials for social media and other channels"
                },
                {
                  icon: "🔄",
                  title: "Content Updates",
                  text: "Regularly refresh materials to maintain relevance and engagement"
                },
                {
                  icon: "💬",
                  title: "Student Engagement",
                  text: "Plan for Q&A sessions and feedback mechanisms"
                }
              ].map((tip, index) => (
                <div 
                  key={index}
                  className="flex gap-4 p-4 rounded-xl bg-richblack-800/50 border border-richblack-700 hover:border-yellow-500/30 transition-all duration-300 group hover:bg-richblack-800/70"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-richblack-700 rounded-lg flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300">
                    {tip.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-sm mb-1">{tip.title}</h3>
                    <p className="text-richblack-300 text-xs leading-relaxed">{tip.text}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Progress Stats */}
            <div className="mt-6 pt-6 border-t border-richblack-700">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-richblack-800/50 rounded-lg p-3">
                  <div className="text-yellow-400 font-bold text-lg">3</div>
                  <div className="text-richblack-300 text-xs">Steps</div>
                </div>
                <div className="bg-richblack-800/50 rounded-lg p-3">
                  <div className="text-caribbeangreen-300 font-bold text-lg">5-10</div>
                  <div className="text-richblack-300 text-xs">Minutes</div>
                </div>
                <div className="bg-richblack-800/50 rounded-lg p-3">
                  <div className="text-blue-400 font-bold text-lg">100%</div>
                  <div className="text-richblack-300 text-xs">Success</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddCourse

