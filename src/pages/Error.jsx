import { Link } from "react-router-dom"
// src/pages/PageNotFound.js
import React from "react"

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center text-white bg-richblack-900 px-4">
      <h1 className="text-6xl font-bold text-yellow-400 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Oops! Page Not Found</h2>
      <p className="text-gray-400 mb-6">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-yellow-400 text-richblack-900 rounded-lg font-medium hover:bg-yellow-300 transition-all"
      >
        Go Back Home
      </Link>
    </div>
  )
}

export default PageNotFound
