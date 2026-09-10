import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom"

import { login } from "../../../services/operations/authAPI"
import { toast } from "react-hot-toast"
import { useDispatch } from "react-redux"
import { useState } from "react"

function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error("Please fill in all required fields")
      return
    }
    setIsSubmitting(true)
    try {
      await dispatch(login(email, password, navigate))
    } catch (error) {
      toast.error("Login failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleOnSubmit}
      className="w-full space-y-6 mt-6"
    >
      {/* Email Field */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-richblack-50">
          Email Address <span className="text-pink-400 ml-1">*</span>
        </label>
        <input
          required
          type="email"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter your email"
          className="w-full px-4 py-3 bg-richblack-700 border border-richblack-600 rounded-xl text-richblack-5 placeholder-richblack-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-50 focus:border-transparent hover:bg-richblack-600"
        />
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-richblack-50">
          Password <span className="text-pink-400 ml-1">*</span>
        </label>
        <div className="relative">
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Enter your password"
            className="w-full px-4 py-3 pr-12 bg-richblack-700 border border-richblack-600 rounded-xl text-richblack-5 placeholder-richblack-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-50 focus:border-transparent hover:bg-richblack-600"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-richblack-400 hover:text-richblack-100 transition-colors duration-200"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </button>
        </div>
        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-sm text-yellow-50 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 text-richblack-900 font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-richblack-900 border-t-transparent rounded-full animate-spin"></div>
            <span>Signing In...</span>
          </>
        ) : (
          <span>Sign In 🚀</span>
        )}
      </button>

      {/* Extra Info */}
      <div className="text-center pt-4 border-t border-richblack-600">
        <p className="text-richblack-300 text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-yellow-50 hover:underline font-medium">
            Create one
          </Link>
        </p>
      </div>
    </form>
  )
}

export default LoginForm
