import { BsArrowRight, BsShieldCheck } from 'react-icons/bs';
import {
  FiAlertTriangle,
  FiArrowLeft,
  FiBook,
  FiCalendar,
  FiCheckCircle,
  FiCreditCard,
  FiFileText,
  FiLock,
  FiShield,
  FiUser,
  FiXCircle
} from 'react-icons/fi';
import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const TermsAndConditions = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  const [accepted, setAccepted] = useState(false);

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: FiFileText },
    { id: 'accounts', title: 'User Accounts', icon: FiUser },
    { id: 'content', title: 'Course Content', icon: FiBook },
    { id: 'payments', title: 'Payments & Refunds', icon: FiCreditCard },
    { id: 'conduct', title: 'User Conduct', icon: FiShield },
    { id: 'liability', title: 'Liability', icon: FiAlertTriangle },
    { id: 'termination', title: 'Termination', icon: FiLock },
    { id: 'changes', title: 'Changes to Terms', icon: FiCalendar },
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
                <FiFileText className="text-3xl text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                Terms & Conditions
              </h1>
            </div>
            
            <p className="text-xl text-richblack-200 max-w-3xl mx-auto leading-8">
              Please read these terms carefully before using Edvora. By accessing our platform, 
              you agree to be bound by these terms and our Privacy Policy.
            </p>
            
            <div className="flex items-center justify-center gap-4 mt-6 text-richblack-300">
              <FiCalendar className="text-yellow-400" />
              <span>Effective: December 2023</span>
              <BsShieldCheck className="text-green-400 ml-4" />
              <span>Last updated: December 2023</span>
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
                <FiFileText className="text-blue-400" />
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
              
              {/* Acceptance Toggle */}
              <div className="mt-8 p-4 bg-richblack-700/30 rounded-xl border border-richblack-600/50">
                <div className="flex items-center gap-3 mb-3">
                  <input
                    type="checkbox"
                    id="accept-terms"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                    className="w-4 h-4 text-blue-500 bg-richblack-600 border-richblack-400 rounded focus:ring-blue-400 focus:ring-2"
                  />
                  <label htmlFor="accept-terms" className="text-sm font-semibold text-richblack-50">
                    I have read and agree to the terms
                  </label>
                </div>
                <p className="text-xs text-richblack-400">
                  This acknowledgment is for demonstration purposes only.
                </p>
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
                    <FiFileText className="text-blue-400" />
                    Introduction
                  </h2>
                  <div className="space-y-6 text-richblack-200 leading-7">
                    <p>
                      Welcome to Edvora! These Terms and Conditions govern your use of our educational 
                      platform and services. By accessing or using Edvora, you agree to be bound by 
                      these terms and our Privacy Policy.
                    </p>
                    
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-blue-400 mb-3">Key Points</h3>
                      <ul className="text-richblack-200 space-y-3">
                        <li className="flex items-start gap-3">
                          <FiCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                          <span>You must be at least 13 years old to use our platform</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <FiCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                          <span>You are responsible for maintaining account security</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <FiCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                          <span>All course content is protected by copyright</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <FiCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                          <span>We reserve the right to modify these terms</span>
                        </li>
                      </ul>
                    </div>
                    
                    <p>
                      If you do not agree with any part of these terms, you must not use our platform. 
                      We recommend reviewing these terms periodically as they may be updated.
                    </p>
                  </div>
                </motion.section>
              )}

              {/* User Accounts Section */}
              {activeSection === 'accounts' && (
                <motion.section variants={itemVariants}>
                  <h2 className="text-3xl font-bold text-richblack-50 mb-6 flex items-center gap-3">
                    <FiUser className="text-green-400" />
                    User Accounts
                  </h2>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-green-400 mb-3">Account Creation</h3>
                        <ul className="text-richblack-200 space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <FiCheckCircle className="text-green-400" />
                            Provide accurate registration information
                          </li>
                          <li className="flex items-center gap-2">
                            <FiCheckCircle className="text-green-400" />
                            Maintain one account per user
                          </li>
                          <li className="flex items-center gap-2">
                            <FiCheckCircle className="text-green-400" />
                            Keep login credentials secure
                          </li>
                          <li className="flex items-center gap-2">
                            <FiCheckCircle className="text-green-400" />
                            Notify us of unauthorized access
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-red-400 mb-3">Prohibited Actions</h3>
                        <ul className="text-richblack-200 space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <FiXCircle className="text-red-400" />
                            Sharing accounts with others
                          </li>
                          <li className="flex items-center gap-2">
                            <FiXCircle className="text-red-400" />
                            Creating multiple accounts
                          </li>
                          <li className="flex items-center gap-2">
                            <FiXCircle className="text-red-400" />
                            Using false information
                          </li>
                          <li className="flex items-center gap-2">
                            <FiXCircle className="text-red-400" />
                            Impersonating others
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-yellow-400 mb-3">Account Security</h3>
                      <p className="text-richblack-200">
                        You are responsible for maintaining the confidentiality of your account credentials 
                        and for all activities that occur under your account. We recommend using strong, 
                        unique passwords and enabling two-factor authentication when available.
                      </p>
                    </div>
                  </div>
                </motion.section>
              )}

              {/* Course Content Section */}
              {activeSection === 'content' && (
                <motion.section variants={itemVariants}>
                  <h2 className="text-3xl font-bold text-richblack-50 mb-6 flex items-center gap-3">
                    <FiBook className="text-purple-400" />
                    Course Content & Intellectual Property
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-purple-400 mb-4">License Grant</h3>
                      <p className="text-richblack-200 mb-4">
                        Upon enrollment, Edvora grants you a limited, non-exclusive, non-transferable 
                        license to access and use the course content for your personal, non-commercial 
                        educational purposes.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h4 className="font-semibold text-richblack-50 mb-2">You May:</h4>
                          <ul className="text-richblack-200 space-y-1">
                            <li>• Access course materials for learning</li>
                            <li>• Download resources for personal use</li>
                            <li>• Complete assignments and projects</li>
                            <li>• Participate in course discussions</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-richblack-50 mb-2">You May Not:</h4>
                          <ul className="text-richblack-200 space-y-1">
                            <li>• Share login credentials</li>
                            <li>• Redistribute course content</li>
                            <li>• Create derivative works</li>
                            <li>• Use content commercially</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-blue-400 mb-3">User-Generated Content</h3>
                      <p className="text-richblack-200">
                        By submitting assignments, projects, or other content to Edvora, you grant us 
                        a license to use, reproduce, and display that content for educational purposes 
                        and platform improvement. You retain ownership of your original work.
                      </p>
                    </div>
                  </div>
                </motion.section>
              )}

              {/* Payments & Refunds Section */}
              {activeSection === 'payments' && (
                <motion.section variants={itemVariants}>
                  <h2 className="text-3xl font-bold text-richblack-50 mb-6 flex items-center gap-3">
                    <FiCreditCard className="text-orange-400" />
                    Payments, Refunds & Subscription Terms
                  </h2>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-orange-400 mb-3">Payment Terms</h3>
                        <ul className="text-richblack-200 space-y-2 text-sm">
                          <li>• All prices are in INR (Indian Rupees)</li>
                          <li>• Payment is required before course access</li>
                          <li>• We accept major credit cards and UPI</li>
                          <li>• Taxes are included in displayed prices</li>
                          <li>• Subscription fees auto-renew unless canceled</li>
                        </ul>
                      </div>
                      
                      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-green-400 mb-3">Refund Policy</h3>
                        <ul className="text-richblack-200 space-y-2 text-sm">
                          <li>• 30-day money-back guarantee</li>
                          <li>• No refunds after certificate issuance</li>
                          <li>• Partial completion may affect refunds</li>
                          <li>• Refunds processed within 7-10 business days</li>
                          <li>• Contact support for refund requests</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-yellow-400 mb-3">Subscription Cancellation</h3>
                      <p className="text-richblack-200">
                        You may cancel your subscription at any time through your account settings. 
                        Cancellation will take effect at the end of your current billing cycle, and 
                        you will retain access until that date. No partial refunds are provided for 
                        subscription cancellations.
                      </p>
                    </div>
                  </div>
                </motion.section>
              )}

              {/* User Conduct Section */}
              {activeSection === 'conduct' && (
                <motion.section variants={itemVariants}>
                  <h2 className="text-3xl font-bold text-richblack-50 mb-6 flex items-center gap-3">
                    <FiShield className="text-red-400" />
                    User Conduct & Community Guidelines
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-red-400 mb-4">Prohibited Conduct</h3>
                      <div className="grid md:grid-cols-2 gap-6 text-sm">
                        <div>
                          <h4 className="font-semibold text-richblack-50 mb-2">Academic Integrity</h4>
                          <ul className="text-richblack-200 space-y-2">
                            <li className="flex items-center gap-2">
                              <FiXCircle className="text-red-400" />
                              Plagiarism or cheating
                            </li>
                            <li className="flex items-center gap-2">
                              <FiXCircle className="text-red-400" />
                              Submitting others' work
                            </li>
                            <li className="flex items-center gap-2">
                              <FiXCircle className="text-red-400" />
                              Unauthorized collaboration
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-richblack-50 mb-2">Community Behavior</h4>
                          <ul className="text-richblack-200 space-y-2">
                            <li className="flex items-center gap-2">
                              <FiXCircle className="text-red-400" />
                              Harassment or bullying
                            </li>
                            <li className="flex items-center gap-2">
                              <FiXCircle className="text-red-400" />
                              Hate speech or discrimination
                            </li>
                            <li className="flex items-center gap-2">
                              <FiXCircle className="text-red-400" />
                              Spamming or advertising
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-green-400 mb-3">Expected Behavior</h3>
                      <p className="text-richblack-200">
                        We encourage respectful communication, collaboration, and academic integrity. 
                        Help create a positive learning environment by being supportive of fellow 
                        learners and contributing constructively to discussions.
                      </p>
                    </div>
                  </div>
                </motion.section>
              )}

              {/* Quick Action Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-12 pt-8 border-t border-richblack-700/50"
              >
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${accepted ? 'bg-green-500/20' : 'bg-yellow-500/20'}`}>
                      {accepted ? (
                        <FiCheckCircle className="text-green-400 text-xl" />
                      ) : (
                        <FiAlertTriangle className="text-yellow-400 text-xl" />
                      )}
                    </div>
                    <div>
                      <p className="text-richblack-50 font-medium">
                        {accepted ? 'Terms Accepted' : 'Review Required'}
                      </p>
                      <p className="text-richblack-400 text-sm">
                        {accepted ? 'You have acknowledged reading the terms' : 'Please review all sections carefully'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-richblack-600 text-richblack-200 rounded-xl hover:bg-richblack-500 transition-all duration-300 font-semibold"
                    >
                      <FiFileText />
                      Questions?
                    </Link>
                    {accepted && (
                      <Link
                        to="/courses"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg shadow-blue-500/25"
                      >
                        Continue to Courses
                        <BsArrowRight />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;