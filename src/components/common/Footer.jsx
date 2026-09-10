import { FaFacebook, FaGithub, FaHeart, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

import { FiArrowUpRight } from "react-icons/fi";
// import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";

// Images
// import Logo from "../../assets/Logo/Edvora.png";
// import React from "react";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className="relative bg-gradient-to-br from-richblack-900 via-richblack-800 to-richblack-900 border-t border-richblack-700/50 overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-start justify-between w-11/12 max-w-maxContent text-richblack-300 leading-6 mx-auto py-20">
        
        {/* Main Footer Content */}
        <div className="w-full flex flex-col lg:flex-row gap-16 pb-12">
          
          {/* Section 1 - Brand & Contact */}
          <div className="lg:w-[40%] flex flex-col gap-8">
            
            {/* Brand Section */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3 group">
                {/* <img 
                  src={Logo} 
                  alt="Edvora Logo" 
                  className="object-contain w-44 h-auto filter brightness-0 invert opacity-95 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"
                /> */}
               <span className="text-5xl font-black bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-size-200 bg-pos-0 hover:bg-pos-100 bg-clip-text text-transparent transition-all duration-1000 animate-pulse [text-shadow:_0_0_30px_rgb(251_191_36_/_30%)]">
  Edvora
</span>
              </div>
              
              <p className="text-richblack-200 text-lg leading-8 font-light">
                Empowering millions of learners worldwide with cutting-edge education, 
                industry-relevant skills, and transformative learning experiences.
              </p>

              {/* Newsletter Subscription */}
              <div className="flex flex-col gap-4 mt-4">
                <h3 className="text-richblack-50 font-bold text-xl">Stay Updated</h3>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-richblack-800 border border-richblack-600 rounded-xl text-richblack-50 placeholder-richblack-400 focus:outline-none focus:border-yellow-500 transition-all duration-300"
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-richblack-900 font-bold rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-yellow-500/25">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-4">
              <h3 className="text-richblack-50 font-bold text-xl">Connect With Us</h3>
              <div className="flex gap-4 text-2xl">
                {[
                  { Icon: FaFacebook, color: "hover:text-blue-500", bg: "hover:bg-blue-500/10" },
                  { Icon: FaTwitter, color: "hover:text-blue-400", bg: "hover:bg-blue-400/10" },
                  { Icon: FaInstagram, color: "hover:text-pink-500", bg: "hover:bg-pink-500/10" },
                  { Icon: FaLinkedin, color: "hover:text-blue-600", bg: "hover:bg-blue-600/10" },
                  { Icon: FaYoutube, color: "hover:text-red-600", bg: "hover:bg-red-600/10" },
                  { Icon: FaGithub, color: "hover:text-gray-300", bg: "hover:bg-gray-500/10" },
                ].map(({ Icon, color, bg }, index) => (
                  <Link
                    key={index}
                    to="#"
                    className={`p-3 rounded-2xl bg-richblack-800 border border-richblack-600 text-richblack-400 ${color} ${bg} transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl`}
                  >
                    <Icon />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2 - Links Grid */}
          <div className="lg:w-[60%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            
            {/* Resources */}
            <div className="flex flex-col gap-6">
              <h3 className="text-richblack-50 font-bold text-xl flex items-center gap-2">
                Resources
                <FiArrowUpRight className="text-yellow-400 text-lg" />
              </h3>
              <div className="flex flex-col gap-4">
                {Resources.map((ele, index) => (
                  <Link
                    key={index}
                    to={ele.split(" ").join("-").toLowerCase()}
                    className="group flex items-center gap-2 text-richblack-300 hover:text-yellow-50 transition-all duration-200 text-base font-medium"
                  >
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    <span className="group-hover:translate-x-1 transform transition-transform duration-200">
                      {ele}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Plans & Community */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                <h3 className="text-richblack-50 font-bold text-xl flex items-center gap-2">
                  Plans
                  <FiArrowUpRight className="text-yellow-400 text-lg" />
                </h3>
                <div className="flex flex-col gap-4">
                  {Plans.map((ele, index) => (
                    <Link
                      key={index}
                      to={ele.split(" ").join("-").toLowerCase()}
                      className="group flex items-center gap-2 text-richblack-300 hover:text-yellow-50 transition-all duration-200 text-base font-medium"
                    >
                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                      <span className="group-hover:translate-x-1 transform transition-transform duration-200">
                        {ele}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <h3 className="text-richblack-50 font-bold text-xl flex items-center gap-2">
                  Community
                  <FiArrowUpRight className="text-yellow-400 text-lg" />
                </h3>
                <div className="flex flex-col gap-4">
                  {Community.map((ele, index) => (
                    <Link
                      key={index}
                      to={ele.split(" ").join("-").toLowerCase()}
                      className="group flex items-center gap-2 text-richblack-300 hover:text-yellow-50 transition-all duration-200 text-base font-medium"
                    >
                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                      <span className="group-hover:translate-x-1 transform transition-transform duration-200">
                        {ele}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Company & Support */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                <h3 className="text-richblack-50 font-bold text-xl flex items-center gap-2">
                  Company
                  <FiArrowUpRight className="text-yellow-400 text-lg" />
                </h3>
                <div className="flex flex-col gap-4">
                  {["About", "Careers", "Affiliates", "Press"].map((ele, i) => (
                    <Link
                      key={i}
                      to={ele.toLowerCase()}
                      className="group flex items-center gap-2 text-richblack-300 hover:text-yellow-50 transition-all duration-200 text-base font-medium"
                    >
                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                      <span className="group-hover:translate-x-1 transform transition-transform duration-200">
                        {ele}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <h3 className="text-richblack-50 font-bold text-xl flex items-center gap-2">
                  Support
                  <FiArrowUpRight className="text-yellow-400 text-lg" />
                </h3>
                <div className="flex flex-col gap-4">
                  {["Help Center", "Contact Us", "System Status", "Report Issue"].map((ele, i) => (
                    <Link
                      key={i}
                      to={ele.split(" ").join("-").toLowerCase()}
                      className="group flex items-center gap-2 text-richblack-300 hover:text-yellow-50 transition-all duration-200 text-base font-medium"
                    >
                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                      <span className="group-hover:translate-x-1 transform transition-transform duration-200">
                        {ele}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="relative z-10 border-t border-richblack-700/50 bg-richblack-900/50 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row items-center justify-between w-11/12 max-w-maxContent mx-auto py-8 gap-6">
          
          {/* Legal Links */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3">
            {BottomFooter.map((ele, i) => (
              <Link
                key={i}
                to={ele.split(" ").join("-").toLowerCase()}
                className="group flex items-center gap-2 text-richblack-400 hover:text-yellow-50 transition-all duration-200 px-4 py-2 rounded-xl hover:bg-richblack-700/50 font-medium text-sm"
              >
                <span>{ele}</span>
                <FiArrowUpRight className="text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-3 text-richblack-300 font-medium">
            <div className="flex items-center gap-2 bg-richblack-800 px-4 py-2 rounded-xl border border-richblack-600">
              <span>Made with</span>
              <FaHeart className="text-red-300  animate-pulse" />
              <span>by Aryan Singh</span>
            </div>
            <span className="text-richblack-400 text-sm">© 2024 Edvora. All rights reserved.</span>
          </div>
        </div>
      </div>

      {/* Floating CTA */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="group flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-richblack-900 font-bold rounded-2xl shadow-2xl shadow-yellow-500/25 hover:shadow-yellow-500/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
          <span>Start Learning Free</span>
          <FiArrowUpRight className="text-xl group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
};

export default Footer;