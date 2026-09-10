import { AnimatePresence, motion } from "framer-motion"
import { BsLightningFill, BsPatchCheck } from "react-icons/bs"
import { FiArrowRight, FiGift, FiShield, FiShoppingCart } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"

import IconBtn from "../../../common/IconBtn"
import { IoRibbon } from "react-icons/io5"
import { buyCourse } from "../../../../services/operations/StudentFeaturesAPI"
import { useNavigate } from "react-router-dom"

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id)
    buyCourse(token, courses, user, navigate, dispatch)
  }

  const discountAmount = Math.round(total * 0.3) // 30% discount for demo
  const finalAmount = total - discountAmount

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-w-[320px] rounded-2xl bg-gradient-to-br from-richblack-800 to-richblack-900 border border-richblack-600/50 shadow-2xl shadow-black/40 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border-b border-yellow-400/20 p-6">
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 mb-2"
        >
          <div className="p-2 rounded-xl bg-yellow-400/20 border border-yellow-400/30">
            <FiShoppingCart className="text-yellow-400 text-xl" />
          </div>
          <h3 className="text-xl font-bold text-richblack-5">Order Summary</h3>
        </motion.div>
        <motion.p
          variants={itemVariants}
          className="text-richblack-200 text-sm"
        >
          {cart.length} course{cart.length !== 1 ? 's' : ''} in cart
        </motion.p>
      </div>

      {/* Pricing Section */}
      <div className="p-6 space-y-4">
        {/* Original Price */}
        <motion.div
          variants={itemVariants}
          className="flex justify-between items-center"
        >
          <span className="text-richblack-300 text-sm">Original Price:</span>
          <span className="text-richblack-400 line-through text-sm">₹{total}</span>
        </motion.div>

        {/* Discount */}
        <motion.div
          variants={itemVariants}
          className="flex justify-between items-center"
        >
          <div className="flex items-center gap-2">
            <IoRibbon className="text-green-400 text-sm" />
            <span className="text-green-400 text-sm font-medium">Discount (30%):</span>
          </div>
          <span className="text-green-400 text-sm font-medium">-₹{discountAmount}</span>
        </motion.div>

        {/* Total Amount */}
        <motion.div
          variants={itemVariants}
          className="flex justify-between items-center pt-4 border-t border-richblack-600/50"
        >
          <span className="text-richblack-5 font-semibold">Total Amount:</span>
          <div className="text-right">
            <motion.p
              key={finalAmount}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
            >
              ₹ {finalAmount}
            </motion.p>
            <p className="text-green-400 text-xs font-medium mt-1">
              You save ₹{discountAmount}!
            </p>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 gap-3 pt-4"
        >
          <div className="flex items-center gap-2 text-xs text-richblack-300">
            <FiShield className="text-green-400" />
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-richblack-300">
            <BsPatchCheck className="text-blue-400" />
            <span>Certificate</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-richblack-300">
            <FiGift className="text-purple-400" />
            <span>Lifetime Access</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-richblack-300">
            <BsLightningFill className="text-orange-400" />
            <span>Instant Access</span>
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="p-6 bg-richblack-700/30 border-t border-richblack-600/50">
        <motion.button
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 10px 30px rgba(245, 158, 11, 0.3)"
          }}
          whileTap={{ scale: 0.98 }}
          onClick={handleBuyCourse}
          className="w-full py-4 px-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-richblack-900 rounded-xl font-bold text-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 shadow-lg shadow-yellow-500/25 flex items-center justify-center gap-3 group"
        >
          <span>Proceed to Checkout</span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <FiArrowRight className="text-xl group-hover:translate-x-1 transition-transform duration-300" />
          </motion.div>
        </motion.button>

        {/* Guarantee Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-2 mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-xl"
        >
          <BsPatchCheck className="text-green-400 text-lg" />
          <span className="text-green-400 text-sm font-medium">30-Day Money-Back Guarantee</span>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute -top-2 -right-2">
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold rounded-full shadow-lg"
        >
          SAVE 30%
        </motion.div>
      </div>
    </motion.div>
  )
}