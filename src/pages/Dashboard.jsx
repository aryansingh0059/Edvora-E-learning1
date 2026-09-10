import { Outlet } from 'react-router-dom'
import React from 'react'
import Sidebar from '../components/core/Dashboard/Sidebar'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth)
  const { loading: profileLoading } = useSelector((state) => state.profile)

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center bg-gradient-to-br from-richblack-900 via-richblack-800 to-richblack-900">
        <div className="text-center space-y-8">
          {/* Enhanced Animated Spinner */}
          <div className="relative mx-auto w-24 h-24">
            <div className="absolute inset-0 border-4 border-richblack-600 rounded-full animate-ping"></div>
            <div className="absolute inset-2 border-4 border-richblack-600 border-t-yellow-50 rounded-full animate-spin"></div>
            <div className="absolute inset-4 border-4 border-transparent border-t-yellow-400 rounded-full animate-spin" style={{ animationDuration: '1.5s' }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Enhanced Loading Text */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-200 to-amber-200 bg-clip-text text-transparent">
              Loading Your Dashboard
            </h3>
            <p className="text-richblack-300 text-sm font-medium">
              Preparing your personalized workspace...
            </p>
          </div>

          {/* Animated Progress Bar */}
          <div className="w-64 mx-auto bg-richblack-700 rounded-full h-1.5 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] bg-gradient-to-br from-richblack-900 via-richblack-800 to-richblack-900">
      {/* Sidebar with enhanced styling */}
      <div className="relative z-20">
        <Sidebar/>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 h-[calc(100vh-3.5rem)] overflow-auto">
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-richblack-800/80 via-richblack-900 to-richblack-800/80"></div>
        
        {/* Enhanced Content Container */}
        <div className="relative z-10 mx-auto w-11/12 py-8 max-w-[1200px]">
          {/* Glass-morphism Container */}
          <div className="rounded-3xl border border-richblack-600/30 bg-gradient-to-br from-richblack-800/40 to-richblack-900/60 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden">
            {/* Subtle top accent */}
            <div className="h-1 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-500"></div>
            
            <div className="p-8">
              <Outlet/>
            </div>
          </div>
          
          {/* Enhanced Footer */}
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-richblack-700/50 backdrop-blur-sm border border-richblack-600/30">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <p className="text-richblack-300 text-sm font-medium">
                Secure Dashboard • {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Decorative Elements */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-gradient-to-br from-yellow-400/10 to-amber-400/5 rounded-full blur-3xl -translate-y-48 translate-x-48 animate-pulse"></div>
      <div className="fixed bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-400/8 to-cyan-400/5 rounded-full blur-3xl translate-y-64 -translate-x-64 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="fixed top-1/2 left-1/2 w-64 h-64 bg-purple-400/3 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDuration: '4s' }}></div>

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
    </div>
  )
}

export default Dashboard