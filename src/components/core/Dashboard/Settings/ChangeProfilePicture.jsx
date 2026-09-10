import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"

import { FiUpload } from "react-icons/fi"
import IconBtn from "../../../common/IconBtn"
import { updateDisplayPicture } from "../../../../services/operations/SettingsApi"

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)
  const fileInputRef = useRef(null)

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      previewFile(file)
    }
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const handleFileUpload = () => {
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("displayPicture", imageFile)
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false)
      })
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile)
    }
  }, [imageFile])

  return (
    <div className="rounded-2xl border border-richblack-700 bg-richblack-800/50 p-8 backdrop-blur-sm">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          {/* Profile Image */}
          <div className="relative">
            <img
              src={previewSource || user?.image}
              alt={`profile-${user?.firstName}`}
              className="w-24 h-24 rounded-2xl object-cover border-2 border-richblack-600 shadow-lg"
            />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-2 border-richblack-800"></div>
          </div>
          
          {/* Upload Section */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-richblack-5 mb-1">
                Profile Picture
              </h3>
              <p className="text-sm text-richblack-300">
                JPG, PNG, GIF allowed. Max size 5MB.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg, image/jpg"
              />
              <button
                onClick={handleClick}
                disabled={loading}
                className="flex items-center gap-2 rounded-lg bg-richblack-700 px-6 py-3 font-medium text-richblack-50 hover:bg-richblack-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Choose Image</span>
              </button>
              
              <IconBtn
                text={loading ? "Uploading..." : "Upload"}
                onclick={handleFileUpload}
                disabled={!imageFile || loading}
                customClasses="flex items-center gap-2"
              >
                {!loading && (
                  <FiUpload className="text-lg" />
                )}
              </IconBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}