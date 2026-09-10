import { BiCheckCircle, BiErrorCircle } from 'react-icons/bi'
import { FiArrowLeft, FiMail } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { sendOtp, signUp } from '../services/operations/authAPI';
import { useDispatch, useSelector } from 'react-redux'

import OTPInput from 'react-otp-input';

const VerifyEmail = () => {
  const { signupData, loading, error } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
      // TODO: Change this to /signup after testing
    }
  }, [])

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      return;
    }

  
    
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;
    
    dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
  }

  const handleResendOtp = () => {
    if (countdown === 0) {
      setIsResending(true);
      setCountdown(30);
      dispatch(sendOtp(signupData.email, () => {
        setIsResending(false);
        setResendSuccess(true);
        setTimeout(() => setResendSuccess(false), 3000);
      }));
    }
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center bg-richblack-900 p-4">
      <div className="w-full max-w-md">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-8 rounded-lg bg-richblack-800 shadow-lg">
            <div className="spinner border-4 border-richblack-200 border-t-yellow-50 rounded-full w-12 h-12 animate-spin mb-4"></div>
            <p className="text-richblack-5 text-lg">Verifying your email...</p>
          </div>
        ) : (
          <div className="p-6 lg:p-8 rounded-xl bg-richblack-800 shadow-lg border border-richblack-700">
            <div className="flex justify-center mb-6">
              <div className="p-3 rounded-full bg-blue-900/20">
                <FiMail className="text-3xl text-blue-400" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-center text-richblack-5 mb-2">
              Verify Email
            </h1>
            
            <p className="text-center text-richblack-200 mb-6">
              A verification code has been sent to your email. Enter the code below.
            </p>

            {error && (
              <div className="flex items-center gap-2 p-3 mb-4 rounded-md bg-pink-900/20 border border-pink-500">
                <BiErrorCircle className="text-pink-200 text-xl" />
                <p className="text-pink-200 text-sm">{error}</p>
              </div>
            )}

            {resendSuccess && (
              <div className="flex items-center gap-2 p-3 mb-4 rounded-md bg-green-900/20 border border-green-500">
                <BiCheckCircle className="text-green-200 text-xl" />
                <p className="text-green-200 text-sm">Verification code sent successfully!</p>
              </div>
            )}

            <form onSubmit={handleOnSubmit} className="space-y-6">
              <div className="flex justify-center">
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderInput={(props) => (
                    <input
                      {...props}
                      className="otp-input"
                      style={{
                        width: '3rem',
                        height: '3rem',
                        margin: '0 0.5rem',
                        fontSize: '1.5rem',
                        borderRadius: '0.5rem',
                        border: '1px solid rgb(51 65 85)',
                        backgroundColor: 'rgb(30 41 59)',
                        color: 'rgb(248 250 252)',
                        textAlign: 'center',
                      }}
                    />
                  )}
                  containerStyle="flex justify-center"
                />
              </div>

              <button
                type="submit"
                disabled={otp.length !== 6 || loading}
                className="w-full py-3 px-4 rounded-lg bg-yellow-50 hover:bg-yellow-100 disabled:opacity-70 disabled:cursor-not-allowed text-richblack-900 font-semibold transition-all"
              >
                Verify Email
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-richblack-200 mb-3">
                Didn't receive the code?{' '}
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={countdown > 0}
                  className="text-yellow-50 hover:underline disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {isResending ? 'Sending...' : `Resend ${countdown > 0 ? `(${countdown}s)` : ''}`}
                </button>
              </p>
              
              <Link 
                to="/login" 
                className="flex items-center justify-center gap-2 text-richblack-5 hover:text-yellow-50 transition-colors font-medium"
              >
                <FiArrowLeft /> Back to Login
              </Link>
            </div>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .otp-input:focus {
          outline: none;
          border: 1px solid rgb(253 224 71) !important;
          box-shadow: 0 0 0 2px rgba(253, 224, 71, 0.2);
        }
      `}</style>
    </div>
  )
}

export default VerifyEmail