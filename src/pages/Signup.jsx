import Template from "../components/core/Auth/Template"
import { motion } from "framer-motion"
import signupImg from "../assets/Images/signup.webp"

export default function Signup() {
  return (
    <div className="min-h-screen bg-richblack-800 relative overflow-hidden flex items-center justify-center">
      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-40 -top-24 w-96 h-96 bg-gradient-to-br from-blue-700 via-purple-700 to-pink-600 rounded-full opacity-10 blur-3xl animate-blob" />
        <div className="absolute -right-36 top-1/3 w-80 h-80 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full opacity-10 blur-2xl animate-blob animation-delay-2000" />
      </div>

      {/* Auth Template */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 shadow-[0_0_25px_rgba(59,130,246,0.15)]">
          <div className="bg-richblack-900/80 backdrop-blur-md rounded-2xl p-8 sm:p-10">
            <Template
              title="Begin Your Coding Journey"
              description1="Transform your future with cutting-edge courses"
              description2="and expert-led instruction"
              image={signupImg}
              formType="signup"
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
