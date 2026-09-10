import Template from "../components/core/Auth/Template"
import loginImg from "../assets/Images/login.webp"
import { motion } from "framer-motion"

export default function Login() {
  return (
    <div className="min-h-screen bg-richblack-800 relative overflow-hidden flex items-center justify-center">
      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-36 w-96 h-96 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-full opacity-10 blur-3xl animate-blob" />
        <div className="absolute -bottom-24 right-0 w-80 h-80 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full opacity-10 blur-2xl animate-blob animation-delay-2000" />
      </div>

      {/* Auth Template */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 shadow-[0_0_25px_rgba(147,51,234,0.15)]">
          <div className="bg-richblack-900/80 backdrop-blur-md rounded-2xl p-8 sm:p-10">
            <Template
              title="Welcome Back"
              description1="Build skills for today, tomorrow, and beyond."
              description2="Education to future-proof your career."
              image={loginImg}
              formType="login"
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
