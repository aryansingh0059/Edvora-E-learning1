import { AnimatePresence, motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { useRef, useState } from "react"

import { AiOutlineCaretDown } from "react-icons/ai"
import { logout } from "../../../services/operations/authAPI"
import useOnClickOutside from "../../../hooks/useOnClickOutside"

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))

  if (!user) return null

  return (
    <div className="relative" ref={ref}>
      {/* Profile Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-x-2 rounded-full border border-richblack-700 bg-richblack-800/70 px-2.5 py-1.5 backdrop-blur-sm hover:border-richblack-600 transition-all duration-200"
      >
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="w-[32px] h-[32px] rounded-full object-cover border border-richblack-700"
        />
        <AiOutlineCaretDown
          className={`text-xs text-richblack-100 transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-[120%] right-0 z-[1000] w-44 overflow-hidden rounded-md border border-richblack-700 bg-richblack-900/90 backdrop-blur-md shadow-[0_0_12px_rgba(59,130,246,0.1)]"
          >
            <Link
              to="/dashboard/my-profile"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-x-2 px-3.5 py-2.5 text-sm text-richblack-100 hover:bg-richblack-700 hover:text-white transition-colors duration-200"
            >
              <VscDashboard className="text-lg text-blue-400" />
              Dashboard
            </Link>

            <div className="h-[1px] bg-richblack-700 mx-2" />

            <button
              onClick={() => {
                dispatch(logout(navigate))
                setOpen(false)
              }}
              className="flex w-full items-center gap-x-2 px-3.5 py-2.5 text-sm text-richblack-100 hover:bg-richblack-700 hover:text-pink-400 transition-colors duration-200"
            >
              <VscSignOut className="text-lg" />
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
