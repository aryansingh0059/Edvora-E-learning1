import { BsArrowRight, BsShieldCheck } from 'react-icons/bs';
import {
  FiArrowLeft,
  FiCalendar,
  FiCheckCircle,
  FiDatabase,
  FiEye,
  FiLock,
  FiMail,
  FiShield,
  FiUser
} from 'react-icons/fi';
import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: FiShield },
    { id: 'data-collection', title: 'Data We Collect', icon: FiDatabase },
    { id: 'data-usage', title: 'How We Use Data', icon: FiEye },
    { id: 'data-protection', title: 'Data Protection', icon: FiLock },
    { id: 'user-rights', title: 'Your Rights', icon: FiUser },
    { id: 'cookies', title: 'Cookies', icon: FiCheckCircle },
    { id: 'updates', title: 'Policy Updates', icon: FiCalendar },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-richblack-900 via-richblack-800 to-richblack-900">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-richblack-700/50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-richblack-300 hover:text-yellow-400 transition-all duration-300 mb-8 group"
            >
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Home
            </Link>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-2xl">
                <FiShield className="text-3xl text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                Privacy Policy
              </h1>
            </div>
            
            <p className="text-xl text-richblack-200 max-w-3xl mx-auto leading-8">
              Your privacy is our priority. Learn how Edvora protects your data and empowers 
              your learning journey with complete transparency and security.
            </p>
            
            <div className="flex items-center justify-center gap-4 mt-6 text-richblack-300">
              <FiCalendar className="text-yellow-400" />
              <span>Last updated: December 2023</span>
              <BsShieldCheck className="text-green-400 ml-4" />
              <span>GDPR Compliant</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/4"
          >
            <div className="sticky top-8 bg-richblack-800/50 backdrop-blur-sm rounded-2xl border border-richblack-700/50 p-6 shadow-2xl">
              <h3 className="text-lg font-bold text-richblack-50 mb-6 flex items-center gap-2">
                <FiShield className="text-blue-400" />
                Quick Navigation
              </h3>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 group ${
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-400'
                          : 'text-richblack-300 hover:text-richblack-50 hover:bg-richblack-700/50'
                      }`}
                    >
                      <Icon className={`text-lg ${
                        activeSection === section.id ? 'text-blue-400' : 'text-richblack-400'
                      }`} />
                      <span className="font-medium">{section.title}</span>
                      <BsArrowRight className={`ml-auto text-sm transition-transform duration-300 ${
                        activeSection === section.id ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'
                      }`} />
                    </button>
                  );
                })}
              </nav>
              
              {/* Quick Contact */}
              <div className="mt-8 p-4 bg-richblack-700/30 rounded-xl border border-richblack-600/50">
                <h4 className="text-sm font-semibold text-richblack-50 mb-2">Questions?</h4>
                <p className="text-xs text-richblack-300 mb-3">
                  Contact our privacy team
                </p>
                <Link
                  to="/contact"
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1 group"
                >
                  Contact Us
                  <BsArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:w-3/4"
          >
            <div className="bg-richblack-800/30 backdrop-blur-sm rounded-2xl border border-richblack-700/50 p-8 shadow-2xl">
              
              {/* Introduction Section */}
              {activeSection === 'introduction' && (
                <motion.section variants={itemVariants}>
                  <h2 className="text-3xl font-bold text-richblack-50 mb-6 flex items-center gap-3">
                    <FiShield className="text-blue-400" />
                    Introduction
                  </h2>
                  <div className="space-y-6 text-richblack-200 leading-7">
                    <p>
                      Welcome to Edvora! We are committed to protecting your privacy and ensuring 
                      that your personal information is handled in a safe and responsible manner. 
                      This Privacy Policy explains how we collect, use, disclose, and safeguard 
                      your information when you use our educational platform.
                    </p>
                    
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-blue-400 mb-3">Our Commitment</h3>
                      <p>
                        We believe in transparency and are dedicated to protecting your data while 
                        providing you with the best learning experience possible.
                      </p>
                    </div>
                    
                    <p>
                      By using Edvora, you agree to the collection and use of information in 
                      accordance with this policy. We regularly review and update our privacy 
                      practices to ensure compliance with global standards including GDPR, CCPA, 
                      and other applicable regulations.
                    </p>
                  </div>
                </motion.section>
              )}

              {/* Data Collection Section */}
              {activeSection === 'data-collection' && (
                <motion.section variants={itemVariants}>
                  <h2 className="text-3xl font-bold text-richblack-50 mb-6 flex items-center gap-3">
                    <FiDatabase className="text-green-400" />
                    Data We Collect
                  </h2>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center gap-2">
                          <FiUser />
                          Personal Information
                        </h3>
                        <ul className="text-richblack-200 space-y-2 text-sm">
                          <li>• Name and contact details</li>
                          <li>• Account credentials</li>
                          <li>• Profile information</li>
                          <li>• Payment information</li>
                          <li>• Educational background</li>
                        </ul>
                      </div>
                      
                      <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-purple-400 mb-3 flex items-center gap-2">
                          <FiEye />
                          Usage Data
                        </h3>
                        <ul className="text-richblack-200 space-y-2 text-sm">
                          <li>• Course progress and completion</li>
                          <li>• Learning preferences</li>
                          <li>• Device information</li>
                          <li>• IP address and location</li>
                          <li>• Browser type and version</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-yellow-400 mb-3">Educational Data</h3>
                      <p className="text-richblack-200">
                        We collect data related to your learning journey, including course enrollments, 
                        assessment scores, project submissions, and interaction with learning materials. 
                        This helps us personalize your experience and improve our platform.
                      </p>
                    </div>
                  </div>
                </motion.section>
              )}

              {/* Data Usage Section */}
              {activeSection === 'data-usage' && (
                <motion.section variants={itemVariants}>
                  <h2 className="text-3xl font-bold text-richblack-50 mb-6 flex items-center gap-3">
                    <FiEye className="text-orange-400" />
                    How We Use Your Data
                  </h2>
                  <div className="space-y-6">
                    <div className="grid gap-4">
                      {[
                        {
                          title: "Personalized Learning",
                          description: "Tailor course recommendations and learning paths based on your progress and interests",
                          color: "blue"
                        },
                        {
                          title: "Platform Improvement",
                          description: "Analyze usage patterns to enhance user experience and develop new features",
                          color: "green"
                        },
                        {
                          title: "Communication",
                          description: "Send important updates, course notifications, and educational content",
                          color: "purple"
                        },
                        {
                          title: "Security & Support",
                          description: "Protect against fraud and provide customer support when needed",
                          color: "red"
                        }
                      ].map((item, index) => (
                        <div key={index} className={`bg-${item.color}-500/10 border border-${item.color}-500/20 rounded-xl p-5`}>
                          <h3 className={`text-lg font-semibold text-${item.color}-400 mb-2`}>
                            {item.title}
                          </h3>
                          <p className="text-richblack-200 text-sm">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.section>
              )}

              {/* Data Protection Section */}
              {activeSection === 'data-protection' && (
                <motion.section variants={itemVariants}>
                  <h2 className="text-3xl font-bold text-richblack-50 mb-6 flex items-center gap-3">
                    <FiLock className="text-red-400" />
                    Data Protection
                  </h2>
                  <div className="space-y-6 text-richblack-200 leading-7">
                    <p>
                      We implement robust security measures to protect your personal information 
                      from unauthorized access, alteration, disclosure, or destruction.
                    </p>
                    
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-red-400 mb-4">Security Measures</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h4 className="font-semibold text-richblack-50 mb-2">Technical Safeguards</h4>
                          <ul className="space-y-1">
                            <li>• End-to-end encryption</li>
                            <li>• Secure socket layer (SSL) technology</li>
                            <li>• Regular security audits</li>
                            <li>• Data encryption at rest</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-richblack-50 mb-2">Organizational Measures</h4>
                          <ul className="space-y-1">
                            <li>• Employee privacy training</li>
                            <li>• Access control policies</li>
                            <li>• Data breach response plan</li>
                            <li>• Regular compliance reviews</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.section>
              )}

              {/* User Rights Section */}
              {activeSection === 'user-rights' && (
                <motion.section variants={itemVariants}>
                  <h2 className="text-3xl font-bold text-richblack-50 mb-6 flex items-center gap-3">
                    <FiUser className="text-green-400" />
                    Your Rights
                  </h2>
                  <div className="space-y-6">
                    <p className="text-richblack-200 leading-7">
                      You have complete control over your personal data. We respect your privacy rights 
                      and provide easy ways to exercise them.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        { right: "Access", desc: "View your personal data" },
                        { right: "Correction", desc: "Update inaccurate information" },
                        { right: "Deletion", desc: "Request data removal" },
                        { right: "Portability", desc: "Export your data" },
                        { right: "Objection", desc: "Opt-out of processing" },
                        { right: "Restriction", desc: "Limit data usage" }
                      ].map((item, index) => (
                        <div key={index} className="bg-green-500/10 border border-green-500/20 rounded-xl p-5">
                          <h3 className="text-lg font-semibold text-green-400 mb-2">
                            {item.right}
                          </h3>
                          <p className="text-richblack-200 text-sm">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-blue-400 mb-3">Exercise Your Rights</h3>
                      <p className="text-richblack-200 text-sm mb-4">
                        To exercise any of these rights, contact our privacy team at 
                        <span className="text-blue-400 font-medium"> privacy@edvora.com</span> 
                        or through your account settings.
                      </p>
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 text-sm font-medium"
                      >
                        Contact Privacy Team
                        <BsArrowRight className="text-xs" />
                      </Link>
                    </div>
                  </div>
                </motion.section>
              )}

              {/* Add other sections similarly... */}

              {/* Quick Navigation Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-12 pt-8 border-t border-richblack-700/50"
              >
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <p className="text-richblack-400 text-sm">
                    Need help understanding our privacy practices?
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg shadow-blue-500/25"
                  >
                    <FiMail />
                    Contact Our Team
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;