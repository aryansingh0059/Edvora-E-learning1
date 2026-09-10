import IconBtn from "../../common/IconBtn"
import { RiEditBoxLine } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen w-full px-6 py-10 bg-gradient-to-br from-richblack-900 via-richblack-800 to-richblack-900">
      {/* Enhanced Header */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-200 via-amber-200 to-yellow-200 bg-clip-text text-transparent tracking-tight">
          My Profile
        </h1>
        <p className="mt-3 text-richblack-300 text-lg">
          Manage your personal information and preferences
        </p>
      </div>

      {/* Enhanced Profile Card */}
      <div className="group relative mb-10 overflow-hidden rounded-3xl border border-richblack-600/30 bg-gradient-to-br from-richblack-800/60 to-richblack-900/40 p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-yellow-500/30 hover:shadow-yellow-500/10">
        {/* Background Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-x-6">
            <div className="relative">
              <img
                src={user?.image}
                alt={`profile-${user?.firstName}`}
                className="h-24 w-24 rounded-2xl border-2 border-yellow-400/50 object-cover shadow-lg transition-all duration-300 group-hover:border-yellow-400 group-hover:shadow-yellow-400/20"
              />
              <div className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full bg-green-400 border-2 border-richblack-800"></div>
            </div>
            <div>
              <p className="text-3xl font-bold text-richblack-5 mb-2">
                {user?.firstName + " " + user?.lastName}
              </p>
              <p className="text-richblack-300 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                {user?.email}
              </p>
            </div>
          </div>
          {/* <IconBtn
            text="Edit Profile"
            onclick={() => navigate("/dashboard/settings")}
            customClasses="transform transition-transform duration-300 hover:scale-105"
          >
            <RiEditBoxLine size={22} className="transition-transform duration-300 group-hover:rotate-12" />
          </IconBtn> */}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Enhanced About Section */}
        <div className="group relative overflow-hidden rounded-3xl border border-richblack-600/30 bg-gradient-to-br from-richblack-800/60 to-richblack-900/40 p-8 shadow-xl backdrop-blur-xl transition-all duration-500 hover:border-yellow-500/30 hover:shadow-yellow-500/10">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-amber-500"></div>
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-2xl font-semibold text-richblack-5 mb-2">About Me</p>
              <p className="text-sm text-richblack-400">Tell others about yourself</p>
            </div>
            <IconBtn
              text="Edit"
              onclick={() => navigate("/dashboard/settings")}
              customClasses="transform transition-transform duration-300 hover:scale-105"
            >
              <RiEditBoxLine size={20} />
            </IconBtn>
          </div>
          
          <div className="bg-richblack-700/30 rounded-2xl p-6 border border-richblack-600/50 transition-all duration-300 group-hover:border-richblack-500/50">
            <p
              className={`text-lg leading-relaxed ${
                user?.additionalDetails?.about
                  ? "text-richblack-50"
                  : "text-richblack-400 italic"
              }`}
            >
              {user?.additionalDetails?.about ?? "Share your story, interests, or professional background..."}
            </p>
          </div>
        </div>

        {/* Enhanced Personal Details Section */}
        <div className="group relative overflow-hidden rounded-3xl border border-richblack-600/30 bg-gradient-to-br from-richblack-800/60 to-richblack-900/40 p-8 shadow-xl backdrop-blur-xl transition-all duration-500 hover:border-yellow-500/30 hover:shadow-yellow-500/10">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-2xl font-semibold text-richblack-5 mb-2">Personal Details</p>
              <p className="text-sm text-richblack-400">Your basic information</p>
            </div>
            {/* <IconBtn
              text="Edit"
              onclick={() => navigate("/dashboard/settings")}
              customClasses="transform transition-transform duration-300 hover:scale-105"
            >
              <RiEditBoxLine size={20} />
            </IconBtn> */}
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Row 1 */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-richblack-700/30 rounded-xl p-4 border border-richblack-600/50 transition-all duration-300 hover:border-yellow-500/30">
                <p className="text-xs uppercase tracking-wider text-richblack-400 mb-2">First Name</p>
                <p className="text-base font-semibold text-richblack-50">
                  {user?.firstName}
                </p>
              </div>
              <div className="bg-richblack-700/30 rounded-xl p-4 border border-richblack-600/50 transition-all duration-300 hover:border-yellow-500/30">
                <p className="text-xs uppercase tracking-wider text-richblack-400 mb-2">Last Name</p>
                <p className="text-base font-semibold text-richblack-50">
                  {user?.lastName}
                </p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="bg-richblack-700/30 rounded-xl p-4 border border-richblack-600/50 transition-all duration-300 hover:border-yellow-500/30">
              <p className="text-xs uppercase tracking-wider text-richblack-400 mb-2">Email Address</p>
              <p className="text-base font-semibold text-richblack-50">
                {user?.email}
              </p>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-richblack-700/30 rounded-xl p-4 border border-richblack-600/50 transition-all duration-300 hover:border-yellow-500/30">
                <p className="text-xs uppercase tracking-wider text-richblack-400 mb-2">Phone Number</p>
                <p className={`text-base font-semibold ${user?.additionalDetails?.contactNumber ? 'text-richblack-50' : 'text-richblack-400 italic'}`}>
                  {user?.additionalDetails?.contactNumber ?? "Not provided"}
                </p>
              </div>
              <div className="bg-richblack-700/30 rounded-xl p-4 border border-richblack-600/50 transition-all duration-300 hover:border-yellow-500/30">
                <p className="text-xs uppercase tracking-wider text-richblack-400 mb-2">Gender</p>
                <p className={`text-base font-semibold ${user?.additionalDetails?.gender ? 'text-richblack-50' : 'text-richblack-400 italic'}`}>
                  {user?.additionalDetails?.gender ?? "Not specified"}
                </p>
              </div>
            </div>

            {/* Row 4 */}
            <div className="bg-richblack-700/30 rounded-xl p-4 border border-richblack-600/50 transition-all duration-300 hover:border-yellow-500/30">
              <p className="text-xs uppercase tracking-wider text-richblack-400 mb-2">Date of Birth</p>
              <p className={`text-base font-semibold ${user?.additionalDetails?.dateOfBirth ? 'text-richblack-50' : 'text-richblack-400 italic'}`}>
                {user?.additionalDetails?.dateOfBirth ?? "Not provided"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-1/4 right-10 w-72 h-72 bg-yellow-400/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed bottom-1/4 left-10 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
    </div>
  )
}