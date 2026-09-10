// Icons
import { VscSettingsGear, VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";

// Components
import ConfirmationModal from "../../common/ConfirmationModal";
import SidebarLink from "./SidebarLink";
// Services & Data
import { logout } from "../../../services/operations/authAPI";
import { sidebarLinks } from "../../../data/dashboard-links";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Redux state selectors
  const { user, loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);
  
  // Local state
  const [confirmationModal, setConfirmationModal] = useState(null);

  // Show loading spinner while data is being fetched
  if (profileLoading || authLoading) {
    return (
      <div className="flex h-[calc(100vh-3.5rem)] min-w-[260px] items-center justify-center border-r border-richblack-700 bg-gradient-to-b from-richblack-800 to-richblack-900">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-richblack-200 border-t-yellow-400"></div>
          <p className="text-sm text-richblack-300">Loading...</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    setConfirmationModal({
      text1: "Are you sure?",
      text2: "You will be logged out of your account.",
      btn1Text: "Logout",
      btn2Text: "Cancel",
      btn1Handler: () => dispatch(logout(navigate)),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  return (
    <>
      <div className="flex h-[calc(100vh-3.5rem)] min-w-[260px] flex-col border-r border-richblack-700 bg-gradient-to-b from-richblack-800 to-richblack-900 py-8">
        
        {/* User Profile Section */}
        <div className="mb-8 px-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center text-white font-bold">
              {user?.firstName?.[0]?.toUpperCase() || "U"}
            </div>
            <div>
              <p className="font-semibold text-richblack-50">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-richblack-300 capitalize">
                {user?.accountType} Account
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 space-y-1">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null;
            return (
              <SidebarLink 
                key={link.id} 
                link={link} 
                iconName={link.icon} 
              />
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="mt-auto space-y-1">
          {/* Divider */}
          <div className="mx-6 mb-4 h-px bg-gradient-to-r from-transparent via-richblack-600 to-transparent" />
          
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />
          
          <button
            onClick={handleLogout}
            className="group mx-3 my-1 flex w-[calc(100%-1.5rem)] items-center gap-3 rounded-xl px-6 py-4 text-sm font-medium text-richblack-300 transition-all duration-300 hover:bg-red-500/10 hover:text-red-200 hover:translate-x-1"
          >
            <div className="rounded-lg bg-richblack-600/50 p-2 transition-all duration-300 group-hover:bg-red-500/20">
              <VscSignOut className="text-lg text-red-400" />
            </div>
            <span className="transition-all duration-300 group-hover:text-red-200">
              Logout
            </span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal} />
      )}
    </>
  );
}