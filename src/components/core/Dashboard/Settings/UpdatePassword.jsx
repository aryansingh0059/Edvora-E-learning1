import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import React, { useState } from "react"

import IconBtn from "../../../common/IconBtn"
import { changePassword } from "../../../../services/operations/SettingsApi"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitPasswordForm = async (data) => {
    try {
      await changePassword(token, data)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitPasswordForm)}>
      <div className="rounded-2xl border border-richblack-700 bg-richblack-800/50 p-8 backdrop-blur-sm">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-richblack-5 mb-2">
            Change Password
          </h2>
          <p className="text-richblack-300">
            Update your password to keep your account secure
          </p>
        </div>

        {/* Password Fields */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Password */}
          <div className="space-y-2">
            <label htmlFor="oldPassword" className="block text-sm font-medium text-richblack-200">
              Current Password *
            </label>
            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                id="oldPassword"
                className="w-full rounded-lg bg-richblack-700 border border-richblack-600 px-4 py-3 pr-12 text-richblack-5 placeholder-richblack-400 focus:outline-none focus:border-yellow-500 transition-colors duration-300"
                placeholder="Enter current password"
                {...register("oldPassword", { required: true })}
              />
              <button
                type="button"
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-richblack-400 hover:text-richblack-200 transition-colors duration-300"
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
            {errors.oldPassword && (
              <span className="text-sm text-yellow-100">
                Please enter your current password
              </span>
            )}
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <label htmlFor="newPassword" className="block text-sm font-medium text-richblack-200">
              New Password *
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                className="w-full rounded-lg bg-richblack-700 border border-richblack-600 px-4 py-3 pr-12 text-richblack-5 placeholder-richblack-400 focus:outline-none focus:border-yellow-500 transition-colors duration-300"
                placeholder="Enter new password"
                {...register("newPassword", { required: true })}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-richblack-400 hover:text-richblack-200 transition-colors duration-300"
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <span className="text-sm text-yellow-100">
                Please enter your new password
              </span>
            )}
          </div>
        </div>

        {/* Security Tips */}
        <div className="mt-6 p-4 bg-richblack-700/50 rounded-lg">
          <p className="text-sm text-richblack-300">
            💡 <strong>Tip:</strong> Use a strong password with at least 8 characters including numbers and symbols.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <button
          type="button"
          onClick={() => navigate("/dashboard/my-profile")}
          className="px-8 py-3 rounded-lg bg-richblack-700 text-richblack-50 font-medium hover:bg-richblack-600 transition-all duration-300"
        >
          Cancel
        </button>
        <IconBtn 
          type="submit" 
          text="Update Password" 
          customClasses="px-8 py-3 bg-yellow-50 text-richblack-900 hover:bg-yellow-200 transition-all duration-300"
        />
      </div>
    </form>
  )
}