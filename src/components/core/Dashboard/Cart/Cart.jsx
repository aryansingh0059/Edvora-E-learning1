import React from 'react'
import RenderCartCourses from './RenderCartCourses'
import RenderTotalAmount from './RenderTotalAmount'
import { useSelector } from 'react-redux'

const Cart = () => {
  const { total, totalItems } = useSelector((state) => state.cart)

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-richblack-5">Your Cart</h1>
        <p className="text-lg text-richblack-200">
          {totalItems} {totalItems === 1 ? 'Course' : 'Courses'} in Cart
        </p>
      </div>

      {total > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Courses */}
          <div className="flex-1">
            <RenderCartCourses />
          </div>
          
          {/* Total Amount Section */}
          <div className="lg:w-96">
            <RenderTotalAmount />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[400px] rounded-2xl border border-richblack-700 bg-richblack-800/50 text-center">
          <div className="w-20 h-20 bg-richblack-700 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl text-richblack-400">🛒</span>
          </div>
          <h3 className="text-xl font-semibold text-richblack-200 mb-2">
            Your Cart is Empty
          </h3>
          <p className="text-richblack-400 max-w-md">
            Explore our courses and add some to your cart to get started with your learning journey.
          </p>
        </div>
      )}
    </div>
  )
}

export default Cart