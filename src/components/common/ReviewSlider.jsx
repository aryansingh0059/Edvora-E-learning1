import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../App.css"

import { Autoplay, FreeMode, Pagination } from "swiper"
import { FaQuoteLeft, FaStar } from "react-icons/fa"
import React, { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"

import ReactStars from "react-rating-stars-component"
import { apiConnector } from "../../services/apiConnector"
import { ratingsEndpoints } from "../../services/apis"

function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const truncateWords = 25

  useEffect(() => {
    ; (async () => {
      try {
        setIsLoading(true)
        const { data } = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API)
        if (data?.success) {
          setReviews(data?.data)
        }
      } catch (error) {
        console.error("Error fetching reviews:", error)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  // Design constants for consistency
  const DESIGN_CONFIG = {
    card: {
      height: "420px",
      minHeight: "420px",
      maxHeight: "420px",
    },
  }

  // Skeleton Loader
  const ReviewSkeleton = () => (
    <div
      className="flex flex-col gap-4 bg-gray-800 p-6 rounded-2xl border border-gray-700 animate-pulse"
      style={DESIGN_CONFIG.card}
    >
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-gray-700"></div>
        <div className="flex flex-col gap-2 flex-1">
          <div className="h-4 bg-gray-700 rounded w-24"></div>
          <div className="h-3 bg-gray-700 rounded w-32"></div>
        </div>
      </div>
      <div className="space-y-2 flex-1">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-3 bg-gray-700 rounded w-full"></div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-auto">
        <div className="h-4 bg-gray-700 rounded w-8"></div>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 w-4 bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  )

  // Review Card Component
  const ReviewCard = ({ review }) => (
    <div
      className="
        relative flex flex-col gap-4 bg-gray-800 p-6 rounded-2xl border border-gray-700
        shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out
        hover:border-yellow-400/30 hover:-translate-y-2 hover:scale-[1.02]
        overflow-hidden group
      "
      style={DESIGN_CONFIG.card}
    >
      {/* Glow border effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl bg-gradient-to-br from-yellow-400/20 via-transparent to-yellow-300/10 blur-lg"></div>

      {/* Quote Icon */}
      <div className="relative text-yellow-400 opacity-60 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
        <FaQuoteLeft size={22} />
      </div>

      {/* Review Text */}
      <div className="flex-1 relative z-10 overflow-hidden">
        <p className="text-gray-100 font-medium leading-6 text-sm italic line-clamp-5 group-hover:line-clamp-none overflow-y-auto max-h-32 custom-scrollbar">
          {review?.review
            ? review.review.split(" ").length > truncateWords
              ? `${review.review.split(" ").slice(0, truncateWords).join(" ")}...`
              : review.review
            : "No review provided."}
        </p>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-700">
        <img
          src={
            review?.user?.image
              ? review?.user?.image
              : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
          }
          alt="user"
          className="h-12 w-12 rounded-full object-cover border-2 border-yellow-400 shadow-md group-hover:border-yellow-300 transition-colors duration-300"
        />
        <div className="flex flex-col flex-1">
          <h1 className="font-semibold text-white text-base truncate">
            {`${review?.user?.firstName || ""} ${review?.user?.lastName || ""}`.trim() ||
              "Anonymous User"}
          </h1>
          <h2 className="text-sm font-medium text-gray-400 truncate mt-1">
            {review?.course?.courseName || "Unknown Course"}
          </h2>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2 bg-gray-700 px-3 py-1.5 rounded-full">
          <span className="font-bold text-yellow-400 text-sm">
            {review?.rating ? review.rating.toFixed(1) : "0.0"}
          </span>
          <FaStar className="text-yellow-400 text-xs" />
        </div>
        <ReactStars
          count={5}
          value={review?.rating || 0}
          size={16}
          edit={false}
          activeColor="#fbbf24"
          emptyIcon={<FaStar />}
          fullIcon={<FaStar />}
        />
      </div>
    </div>
  )

  return (
    <div className="w-full py-20 bg-gradient-to-b from-gray-900 via-gray-950 to-black relative overflow-hidden">
      {/* Decorative glowing circles */}
      <div className="absolute top-10 -left-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 via-orange-300 to-yellow-500 bg-clip-text text-transparent animate-gradient">
            Voices of Success
          </h2>
          <p className="text-gray-300 text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
            Hear from our learners who turned passion into profession through our transformative courses.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <ReviewSkeleton key={i} />
            ))}
          </div>
        ) : reviews.length > 0 ? (
          <Swiper
            loop={true}
            freeMode={true}
            spaceBetween={30}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            modules={[FreeMode, Pagination, Autoplay]}
            className="w-full"
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {reviews.map((review, i) => (
              <SwiperSlide
                key={i}
                className={`opacity-0 animate-fadeInUp animation-delay-[${i * 100}ms]`}
              >
                <ReviewCard review={review} />
              </SwiperSlide>

            ))}
          </Swiper>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700">
              <FaStar className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No Reviews Yet
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Be the first to share your learning experience with our community.
            </p>
          </div>
        )}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientShift 6s ease infinite;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease forwards;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #fbbf24;
          border-radius: 10px;
        }
      `}</style>
    </div>
  )
}

export default ReviewSlider
