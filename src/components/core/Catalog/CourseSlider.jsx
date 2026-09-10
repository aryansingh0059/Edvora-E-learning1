import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/autoplay"

import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper'
import { BsFire, BsShieldCheck } from 'react-icons/bs'
import { FiArrowLeft, FiArrowRight, FiStar } from 'react-icons/fi'
import { Swiper, SwiperSlide } from "swiper/react"

import CourseCard from './CourseCard'
import { IoRibbon } from 'react-icons/io5'
import React from 'react'
import { motion } from 'framer-motion'

const CourseSlider = ({ Courses, title, subtitle }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-richblack-900 via-richblack-800 to-richblack-900"
    >
      
      {/* Header Section */}
      <div className="text-center mb-12 max-w-4xl mx-auto">
        {subtitle && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 mb-3"
          >
            <BsFire className="text-orange-500" />
            <p className="text-sm text-orange-400 font-semibold bg-orange-400/10 px-3 py-1 rounded-full">
              {subtitle}
            </p>
          </motion.div>
        )}
        {title && (
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            {title}
          </motion.h2>
        )}
        
        {/* Trust Stats */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-6"
        >
          <div className="flex items-center gap-2 text-richblack-200 text-sm">
            <FiStar className="text-yellow-400" />
            <span>4.8/5 Rating</span>
          </div>
          <div className="flex items-center gap-2 text-richblack-200 text-sm">
            <BsShieldCheck className="text-green-400" />
            <span>30-Day Guarantee</span>
          </div>
        </motion.div>
      </div>

      {/* Courses Slider */}
      {Courses?.length ? (
        <div className="relative max-w-7xl mx-auto">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Navigation]}
            navigation={{
              nextEl: '.course-swiper-next',
              prevEl: '.course-swiper-prev',
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
          >
            {Courses?.map((course, i) => (
              <SwiperSlide key={i}>
                <div className="h-full pb-4">
                  <CourseCard course={course} Height={"h-[180px]"} index={i} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows */}
          <button className="course-swiper-next absolute right-2 top-1/2 transform -translate-y-1/2 z-10 group p-3 rounded-xl bg-richblack-700 border border-richblack-600 text-richblack-200 hover:text-white hover:border-yellow-500 transition-all duration-200">
            <FiArrowRight className="text-xl" />
          </button>
          <button className="course-swiper-prev absolute left-2 top-1/2 transform -translate-y-1/2 z-10 group p-3 rounded-xl bg-richblack-700 border border-richblack-600 text-richblack-200 hover:text-white hover:border-yellow-500 transition-all duration-200">
            <FiArrowLeft className="text-xl" />
          </button>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16"
        >
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-yellow-500/10 to-orange-500/10 flex items-center justify-center border border-yellow-500/20">
              <BsFire className="text-3xl text-yellow-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Courses Coming Soon!
            </h3>
            <p className="text-richblack-300 mb-6">
              We're preparing amazing courses for you
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default CourseSlider