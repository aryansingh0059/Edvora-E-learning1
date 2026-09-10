import { useDispatch, useSelector } from 'react-redux'

import { GiNinjaStar } from 'react-icons/gi'
import React from 'react'
import ReactStars from 'react-rating-stars-component'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { removeFromCart } from '../../../../slices/cartSlice'

const RenderCartCourses = () => {
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  return (
    <div className="space-y-4">
      {cart.map((course, index) => (
        <div
          key={course._id}
          className="flex flex-col sm:flex-row items-start gap-6 rounded-2xl border border-richblack-700 bg-richblack-800/50 p-6 transition-all duration-300 hover:border-richblack-500 hover:bg-richblack-700/30"
        >
          {/* Course Image */}
          <img
            src={course.thumbnail}
            alt={course.courseName}
            className="w-full sm:w-48 h-32 rounded-xl object-cover shadow-lg"
          />

          {/* Course Details */}
          <div className="flex-1 space-y-3">
            <div>
              <h2 className="text-xl font-semibold text-richblack-5">
                {course?.courseName}
              </h2>
              <p className="text-sm text-richblack-300">
                {course?.category?.name}
              </p>
            </div>

            {/* Ratings */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-yellow-100 font-medium">4.8</span>
              <ReactStars
                count={5}
                size={20}
                value={4.8}
                edit={false}
                activeColor="#ffd700"
                emptyIcon={<GiNinjaStar />}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<GiNinjaStar />}
              />
              <span className="text-richblack-400 text-sm">
                {course?.ratingAndReviews?.length || 0} Ratings
              </span>
            </div>
          </div>

          {/* Price and Actions */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4 w-full sm:w-auto">
            <p className="text-2xl font-bold text-yellow-50">
              Rs {course?.price}
            </p>
            <button
              onClick={() => dispatch(removeFromCart(course._id))}
              className="flex items-center gap-2 px-4 py-2 text-richblack-300 hover:text-pink-400 hover:bg-pink-400/10 rounded-lg transition-all duration-300 group"
            >
              <RiDeleteBin6Line className="text-lg group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Remove</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RenderCartCourses