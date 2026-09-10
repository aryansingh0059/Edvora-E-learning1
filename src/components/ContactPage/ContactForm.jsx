// import ContactUsForm from "./ContactUsForm";
// import React from "react";

// const ContactForm = () => {
//   return (
//     <div className="border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col">
//       <h1 className="text-4xl leading-10 font-semibold text-richblack-5">
//         Got a Idea? We&apos;ve got the skills. Let&apos;s team up
//       </h1>
//       <p className="">
//         Tell us more about yourself and what you&apos;re got in mind.
//       </p>

//       <div className="mt-7">
//         <ContactUsForm />
//       </div>
//     </div>
//   );
// };

// export default ContactForm;

import ContactUsForm from "./ContactUsForm";
import React from "react";

const ContactForm = () => {
  return (
    <div className="relative border border-richblack-600 text-richblack-300 rounded-2xl p-8 lg:p-12 flex gap-6 flex-col bg-gradient-to-br from-richblack-800 to-richblack-900 shadow-2xl hover:shadow-3xl transition-all duration-500 group">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-50 to-transparent opacity-20 rounded-t-2xl"></div>
      <div className="absolute -top-1 -right-1 w-24 h-24 bg-yellow-50 rounded-full blur-3xl opacity-5 group-hover:opacity-10 transition-opacity duration-500"></div>
      <div className="absolute -bottom-1 -left-1 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-5 group-hover:opacity-10 transition-opacity duration-500"></div>
      
      {/* Header Section */}
      <div className="text-center lg:text-left space-y-4 relative z-10">
        <div className="inline-flex items-center gap-2 bg-richblack-700/50 px-4 py-2 rounded-full border border-richblack-600 mb-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-xs font-medium text-richblack-200">We're here to help</span>
        </div>
        
        <h1 className="text-4xl lg:text-5xl leading-tight font-bold text-richblack-5">
          Got an Idea?{" "}
          <span className="bg-gradient-to-r from-yellow-50 to-yellow-100 bg-clip-text text-transparent">
            We've got the skills
          </span>
        </h1>
        <p className="text-xl leading-8 text-richblack-200 font-medium max-w-2xl">
          Let's team up and bring your vision to life. Tell us more about yourself and what you've got in mind.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 py-4 relative z-10">
        {[
          { number: "24/7", label: "Support" },
          { number: "2h", label: "Avg Response" },
          { number: "100%", label: "Satisfaction" }
        ].map((stat, index) => (
          <div key={index} className="text-center p-3 rounded-lg bg-richblack-700/30 border border-richblack-600 hover:border-richblack-400 transition-colors duration-300">
            <div className="text-lg font-bold text-yellow-50">{stat.number}</div>
            <div className="text-xs text-richblack-200 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Form Section */}
      <div className="mt-4 relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-0.5 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-full"></div>
          <span className="text-richblack-100 font-semibold text-sm uppercase tracking-wider">
            Start Your Project
          </span>
          <div className="flex-1 h-0.5 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-full opacity-30"></div>
        </div>
        
        <div className="bg-richblack-700/30 rounded-xl p-1 border border-richblack-600 hover:border-richblack-400 transition-all duration-300">
          <ContactUsForm />
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center lg:text-left mt-6 relative z-10">
        <p className="text-sm text-richblack-400 font-medium">
          💡 We'll get back to you within 2 hours during business hours
        </p>
      </div>
    </div>
  );
};

export default ContactForm;