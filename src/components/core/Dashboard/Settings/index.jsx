import ChangeProfilePicture from "./ChangeProfilePicture"
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"

export default function Settings() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-richblack-5">
          Account <span className="text-yellow-50">Settings</span>
        </h1>
        <p className="text-richblack-300 text-lg">
          Manage your account preferences and profile information
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-8">
        <ChangeProfilePicture />
        <EditProfile />
        <UpdatePassword />
        <DeleteAccount />
      </div>
    </div>
  )
}