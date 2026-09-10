import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { BiArrowBack } from "react-icons/bi"
import { resetPassword } from "../services/operations/authAPI"
import { useState } from "react"

function UpdatePassword() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const { loading, error } = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { password, confirmPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    const token = location.pathname.split("/").at(-1)
    dispatch(resetPassword(password, confirmPassword, token, navigate))
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center bg-richblack-900 p-4">
      <div className="w-full max-w-md">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-8 rounded-lg bg-richblack-800 shadow-lg">
            <div className="spinner border-4 border-richblack-200 border-t-yellow-50 rounded-full w-12 h-12 animate-spin mb-4"></div>
            <p className="text-richblack-5 text-lg">Updating your password...</p>
          </div>
        ) : (
          <div className="p-6 lg:p-8 rounded-xl bg-richblack-800 shadow-lg border border-richblack-700">
            <h1 className="text-2xl font-bold text-center text-richblack-5 mb-2">
              Choose new password
            </h1>
            
            <p className="text-center text-richblack-200 mb-6">
              Almost done. Enter your new password and you're all set.
            </p>

            {error && (
              <div className="mb-4 p-3 rounded-md bg-pink-900/20 border border-pink-500">
                <p className="text-pink-200 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleOnSubmit} className="space-y-4">
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-richblack-5 mb-1">
                  New Password <sup className="text-pink-200">*</sup>
                </label>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={password}
                  onChange={handleOnChange}
                  placeholder="Enter your new password"
                  className="w-full px-4 py-3 rounded-lg bg-richblack-700 border border-richblack-600 text-richblack-5 placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-50 focus:border-transparent transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-[38px] text-richblack-300 hover:text-richblack-5 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} />
                  ) : (
                    <AiOutlineEye fontSize={24} />
                  )}
                </button>
              </div>

              <div className="relative">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-richblack-5 mb-1">
                  Confirm New Password <sup className="text-pink-200">*</sup>
                </label>
                <input
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={handleOnChange}
                  placeholder="Confirm your new password"
                  className="w-full px-4 py-3 rounded-lg bg-richblack-700 border border-richblack-600 text-richblack-5 placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-50 focus:border-transparent transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-[38px] text-richblack-300 hover:text-richblack-5 transition-colors"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} />
                  ) : (
                    <AiOutlineEye fontSize={24} />
                  )}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full py-3 px-4 rounded-lg bg-yellow-50 hover:bg-yellow-100 disabled:opacity-70 disabled:cursor-not-allowed text-richblack-900 font-semibold transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-richblack-900 border-t-transparent rounded-full animate-spin"></div>
                    Resetting Password...
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>
            
            <div className="mt-6 pt-6 border-t border-richblack-700">
              <Link 
                to="/login" 
                className="flex items-center justify-center gap-2 text-richblack-5 hover:text-yellow-50 transition-colors font-medium"
              >
                <BiArrowBack /> Back to Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UpdatePassword