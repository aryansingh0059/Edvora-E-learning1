import { BsArrowRight, BsShieldCheck } from 'react-icons/bs';
import {
  FiArrowLeft,
  FiCheckCircle,
  FiEye,
  FiPieChart,
  FiRefreshCw,
  FiSettings,
  FiShield,
  FiTarget,
  FiUser
} from 'react-icons/fi';
import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CookiePolicy = () => {
  const [activeSection, setActiveSection] = useState('what-are-cookies');
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false
  });

  const sections = [
    { id: 'what-are-cookies', title: 'What Are Cookies', icon: FiPieChart },
    { id: 'types-of-cookies', title: 'Types of Cookies', icon: FiSettings },
    { id: 'how-we-use', title: 'How We Use Cookies', icon: FiEye },
    { id: 'third-party', title: 'Third-Party Cookies', icon: FiTarget },
    { id: 'managing-cookies', title: 'Managing Cookies', icon: FiUser },
    { id: 'updates', title: 'Policy Updates', icon: FiRefreshCw },
  ];

  const cookieTypes = [
    {
      type: 'necessary',
      title: 'Necessary Cookies',
      description: 'Essential for the website to function properly. Cannot be disabled.',
      required: true,
      icon: FiShield,
      color: 'green'
    },
    {
      type: 'analytics',
      title: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our website.',
      required: false,
      icon: FiEye,
      color: 'blue'
    },
    {
      type: 'preferences',
      title: 'Preference Cookies',
      description: 'Remember your settings and preferences for a better experience.',
      required: false,
      icon: FiSettings,
      color: 'purple'
    },
    {
      type: 'marketing',
      title: 'Marketing Cookies',
      description: 'Used to track visitors across websites for advertising purposes.',
      required: false,
      icon: FiTarget,
      color: 'orange'
    }
  ];

  const handleCookieToggle = (cookieType) => {
    if (cookieType === 'necessary') return; // Necessary cookies cannot be disabled
    
    setCookiePreferences(prev => ({
      ...prev,
      [cookieType]: !prev[cookieType]
    }));
  };

  const savePreferences = () => {
    // In a real app, you would save these preferences to localStorage or send to your backend
    localStorage.setItem('edvora-cookie-preferences', JSON.stringify(cookiePreferences));
    alert('Cookie preferences saved successfully!');
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    };
    setCookiePreferences(allAccepted);
    localStorage.setItem('edvora-cookie-preferences', JSON.stringify(allAccepted));
    alert('All cookies accepted!');
  };

  const rejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    };
    setCookiePreferences(onlyNecessary);
    localStorage.setItem('edvora-cookie-preferences', JSON.stringify(onlyNecessary));
    alert('Only necessary cookies accepted!');
  };

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
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500/5 rounded-full blur-3xl"></div>
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
              <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-500 to-yellow-600 shadow-2xl">
                <FiPieChart className="text-3xl text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-600 bg-clip-text text-transparent">
                Cookie Policy
              </h1>
            </div>
            
            <p className="text-xl text-richblack-200 max-w-3xl mx-auto leading-8">
              We use cookies to enhance your learning experience. Learn about the cookies we use, 
              why we use them, and how you can control your preferences.
            </p>
            
            <div className="flex items-center justify-center gap-4 mt-6 text-richblack-300">
              <FiRefreshCw className="text-yellow-400" />
              <span>Last updated: December 2023</span>
              <BsShieldCheck className="text-green-400 ml-4" />
              <span>GDPR & ePrivacy Compliant</span>
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
                <FiPieChart className="text-orange-400" />
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
                          ? 'bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 text-orange-400'
                          : 'text-richblack-300 hover:text-richblack-50 hover:bg-richblack-700/50'
                      }`}
                    >
                      <Icon className={`text-lg ${
                        activeSection === section.id ? 'text-orange-400' : 'text-richblack-400'
                      }`} />
                      <span className="font-medium">{section.title}</span>
                      <BsArrowRight className={`ml-auto text-sm transition-transform duration-300 ${
                        activeSection === section.id ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'
                      }`} />
                    </button>
                  );
                })}
              </nav>
              
              {/* Cookie Settings Quick Access */}
              <div className="mt-8 p-4 bg-richblack-700/30 rounded-xl border border-richblack-600/50">
                <h4 className="text-sm font-semibold text-richblack-50 mb-2">Cookie Settings</h4>
                <p className="text-xs text-richblack-300 mb-3">
                  Manage your cookie preferences
                </p>
                <button
                  onClick={() => setActiveSection('managing-cookies')}
                  className="text-orange-400 hover:text-orange-300 text-sm font-medium flex items-center gap-1 group"
                >
                  Adjust Settings
                  <BsArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
                </button>
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
              
              {/* What Are Cookies Section */}
              {activeSection === 'what-are-cookies' && (
                <motion.section variants={itemVariants}>
                  <h2 className="text-3xl font-bold text-richblack-50 mb-6 flex items-center gap-3">
                    <FiPieChart className="text-orange-400" />
                    What Are Cookies?
                  </h2>
                  <div className="space-y-6 text-richblack-200 leading-7">
                    <p>
                      Cookies are small text files that are stored on your device when you visit a website. 
                      They are widely used to make websites work more efficiently and provide information 
                      to the website owners.
                    </p>
                    
                    <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-orange-400 mb-3">How Cookies Work</h3>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="text-orange-400 font-bold">1</span>
                          </div>
                          <p className="text-richblack-200">Website sends cookie to your browser</p>
                        </div>
                        <div className="text-center">
                          <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="text-orange-400 font-bold">2</span>
                          </div>
                          <p className="text-richblack-200">Browser stores the cookie on your device</p>
                        </div>
                        <div className="text-center">
                          <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="text-orange-400 font-bold">3</span>
                          </div>
                          <p className="text-richblack-200">Cookie is sent back with future requests</p>
                        </div>
                      </div>
                    </div>
                    
                    <p>
                      At Edvora, we use cookies to enhance your learning experience, remember your 
                      preferences, and understand how you interact with our platform.
                    </p>
                  </div>
                </motion.section>
              )}

              {/* Types of Cookies Section */}
              {activeSection === 'types-of-cookies' && (
                <motion.section variants={itemVariants}>
                  <h2 className="text-3xl font-bold text-richblack-50 mb-6 flex items-center gap-3">
                    <FiSettings className="text-blue-400" />
                    Types of Cookies We Use
                  </h2>
                  <div className="space-y-6">
                    <div className="grid gap-6">
                      {cookieTypes.map((cookie) => {
                        const Icon = cookie.icon;
                        return (
                          <div key={cookie.type} className={`bg-${cookie.color}-500/10 border border-${cookie.color}-500/20 rounded-xl p-6`}>
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <Icon className={`text-2xl text-${cookie.color}-400`} />
                                <h3 className={`text-xl font-semibold text-${cookie.color}-400`}>
                                  {cookie.title}
                                </h3>
                              </div>
                              {cookie.required && (
                                <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full">
                                  Required
                                </span>
                              )}
                            </div>
                            <p className="text-richblack-200 mb-4">
                              {cookie.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-richblack-400 text-sm">
                                {cookie.required ? 'Always active' : 'Optional'}
                              </span>
                              {!cookie.required && (
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={cookiePreferences[cookie.type]}
                                    onChange={() => handleCookieToggle(cookie.type)}
                                    className="sr-only peer"
                                  />
                                  <div className="w-11 h-6 bg-richblack-600 peer-focus:ring-4 peer-focus:ring-blue-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                                </label>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.section>
              )}

              {/* How We Use Cookies Section */}
              {activeSection === 'how-we-use' && (
                <motion.section variants={itemVariants}>
                  <h2 className="text-3xl font-bold text-richblack-50 mb-6 flex items-center gap-3">
                    <FiEye className="text-purple-400" />
                    How We Use Cookies
                  </h2>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-purple-400 mb-3">Learning Experience</h3>
                        <ul className="text-richblack-200 space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <FiCheckCircle className="text-green-400" />
                            Remember your course progress
                          </li>
                          <li className="flex items-center gap-2">
                            <FiCheckCircle className="text-green-400" />
                            Save your quiz scores
                          </li>
                          <li className="flex items-center gap-2">
                            <FiCheckCircle className="text-green-400" />
                            Track completed lessons
                          </li>
                          <li className="flex items-center gap-2">
                            <FiCheckCircle className="text-green-400" />
                            Remember language preferences
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-blue-400 mb-3">Platform Improvement</h3>
                        <ul className="text-richblack-200 space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <FiCheckCircle className="text-green-400" />
                            Analyze user behavior
                          </li>
                          <li className="flex items-center gap-2">
                            <FiCheckCircle className="text-green-400" />
                            Identify popular courses
                          </li>
                          <li className="flex items-center gap-2">
                            <FiCheckCircle className="text-green-400" />
                            Improve platform performance
                          </li>
                          <li className="flex items-center gap-2">
                            <FiCheckCircle className="text-green-400" />
                            Fix technical issues
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.section>
              )}

              {/* Managing Cookies Section */}
              {activeSection === 'managing-cookies' && (
                <motion.section variants={itemVariants}>
                  <h2 className="text-3xl font-bold text-richblack-50 mb-6 flex items-center gap-3">
                    <FiUser className="text-green-400" />
                    Managing Your Cookie Preferences
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-green-400 mb-4">Cookie Settings</h3>
                      <p className="text-richblack-200 mb-6">
                        Choose which types of cookies you want to allow. You can change these settings 
                        at any time through our cookie preference center.
                      </p>
                      
                      <div className="space-y-4 mb-6">
                        {cookieTypes.map((cookie) => {
                          const Icon = cookie.icon;
                          return (
                            <div key={cookie.type} className="flex items-center justify-between p-4 bg-richblack-700/50 rounded-lg">
                              <div className="flex items-center gap-3">
                                <Icon className={`text-${cookie.color}-400 text-xl`} />
                                <div>
                                  <h4 className="font-semibold text-richblack-50">{cookie.title}</h4>
                                  <p className="text-richblack-300 text-sm">{cookie.description}</p>
                                </div>
                              </div>
                              {cookie.required ? (
                                <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full">
                                  Always On
                                </span>
                              ) : (
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={cookiePreferences[cookie.type]}
                                    onChange={() => handleCookieToggle(cookie.type)}
                                    className="sr-only peer"
                                  />
                                  <div className="w-11 h-6 bg-richblack-600 peer-focus:ring-4 peer-focus:ring-blue-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                                </label>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3 justify-end">
                        <button
                          onClick={rejectAll}
                          className="px-6 py-3 bg-richblack-600 text-richblack-200 rounded-xl hover:bg-richblack-500 transition-all duration-300 font-semibold"
                        >
                          Reject All
                        </button>
                        <button
                          onClick={acceptAll}
                          className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 font-semibold"
                        >
                          Accept All
                        </button>
                        <button
                          onClick={savePreferences}
                          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 font-semibold"
                        >
                          Save Preferences
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-blue-400 mb-3">Browser Settings</h3>
                        <p className="text-richblack-200 text-sm mb-3">
                          You can also manage cookies through your browser settings:
                        </p>
                        <ul className="text-richblack-200 space-y-2 text-sm">
                          <li>• Chrome: Settings → Privacy and security → Cookies</li>
                          <li>• Firefox: Options → Privacy & Security → Cookies</li>
                          <li>• Safari: Preferences → Privacy → Cookies</li>
                          <li>• Edge: Settings → Privacy, search, and services → Cookies</li>
                        </ul>
                      </div>
                      
                      <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-purple-400 mb-3">Important Note</h3>
                        <p className="text-richblack-200 text-sm">
                          Disabling certain cookies may affect your learning experience. Necessary 
                          cookies are required for the platform to function properly and cannot be disabled.
                        </p>
                      </div>
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
                  <p className="text-richblack-400 text-sm">
                    Need help with your cookie settings?
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setActiveSection('managing-cookies')}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 font-semibold shadow-lg shadow-orange-500/25"
                    >
                      <FiSettings />
                      Manage Cookies
                    </button>
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

export default CookiePolicy;