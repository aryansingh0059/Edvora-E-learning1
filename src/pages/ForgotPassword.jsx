import { BiArrowBack, BiCheckCircle, BiErrorCircle } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

import { Link } from "react-router-dom"
import { getPasswordResetToken } from "../services/operations/authAPI"

function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isResending, setIsResending] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.auth)

  useEffect(() => {
    let timer
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  useEffect(() => {
    if (error) {
      setErrorMessage(error)
    }
  }, [error])

  const handleOnSubmit = (e) => {
    e.preventDefault()
    setErrorMessage("")
    
    // Basic email validation
    if (!email) {
      setErrorMessage("Email is required")
      return
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Please enter a valid email address")
      return
    }
    
    if (emailSent && !isResending) {
      setIsResending(true)
      setCountdown(30) // 30-second cooldown for resending
    }
    
    dispatch(getPasswordResetToken(email, setEmailSent))
  }

  const handleResendEmail = () => {
    if (countdown === 0) {
      setIsResending(true)
      setCountdown(30)
      dispatch(getPasswordResetToken(email, setEmailSent))
    }
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center bg-richblack-900 p-4">
      <div className="w-full max-w-md">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-8 rounded-lg bg-richblack-800 shadow-lg">
            <div className="spinner border-4 border-richblack-200 border-t-yellow-50 rounded-full w-12 h-12 animate-spin mb-4"></div>
            <p className="text-richblack-5 text-lg">Processing your request...</p>
          </div>
        ) : (
          <div className="p-6 lg:p-8 rounded-xl bg-richblack-800 shadow-lg border border-richblack-700">
            <div className="flex justify-center mb-6">
              <div className={`p-3 rounded-full ${emailSent ? 'bg-green-900/20' : 'bg-blue-900/20'}`}>
                {emailSent ? (
                  <BiCheckCircle className="text-3xl text-green-400" />
                ) : (
                  <BiArrowBack className="text-3xl text-blue-400" />
                )}
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-center text-richblack-5 mb-2">
              {!emailSent ? "Reset your password" : "Check your email"}
            </h1>
            
            <p className="text-center text-richblack-200 mb-6">
              {!emailSent
                ? "Enter your email address and we'll send you instructions to reset your password."
                : `We've sent a password reset link to ${email}`}
            </p>

            {errorMessage && (
              <div className="flex items-center gap-2 p-3 mb-4 rounded-md bg-pink-900/20 border border-pink-500">
                <BiErrorCircle className="text-pink-200 text-xl" />
                <p className="text-pink-200 text-sm">{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleOnSubmit} className="space-y-6">
              {!emailSent ? (
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-richblack-5">
                    Email Address <span className="text-pink-200">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setErrorMessage("")
                    }}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 rounded-lg bg-richblack-700 border border-richblack-600 text-richblack-5 placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-50 focus:border-transparent transition-all"
                  />
                </div>
              ) : (
                <div className="text-center p-4 rounded-lg bg-richblack-700/50">
                  <p className="text-richblack-5 font-medium">{email}</p>
                  <p className="text-richblack-200 text-sm mt-1">
                    Not your email? <button 
                      type="button" 
                      onClick={() => setEmailSent(false)}
                      className="text-yellow-50 hover:underline focus:outline-none"
                    >
                      Try another address
                    </button>
                  </p>
                </div>
              )}
              
              <button
                type="submit"
                disabled={loading || countdown > 0}
                className="w-full py-3 px-4 rounded-lg bg-yellow-50 hover:bg-yellow-100 disabled:opacity-70 disabled:cursor-not-allowed text-richblack-900 font-semibold transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-richblack-900 border-t-transparent rounded-full animate-spin"></div>
                    {!emailSent ? "Sending..." : "Resending..."}
                  </>
                ) : (
                  <>
                    {!emailSent ? "Send Reset Instructions" : `Resend Email ${countdown > 0 ? `(${countdown}s)` : ''}`}
                  </>
                )}
              </button>
            </form>

            {emailSent && countdown === 0 && (
              <div className="mt-4 text-center">
                <button
                  onClick={handleResendEmail}
                  className="text-yellow-50 hover:underline text-sm font-medium focus:outline-none"
                >
                  Didn't receive the email? Click to resend
                </button>
              </div>
            )}

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

export default ForgotPassword