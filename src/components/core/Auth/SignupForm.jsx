import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

import { ACCOUNT_TYPE } from "../../../utils/constants"
import Tab from "../../common/Tab"
import { sendOtp } from "../../../services/operations/authAPI"
import { setSignupData } from "../../../slices/authSlice"
import { toast } from "react-hot-toast"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

function SignupForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { firstName, lastName, email, password, confirmPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      setIsSubmitting(false)
      return
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long")
      setIsSubmitting(false)
      return
    }

    const signupData = {
      ...formData,
      accountType,
    }

    try {
      dispatch(setSignupData(signupData))
      await dispatch(sendOtp(formData.email, navigate))
      
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
      setAccountType(ACCOUNT_TYPE.STUDENT)
    } catch (error) {
      toast.error("Signup failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const tabData = [
    {
      id: 1,
      tabName: "🎓 Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "👨‍🏫 Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ]

  return (
    <div className="space-y-6 ml-5">
      {/* Account Type Selection */}
      <div className="text-center mb-2">
        <h3 className="text-richblack-50 font-semibold mb-3">I am joining as a:</h3>
        <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      </div>

      {/* Form */}
      <form onSubmit={handleOnSubmit} className="space-y-5">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-richblack-50">
              First Name <span className="text-pink-400 ml-1">*</span>
            </label>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter your first name"
              className="w-full px-4 py-3 bg-richblack-700 border border-richblack-600 rounded-xl text-richblack-5 placeholder-richblack-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-50 focus:border-transparent hover:bg-richblack-600"
            />
          </div>
          
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-richblack-50">
              Last Name <span className="text-pink-400 ml-1">*</span>
            </label>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter your last name"
              className="w-full px-4 py-3 bg-richblack-700 border border-richblack-600 rounded-xl text-richblack-5 placeholder-richblack-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-50 focus:border-transparent hover:bg-richblack-600"
            />
          </div>
        </div>

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
            placeholder="Enter your email address"
            className="w-full px-4 py-3 bg-richblack-700 border border-richblack-600 rounded-xl text-richblack-5 placeholder-richblack-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-50 focus:border-transparent hover:bg-richblack-600"
          />
        </div>

        {/* Password Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-richblack-50">
              Create Password <span className="text-pink-400 ml-1">*</span>
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
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-richblack-50">
              Confirm Password <span className="text-pink-400 ml-1">*</span>
            </label>
            <div className="relative">
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm your password"
                className="w-full px-4 py-3 pr-12 bg-richblack-700 border border-richblack-600 rounded-xl text-richblack-5 placeholder-richblack-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-50 focus:border-transparent hover:bg-richblack-600"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-richblack-400 hover:text-richblack-100 transition-colors duration-200"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
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
              <span>Creating Account...</span>
            </>
          ) : (
            <span>Create Account 🚀</span>
          )}
        </button>
      </form>

      {/* Additional Info */}
      <div className="text-center pt-4 border-t border-richblack-600">
        <p className="text-richblack-300 text-sm">
          By signing up, you agree to our{" "}
          <button href="#" className="text-yellow-50 hover:underline font-medium">
            Terms of Service
          </button>{" "}
          and{" "}
          <button href="#" className="text-yellow-50 hover:underline font-medium">
            Privacy Policy
          </button>
        </p>
      </div>
    </div>
  )
}

export default SignupForm