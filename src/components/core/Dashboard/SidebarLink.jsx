import * as Icons from "react-icons/vsc";

import { NavLink, matchPath, useLocation } from "react-router-dom";

export default function SidebarLink({ link, iconName }) {
  const location = useLocation();
  const Icon = Icons[iconName];
  const isActive = matchPath({ path: link.path }, location.pathname);

  return (
    <NavLink
      to={link.path}
      className={`
        group relative mx-3 my-1 flex items-center rounded-xl px-6 py-4
        text-sm font-medium transition-all duration-300 ease-out
        ${isActive
          ? "bg-gradient-to-r from-yellow-500/20 to-amber-500/10 text-yellow-100 shadow-lg shadow-yellow-500/10"
          : "text-richblack-300 hover:bg-richblack-700/50 hover:text-richblack-50"
        }
      `}
    >
      {/* Animated active indicator */}
      <div
        className={`
          absolute left-3 top-1/2 h-6 w-1 bg-gradient-to-b from-yellow-400 to-amber-400 
          rounded-full transition-all duration-500 ease-out
          ${isActive ? "translate-y-[-50%] opacity-100 scale-100" : "opacity-0 scale-50"}
        `}
      />

      {/* Active state glow effect */}
      {isActive && (
        <div className="absolute inset-0 rounded-xl bg-yellow-400/5 blur-sm" />
      )}

      {/* Link content */}
      <div className="relative z-10 flex items-center gap-4">
        <div
          className={`
            rounded-lg p-2 transition-all duration-300
            ${isActive
              ? "bg-gradient-to-br from-yellow-500 to-amber-500 text-white shadow-md shadow-yellow-500/25"
              : "bg-richblack-600/30 text-richblack-200 group-hover:bg-richblack-500/40 group-hover:text-white"
            }
          `}
        >
          {Icon && <Icon className="text-lg" />}
        </div>
        
        <span 
          className={`
            font-medium transition-all duration-300
            ${isActive ? "text-white" : "group-hover:text-white"}
          `}
        >
          {link.name}
        </span>
      </div>

      {/* Hover arrow indicator */}
      <div
        className={`
          absolute right-4 text-richblack-400 transition-all duration-300 ease-out
          ${isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"}
        `}
      >
        →
      </div>
    </NavLink>
  );
}