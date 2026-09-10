import { FiAlertCircle, FiArrowRight, FiCheckCircle, FiClock, FiFacebook, FiInstagram, FiLinkedin, FiMail, FiMapPin, FiMessageSquare, FiPhone, FiSend, FiStar, FiTwitter, FiUser, FiYoutube } from "react-icons/fi"
import React, { useEffect, useState } from "react"

import CountryCode from "../data/countrycode.json"
import Footer from "../components/common/Footer"
import { useForm } from "react-hook-form"

// Sample country codes (would be imported from your file)

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  const submitContactForm = async (data) => {
    try {
      setLoading(true)
      setSubmitStatus(null)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setLoading(false)
      setSubmitStatus('success')
      setTimeout(() => setSubmitStatus(null), 5000)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
      setLoading(false)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus(null), 5000)
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
        countrycode: "+91"
      })
    }
  }, [reset, isSubmitSuccessful])

  return (
    <div className="relative">
      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-green-900/40 to-green-800/30 border border-green-600/50 flex items-center gap-3 backdrop-blur-sm animate-fadeIn">
          <div className="p-2 bg-green-500/20 rounded-full">
            <FiCheckCircle className="text-green-400 text-xl flex-shrink-0" />
          </div>
          <div>
            <p className="text-green-200 font-medium">Message sent successfully!</p>
            <p className="text-green-300 text-sm">We'll get back to you within 24 hours.</p>
          </div>
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-pink-900/40 to-pink-800/30 border border-pink-600/50 flex items-center gap-3 backdrop-blur-sm animate-fadeIn">
          <div className="p-2 bg-pink-500/20 rounded-full">
            <FiAlertCircle className="text-pink-400 text-xl flex-shrink-0" />
          </div>
          <div>
            <p className="text-pink-200 font-medium">Something went wrong</p>
            <p className="text-pink-300 text-sm">Please try again later or contact us directly.</p>
          </div>
        </div>
      )}

      <form
        className="flex flex-col gap-6"
        onSubmit={handleSubmit(submitContactForm)}
      >
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%] relative">
            <label htmlFor="firstname" className="text-richblack-5 text-sm font-medium mb-1 flex items-center gap-1">
              First Name <span className="text-pink-400">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FiUser className="text-richblack-400 text-lg" />
              </div>
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="Enter first name"
                className={`w-full py-3.5 pl-10 pr-4 rounded-xl bg-richblack-700 border 
                  ${errors.firstname ? 'border-pink-500' : 'border-richblack-600 focus:border-yellow-500'} 
                  text-richblack-5 placeholder-richblack-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-yellow-500/30`}
                {...register("firstname", { 
                  required: "First name is required",
                  minLength: { value: 2, message: "First name must be at least 2 characters" }
                })}
              />
            </div>
            {errors.firstname && (
              <span className="text-sm text-pink-300 mt-1 flex items-center gap-1 animate-fadeIn">
                <FiAlertCircle className="text-sm" />
                {errors.firstname.message}
              </span>
            )}
          </div>
          
          <div className="flex flex-col gap-2 lg:w-[48%] relative">
            <label htmlFor="lastname" className="text-richblack-5 text-sm font-medium mb-1">
              Last Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FiUser className="text-richblack-400 text-lg" />
              </div>
              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Enter last name"
                className="w-full py-3.5 pl-10 pr-4 rounded-xl bg-richblack-700 border border-richblack-600 
                  focus:border-yellow-500 text-richblack-5 placeholder-richblack-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-yellow-500/30"
                {...register("lastname", {
                  minLength: { value: 2, message: "Last name must be at least 2 characters" }
                })}
              />
            </div>
            {errors.lastname && (
              <span className="text-sm text-pink-300 mt-1 flex items-center gap-1 animate-fadeIn">
                <FiAlertCircle className="text-sm" />
                {errors.lastname.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 relative">
          <label htmlFor="email" className="text-richblack-5 text-sm font-medium mb-1 flex items-center gap-1">
            Email Address <span className="text-pink-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FiMail className="text-richblack-400 text-lg" />
            </div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email address"
              className={`w-full py-3.5 pl-10 pr-4 rounded-xl bg-richblack-700 border 
                ${errors.email ? 'border-pink-500' : 'border-richblack-600 focus:border-yellow-500'} 
                text-richblack-5 placeholder-richblack-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-yellow-500/30`}
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
            />
          </div>
          {errors.email && (
            <span className="text-sm text-pink-300 mt-1 flex items-center gap-1 animate-fadeIn">
              <FiAlertCircle className="text-sm" />
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phonenumber" className="text-richblack-5 text-sm font-medium mb-1">
            Phone Number
          </label>

          <div className="flex gap-4">
            <div className="flex flex-col gap-2 w-28">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
                  <FiPhone className="text-richblack-400 text-lg" />
                </div>
                <select
                  className="w-full py-3.5 pl-10 pr-4 rounded-xl bg-richblack-700 border border-richblack-600 
                    focus:border-yellow-500 text-richblack-5 outline-none appearance-none transition-all duration-200 focus:ring-2 focus:ring-yellow-500/30 relative"
                  {...register("countrycode", { required: true })}
                >
                  {CountryCode.map((ele, i) => (
                    <option key={i} value={ele.code}>
                      {ele.code}
                    </option>
                  ))}
                </select>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-richblack-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 flex-1 relative">
              <input
                type="tel"
                name="phonenumber"
                id="phonenumber"
                placeholder="12345 67890"
                className={`w-full py-3.5 px-4 rounded-xl bg-richblack-700 border 
                  ${errors.phoneNo ? 'border-pink-500' : 'border-richblack-600 focus:border-yellow-500'} 
                  text-richblack-5 placeholder-richblack-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-yellow-500/30`}
                {...register("phoneNo", {
                  pattern: { value: /^[0-9]+$/, message: "Please enter numbers only" },
                  minLength: { value: 5, message: "Phone number must be at least 5 digits" },
                  maxLength: { value: 15, message: "Phone number too long" }
                })}
              />
            </div>
          </div>
          
          {errors.phoneNo && (
            <span className="text-sm text-pink-300 mt-1 flex items-center gap-1 animate-fadeIn">
              <FiAlertCircle className="text-sm" />
              {errors.phoneNo.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2 relative">
          <label htmlFor="message" className="text-richblack-5 text-sm font-medium mb-1 flex items-center gap-1">
            Message <span className="text-pink-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute left-3 top-4 pointer-events-none">
              <FiMessageSquare className="text-richblack-400 text-lg" />
            </div>
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="5"
              placeholder="Tell us how we can help you..."
              className={`w-full py-3 pl-10 pr-4 rounded-xl bg-richblack-700 border 
                ${errors.message ? 'border-pink-500' : 'border-richblack-600 focus:border-yellow-500'} 
                text-richblack-5 placeholder-richblack-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-yellow-500/30 resize-none`}
              {...register("message", { 
                required: "Message is required",
                minLength: { value: 10, message: "Message must be at least 10 characters" },
                maxLength: { value: 500, message: "Message cannot exceed 500 characters" }
              })}
            />
          </div>
          <div className="flex justify-between mt-1">
            {errors.message ? (
              <span className="text-sm text-pink-300 flex items-center gap-1 animate-fadeIn">
                <FiAlertCircle className="text-sm" />
                {errors.message.message}
              </span>
            ) : (
              <span className="text-sm text-richblack-400">Min. 10 characters required</span>
            )}
            <span className="text-sm text-richblack-400" id="message-length">0/500</span>
          </div>
        </div>

        <button
          disabled={loading}
          type="submit"
          className={`w-full py-3.5 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 mt-2
            ${loading 
              ? 'bg-richblack-600 text-richblack-300 cursor-not-allowed' 
              : 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-richblack-900 hover:from-yellow-400 hover:to-yellow-500 hover:shadow-xl active:scale-[0.98] shadow-md hover:shadow-yellow-500/20'
            }`}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-richblack-900 border-t-transparent rounded-full animate-spin"></div>
              Sending Message...
            </>
          ) : (
            <>
              <FiSend className="text-lg" />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  )
}

const ContactUs = () => {
  const [activeFAQ, setActiveFAQ] = useState(0);

  return (
    <div className="min-h-screen bg-richblack-900 text-richblack-5 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-2/3 left-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-richblack-800 to-richblack-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-richblack-900 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeIn">Get in Touch with <span className="text-yellow-400">Edvora</span></h1>
            <p className="text-xl text-richblack-200 mb-10 animate-fadeIn delay-150">
              Have questions about our courses or need guidance? Our team is here to help you with your educational journey.
            </p>
            <div className="flex flex-wrap justify-center gap-6 animate-fadeIn delay-300">
              <div className="flex items-center gap-3 bg-richblack-800/50 backdrop-blur-sm px-4 py-3 rounded-xl border border-richblack-700 hover:border-yellow-500/30 transition-all duration-300">
                <div className="p-2 bg-yellow-500/20 rounded-full">
                  <FiMail className="text-yellow-400 text-xl" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-richblack-300">Email us at</p>
                  <p className="font-medium">support@edvora.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-richblack-800/50 backdrop-blur-sm px-4 py-3 rounded-xl border border-richblack-700 hover:border-yellow-500/30 transition-all duration-300">
                <div className="p-2 bg-yellow-500/20 rounded-full">
                  <FiPhone className="text-yellow-400 text-xl" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-richblack-300">Call us at</p>
                  <p className="font-medium">+1 (555) 123-EDU</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Contact Form */}
            <div className="lg:w-2/3 animate-fadeInUp">
              <div className="bg-richblack-800/70 backdrop-blur-md p-8 rounded-2xl border border-richblack-700 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-16 -right-16 w-40 h-40 bg-yellow-500/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"></div>
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-2">Send us a Message</h2>
                  <p className="text-richblack-200 mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>
                  <ContactUsForm />
                </div>
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="lg:w-1/3 animate-fadeInUp delay-150">
              <div className="bg-richblack-800/70 backdrop-blur-md p-8 rounded-2xl border border-richblack-700 shadow-2xl mb-8 relative overflow-hidden">
                <div className="absolute -top-12 -left-12 w-32 h-32 bg-pink-500/10 rounded-full blur-xl"></div>
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 group">
                      <div className="bg-richblack-700 p-3 rounded-full group-hover:bg-yellow-500/20 transition-colors duration-300">
                        <FiMail className="text-yellow-400 text-xl" />
                      </div>
                      <div>
                        <h3 className="text-richblack-5 font-medium">Email Us</h3>
                        <p className="text-richblack-200">support@edvora.com</p>
                        <p className="text-richblack-200">admissions@edvora.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 group">
                      <div className="bg-richblack-700 p-3 rounded-full group-hover:bg-yellow-500/20 transition-colors duration-300">
                        <FiPhone className="text-yellow-400 text-xl" />
                      </div>
                      <div>
                        <h3 className="text-richblack-5 font-medium">Call Us</h3>
                        <p className="text-richblack-200">+1 (555) 123-4567</p>
                        <p className="text-richblack-200">Mon-Fri, 9am-5pm</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 group">
                      <div className="bg-richblack-700 p-3 rounded-full group-hover:bg-yellow-500/20 transition-colors duration-300">
                        <FiMapPin className="text-yellow-400 text-xl" />
                      </div>
                      <div>
                        <h3 className="text-richblack-5 font-medium">Visit Us</h3>
                        <p className="text-richblack-200">123 Education Street</p>
                        <p className="text-richblack-200">Knowledge City, 10001</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 group">
                      <div className="bg-richblack-700 p-3 rounded-full group-hover:bg-yellow-500/20 transition-colors duration-300">
                        <FiClock className="text-yellow-400 text-xl" />
                      </div>
                      <div>
                        <h3 className="text-richblack-5 font-medium">Response Time</h3>
                        <p className="text-richblack-200">Typically within 24 hours</p>
                        <p className="text-richblack-200">During business days</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Social Media */}
              <div className="bg-richblack-800/70 backdrop-blur-md p-8 rounded-2xl border border-richblack-700 shadow-2xl relative overflow-hidden">
                <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-green-500/10 rounded-full blur-xl"></div>
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-6">Follow Us</h2>
                  <p className="text-richblack-200 mb-6">Stay connected with us on social media for updates, tips, and more.</p>
                  
                  <div className="flex gap-4">
                    {[
                      { icon: <FiTwitter className="text-xl" />, color: "hover:bg-blue-500/20" },
                      { icon: <FiFacebook className="text-xl" />, color: "hover:bg-blue-600/20" },
                      { icon: <FiInstagram className="text-xl" />, color: "hover:bg-pink-500/20" },
                      { icon: <FiLinkedin className="text-xl" />, color: "hover:bg-blue-700/20" },
                      { icon: <FiYoutube className="text-xl" />, color: "hover:bg-red-500/20" }
                    ].map((social, index) => (
                      <button 
                        key={index} 
                        href="#" 
                        className={`bg-richblack-700 p-3 rounded-full transition-all duration-300 ${social.color} hover:scale-110 hover:shadow-lg`}
                      >
                        {social.icon}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-richblack-800/70 backdrop-blur-md relative">
        <div className="absolute inset-0 bg-gradient-to-b from-richblack-800/50 to-richblack-900/50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-richblack-200">Find quick answers to common questions about our courses and services.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                question: "How do I enroll in a course?",
                answer: "You can enroll directly through our website by selecting your desired course and following the enrollment process."
              },
              {
                question: "Do you offer financial aid?",
                answer: "Yes, we offer various financial aid options and scholarships for eligible students."
              },
              {
                question: "Can I access courses offline?",
                answer: "Most courses offer downloadable resources, but full offline access depends on the specific course."
              },
              {
                question: "How long do I have access to a course?",
                answer: "Course access typically lasts for one year, but this may vary by program."
              },
              {
                question: "Are certificates provided upon completion?",
                answer: "Yes, we provide certificates for all completed courses that can be shared on professional networks."
              },
              {
                question: "Do you offer corporate training programs?",
                answer: "Yes, we offer customized corporate training programs for teams and organizations."
              }
            ].map((faq, index) => (
              <div 
                key={index} 
                className={`bg-richblack-700/80 backdrop-blur-sm p-6 rounded-xl border border-richblack-600 hover:border-yellow-500/30 transition-all duration-300 cursor-pointer ${activeFAQ === index ? 'ring-2 ring-yellow-500/30' : ''}`}
                onClick={() => setActiveFAQ(index)}
              >
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  {activeFAQ === index ? (
                    <FiStar className="text-yellow-400" />
                  ) : (
                    <FiArrowRight className="text-richblack-400" />
                  )}
                  {faq.question}
                </h3>
                <p className="text-richblack-200">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-richblack-800 to-richblack-700 border border-richblack-600 rounded-2xl p-10 text-center max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">Ready to start your learning journey?</h2>
              <p className="text-richblack-200 mb-8 max-w-2xl mx-auto">
                Join thousands of students who have transformed their careers with Edvora's expert-led courses.
              </p>
              <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-richblack-900 font-semibold py-3.5 px-8 rounded-xl hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/20 flex items-center gap-2 mx-auto">
                Explore Courses <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div>
        <Footer/>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .delay-150 {
          animation-delay: 0.15s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  )
}

export default ContactUs


