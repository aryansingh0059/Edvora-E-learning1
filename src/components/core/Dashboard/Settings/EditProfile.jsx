import { useDispatch, useSelector } from "react-redux"

import IconBtn from "../../../common/IconBtn"
import { updateProfile } from "../../../../services/operations/SettingsApi"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitProfileForm = async (data) => {
    try {
      dispatch(updateProfile(token, data))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitProfileForm)}>
      <div className="rounded-2xl border border-richblack-700 bg-richblack-800/50 p-8 backdrop-blur-sm">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-richblack-5 mb-2">
            Profile Information
          </h2>
          <p className="text-richblack-300">
            Update your personal details and information
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Name Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-medium text-richblack-200">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                className="w-full rounded-lg bg-richblack-700 border border-richblack-600 px-4 py-3 text-richblack-5 placeholder-richblack-400 focus:outline-none focus:border-yellow-500 transition-colors duration-300"
                placeholder="Enter first name"
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName}
              />
              {errors.firstName && (
                <span className="text-sm text-yellow-100">
                  Please enter your first name
                </span>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-sm font-medium text-richblack-200">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                className="w-full rounded-lg bg-richblack-700 border border-richblack-600 px-4 py-3 text-richblack-5 placeholder-richblack-400 focus:outline-none focus:border-yellow-500 transition-colors duration-300"
                placeholder="Enter last name"
                {...register("lastName", { required: true })}
                defaultValue={user?.lastName}
              />
              {errors.lastName && (
                <span className="text-sm text-yellow-100">
                  Please enter your last name
                </span>
              )}
            </div>
          </div>

          {/* Date of Birth & Gender Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-richblack-200">
                Date of Birth *
              </label>
              <input
                type="date"
                id="dateOfBirth"
                className="w-full rounded-lg bg-richblack-700 border border-richblack-600 px-4 py-3 text-richblack-5 focus:outline-none focus:border-yellow-500 transition-colors duration-300"
                {...register("dateOfBirth", {
                  required: "Please enter your Date of Birth",
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future",
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
              />
              {errors.dateOfBirth && (
                <span className="text-sm text-yellow-100">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="gender" className="block text-sm font-medium text-richblack-200">
                Gender *
              </label>
              <select
                id="gender"
                className="w-full rounded-lg bg-richblack-700 border border-richblack-600 px-4 py-3 text-richblack-5 focus:outline-none focus:border-yellow-500 transition-colors duration-300"
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              >
                <option value="">Select Gender</option>
                {genders.map((gender, index) => (
                  <option key={index} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
              {errors.gender && (
                <span className="text-sm text-yellow-100">
                  Please select your gender
                </span>
              )}
            </div>
          </div>

          {/* Contact & About Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="contactNumber" className="block text-sm font-medium text-richblack-200">
                Contact Number *
              </label>
              <input
                type="tel"
                id="contactNumber"
                className="w-full rounded-lg bg-richblack-700 border border-richblack-600 px-4 py-3 text-richblack-5 placeholder-richblack-400 focus:outline-none focus:border-yellow-500 transition-colors duration-300"
                placeholder="Enter contact number"
                {...register("contactNumber", {
                  required: "Please enter your Contact Number",
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
                defaultValue={user?.additionalDetails?.contactNumber}
              />
              {errors.contactNumber && (
                <span className="text-sm text-yellow-100">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="about" className="block text-sm font-medium text-richblack-200">
                About *
              </label>
              <input
                type="text"
                id="about"
                className="w-full rounded-lg bg-richblack-700 border border-richblack-600 px-4 py-3 text-richblack-5 placeholder-richblack-400 focus:outline-none focus:border-yellow-500 transition-colors duration-300"
                placeholder="Tell us about yourself"
                {...register("about", { required: true })}
                defaultValue={user?.additionalDetails?.about}
              />
              {errors.about && (
                <span className="text-sm text-yellow-100">
                  Please tell us about yourself
                </span>
              )}
            </div>
          </div>
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
          text="Save Changes" 
          customClasses="px-8 py-3 bg-yellow-50 text-richblack-900 hover:bg-yellow-200 transition-all duration-300"
        />
      </div>
    </form>
  )
}