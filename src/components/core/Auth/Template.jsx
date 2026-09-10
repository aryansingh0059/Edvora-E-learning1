import { FcGoogle } from "react-icons/fc"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import { useSelector } from "react-redux"

export default function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth)

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-10 items-center justify-between text-white">
      {/* Left Section */}
      <div className="lg:w-1/2 w-full">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          {title}
        </h1>
        <p className="text-richblack-200 mb-6 text-base sm:text-lg">
          {description1} <br /> {description2}
        </p>

        {/* Form */}
        {loading ? (
          <div className="h-10 w-10 border-4 border-t-transparent border-blue-400 rounded-full animate-spin mx-auto" />
        ) : formType === "signup" ? (
          <SignupForm />
        ) : (
          <LoginForm />
        )}

        {/* Divider */}
        <div className="flex items-center gap-2 my-6">
          <div className="h-[1px] bg-richblack-600 flex-1" />
          <span className="text-richblack-300 text-sm">OR</span>
          <div className="h-[1px] bg-richblack-600 flex-1" />
        </div>

        {/* Google Login */}
        <button className="w-full flex items-center justify-center gap-3 border border-richblack-600 py-2.5 rounded-md hover:bg-richblack-700 transition-all duration-200">
          <FcGoogle size={22} /> Sign in with Google
        </button>
      </div>

      {/* Right Section (Image) */}
      <div className="lg:w-1/2 w-full flex justify-center">
        <img
          src={image}
          alt="Auth Illustration"
          className="w-[90%] sm:w-[80%] max-w-md drop-shadow-[0_0_20px_rgba(59,130,246,0.15)] rounded-lg"
        />
      </div>
    </div>
  )
}
