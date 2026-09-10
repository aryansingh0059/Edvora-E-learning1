import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { GrCart } from "react-icons/gr";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { NavbarLinks } from "../../data/navbar-links";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import logo from "../../assets/Logo/Edvora.png";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(res?.data?.data || []);
      } catch (error) {
        console.error("❌ Could not fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const location = useLocation();
  const matchRoute = (route) => location.pathname === route;

  return (
    <div className={`flex h-20 items-center justify-center transition-all duration-300 ${
      isScrolled 
        ? "border-b border-richblack-700 bg-richblack-900/95 backdrop-blur-xl shadow-2xl" 
        : "border-b border-richblack-700/50 bg-richblack-900/90 backdrop-blur-lg"
    } sticky top-0 z-50`}>
      
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        
        {/* Logo Section */}
      <Link to="/" className="group flex items-center gap-3">
  <div className="relative">
    <img
      src={logo}
      width={200}
      height={50}
      loading="lazy"
      alt="Edvora"
      className="transition-all duration-300 group-hover:scale-105 filter brightness-0 invert opacity-90 group-hover:opacity-100"
    />
  </div>
</Link>

        {/* Navigation Links */}
        <nav className="hidden lg:block">
          <ul className="flex gap-x-10 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="relative flex items-center gap-2 group cursor-pointer">
                    <p className="font-medium text-richblack-100 group-hover:text-yellow-50 transition-all duration-300 transform group-hover:translate-y-[-1px]">
                      {link.title}
                    </p>
                    <IoIosArrowDropdownCircle className="text-richblack-100 group-hover:text-yellow-50 transition-all duration-300 transform group-hover:rotate-180 group-hover:scale-110" />

                    {/* Enhanced Dropdown */}
                    <div className="absolute left-1/2 top-full mt-4 -translate-x-1/2 flex flex-col rounded-2xl bg-richblack-5 p-6 text-richblack-900 shadow-2xl 
                                    transition-all duration-300 ease-out opacity-0 scale-95 invisible 
                                    group-hover:visible group-hover:opacity-100 group-hover:scale-100 w-80 border border-richblack-100/50">
                      
                      {/* Enhanced triangle pointer */}
                      <div className="absolute left-1/2 -translate-x-1/2 -top-2 h-4 w-4 rotate-45 rounded-sm bg-richblack-5 border-t border-l border-richblack-100/50"></div>

                      <div className="relative z-10">
                        <h3 className="text-lg font-bold text-richblack-800 mb-4 px-2 pb-3 border-b border-richblack-100">
                          Explore Categories
                        </h3>
                        
                        {loading ? (
                          <div className="flex items-center justify-center py-6">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
                          </div>
                        ) : subLinks.length ? (
                          <div className="grid grid-cols-1 gap-2 max-h-72 overflow-y-auto custom-scrollbar pr-2">
                            {subLinks.map((sublink, idx) => (
                              <Link
                                to={`/catalog/${sublink.name.replace(/\s+/g, '-').toLowerCase()}`}
                                key={sublink._id || idx}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-yellow-50 hover:to-yellow-100 hover:text-richblack-900 transition-all duration-200 font-medium text-richblack-700 hover:shadow-md border border-transparent hover:border-yellow-200 group/category"
                                onClick={() => document.activeElement.blur()}
                              >
                                <div className="w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover/category:opacity-100 transition-opacity duration-200"></div>
                                <span className="flex-1">{sublink.name}</span>
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-6 text-richblack-400 text-sm">
                            <div className="w-12 h-12 bg-richblack-100 rounded-full flex items-center justify-center mx-auto mb-2">
                              <span className="text-2xl">📚</span>
                            </div>
                            No categories available
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path} className="group/navlink relative">
                    <p
                      className={`font-medium text-lg ${
                        matchRoute(link?.path)
                          ? "text-yellow-50 font-semibold"
                          : "text-richblack-100"
                      } group-hover/navlink:text-yellow-50 transition-all duration-300 relative overflow-hidden`}
                    >
                      {link?.title}
                      <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-50 to-amber-100 transition-all duration-300 group-hover/navlink:w-full ${
                        matchRoute(link?.path) ? "w-full" : ""
                      }`}></span>
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Auth / Dashboard / Cart Section */}
        <div className="flex items-center gap-x-4">
          {user && user.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative group/cart">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-richblack-700 to-richblack-800 group-hover/cart:from-richblack-600 group-hover/cart:to-richblack-700 transition-all duration-300 shadow-lg border border-richblack-600 group-hover/cart:border-richblack-500">
                <GrCart className="text-xl text-richblack-25 group-hover/cart:text-yellow-50 transition-colors duration-300" />
              </div>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 text-white text-sm font-bold shadow-lg border-2 border-richblack-900 animate-pulse">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 to-purple-400/0 group-hover/cart:from-blue-400/10 group-hover/cart:to-purple-400/10 rounded-2xl transition-all duration-500 blur-sm group-hover/cart:blur-md"></div>
            </Link>
          )}

          {token === null && (
            <div className="flex gap-x-4">
              <Link to="/login">
                <button className="px-8 py-3 rounded-2xl bg-gradient-to-br from-richblack-700 to-richblack-800 text-richblack-25 border border-richblack-600 hover:from-richblack-600 hover:to-richblack-700 hover:border-richblack-500 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Log in
                </button>
              </Link>

              <Link to="/signup">
                <button className="px-8 py-3 rounded-2xl bg-gradient-to-r from-yellow-50 to-amber-100 text-richblack-900 font-semibold hover:from-yellow-100 hover:to-amber-200 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-105">
                  Sign up
                </button>
              </Link>
            </div>
          )}

          {token !== null && <ProfileDropDown />}
        </div>
      </div>

      {/* Mobile Menu Button (Optional) */}
      <div className="lg:hidden flex items-center">
        <button className="p-2 rounded-lg bg-richblack-700 text-richblack-25">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8f9fa;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #E2C044, #FDE68A);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #D4AF37, #F59E0B);
        }
      `}</style>
    </div>
  );
};

export default Navbar;