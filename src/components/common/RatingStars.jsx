// import React, { useEffect, useState } from "react"
// import {
//   TiStarFullOutline,
//   TiStarHalfOutline,
//   TiStarOutline,
// } from "react-icons/ti"

// function RatingStars({ Review_Count, Star_Size, showRating = false, className = "" }) {
//   const [starCount, SetStarCount] = useState({
//     full: 0,
//     half: 0,
//     empty: 0,
//   })

//   useEffect(() => {
//     const wholeStars = Math.floor(Review_Count) || 0
//     SetStarCount({
//       full: wholeStars,
//       half: Number.isInteger(Review_Count) ? 0 : 1,
//       empty: Number.isInteger(Review_Count) ? 5 - wholeStars : 4 - wholeStars,
//     })
//   }, [Review_Count])

//   return (
//     <div className={`flex items-center gap-2 ${className}`}>
//       {/* Stars Container */}
//       <div className="flex gap-1 relative">
//         {/* Background Stars (for consistent sizing) */}
//         <div className="flex gap-1 text-richblack-400 opacity-40">
//           {[...new Array(5)].map((_, i) => (
//             <TiStarOutline key={`bg-${i}`} size={Star_Size || 20} />
//           ))}
//         </div>
        
//         {/* Foreground Stars */}
//         <div className="flex gap-1 absolute inset-0">
//           {/* Full Stars */}
//           {[...new Array(starCount.full)].map((_, i) => (
//             <div key={`full-${i}`} className="relative group">
//               <TiStarFullOutline 
//                 size={Star_Size || 20} 
//                 className="text-yellow-100 drop-shadow-sm transition-all duration-200 group-hover:scale-110 group-hover:drop-shadow-lg" 
//               />
//               {/* Tooltip on hover */}
//               <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-richblack-800 text-richblack-5 text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
//                 Full Star
//               </div>
//             </div>
//           ))}
          
//           {/* Half Stars */}
//           {[...new Array(starCount.half)].map((_, i) => (
//             <div key={`half-${i}`} className="relative group">
//               <TiStarHalfOutline 
//                 size={Star_Size || 20} 
//                 className="text-yellow-100 drop-shadow-sm transition-all duration-200 group-hover:scale-110 group-hover:drop-shadow-lg" 
//               />
//               {/* Tooltip on hover */}
//               <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-richblack-800 text-richblack-5 text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
//                 Half Star
//               </div>
//             </div>
//           ))}
          
//           {/* Empty Stars */}
//           {[...new Array(starCount.empty)].map((_, i) => (
//             <div key={`empty-${i}`} className="relative group">
//               <TiStarOutline 
//                 size={Star_Size || 20} 
//                 className="text-richblack-400 opacity-60 transition-all duration-200 group-hover:scale-105" 
//               />
//               {/* Tooltip on hover */}
//               <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-richblack-800 text-richblack-5 text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
//                 Empty Star
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Optional Rating Text */}
//       {showRating && (
//         <div className="flex items-center gap-2">
//           <span className="text-richblack-5 font-semibold text-sm">
//             {Review_Count?.toFixed(1) || "0.0"}
//           </span>
//           <span className="text-richblack-400 text-sm">
//             ({Math.floor(Review_Count || 0)} review{Math.floor(Review_Count || 0) !== 1 ? 's' : ''})
//           </span>
//         </div>
//       )}
//     </div>
//   )
// }

// export default RatingStars

import React, { useEffect, useState } from "react"

// Universal rating configuration
const RATING_CONFIG = {
  maxStars: 5,
  precision: 0.5, // 0.5 for half stars, 1 for whole stars only
  sizes: {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28
  },
  variants: {
    primary: "text-yellow-400",
    secondary: "text-blue-400", 
    success: "text-green-400",
    warning: "text-orange-400",
    custom: "" // for custom color classes
  }
}

// Universal Star Icons Component
const StarIcon = ({ type = "empty", size = "md", variant = "primary", className = "" }) => {
  const StarComponent = {
    full: ({ size, className }) => (
      <svg 
        fill="currentColor" 
        viewBox="0 0 20 20" 
        className={className}
        width={RATING_CONFIG.sizes[size]}
        height={RATING_CONFIG.sizes[size]}
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ),
    half: ({ size, className }) => (
      <svg 
        fill="currentColor" 
        viewBox="0 0 20 20" 
        className={className}
        width={RATING_CONFIG.sizes[size]}
        height={RATING_CONFIG.sizes[size]}
      >
        <defs>
          <linearGradient id="half">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path 
          fill="url(#half)" 
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" 
        />
      </svg>
    ),
    empty: ({ size, className }) => (
      <svg 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        className={className}
        width={RATING_CONFIG.sizes[size]}
        height={RATING_CONFIG.sizes[size]}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    )
  }[type]

  return (
    <StarComponent 
      size={size}
      className={`${RATING_CONFIG.variants[variant]} ${className}`}
    />
  )
}

// Universal RatingStars Component
const RatingStars = ({
  // Rating data
  rating = 0,
  maxRating = RATING_CONFIG.maxStars,
  
  // Display options
  showRating = false,
  showCount = false,
  reviewCount = 0,
  precision = RATING_CONFIG.precision,
  
  // Styling
  size = "md",
  variant = "primary",
  className = "",
  starClassName = "",
  
  // Interactive features
  interactive = false,
  onRatingChange,
  disabled = false,
  
  // Accessibility
  ariaLabel = "Product rating",
  ...props
}) => {
  const [currentRating, setCurrentRating] = useState(rating)
  const [hoverRating, setHoverRating] = useState(0)

  // Update when external rating changes
  useEffect(() => {
    setCurrentRating(rating)
  }, [rating])

  // Calculate star distribution
  const calculateStars = (ratingValue) => {
    const fullStars = Math.floor(ratingValue)
    const decimal = ratingValue - fullStars
    const hasHalfStar = decimal >= 0.25 && decimal <= 0.75 && precision === 0.5
    const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0)

    return {
      full: fullStars,
      half: hasHalfStar ? 1 : 0,
      empty: emptyStars
    }
  }

  const starCount = calculateStars(hoverRating || currentRating)

  // Handle star click
  const handleStarClick = (starIndex) => {
    if (!interactive || disabled) return
    
    const newRating = starIndex + 1
    setCurrentRating(newRating)
    onRatingChange?.(newRating)
  }

  // Handle star hover
  const handleStarHover = (starIndex) => {
    if (!interactive || disabled) return
    setHoverRating(starIndex + 1)
  }

  // Handle mouse leave
  const handleMouseLeave = () => {
    if (!interactive || disabled) return
    setHoverRating(0)
  }

  return (
    <div 
      className={`inline-flex items-center gap-2 ${className}`}
      onMouseLeave={handleMouseLeave}
      role={interactive ? "slider" : "img"}
      aria-label={ariaLabel}
      aria-valuenow={currentRating}
      aria-valuemin={0}
      aria-valuemax={maxRating}
      {...props}
    >
      {/* Stars Container */}
      <div className="flex items-center gap-1">
        {[...Array(maxRating)].map((_, index) => {
          let starType = "empty"
          
          if (index < starCount.full) {
            starType = "full"
          } else if (index === starCount.full && starCount.half > 0) {
            starType = "half"
          }

          return (
            <button
              key={index}
              type="button"
              className={`
                transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-current
                ${interactive && !disabled ? 'cursor-pointer hover:scale-110 transform' : 'cursor-default'}
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              onClick={() => handleStarClick(index)}
              onMouseEnter={() => handleStarHover(index)}
              disabled={!interactive || disabled}
              aria-label={`Rate ${index + 1} out of ${maxRating} stars`}
            >
              <StarIcon
                type={starType}
                size={size}
                variant={variant}
                className={`
                  drop-shadow-sm
                  ${interactive && !disabled ? 'hover:drop-shadow-md' : ''}
                  ${starClassName}
                `}
              />
            </button>
          )
        })}
      </div>

      {/* Rating Text */}
      {(showRating || showCount) && (
        <div className="flex items-center gap-2 text-sm">
          {showRating && (
            <span className="font-medium text-gray-900 dark:text-white">
              {currentRating.toFixed(1)}
            </span>
          )}
          {showCount && reviewCount > 0 && (
            <span className="text-gray-500 dark:text-gray-400">
              ({reviewCount.toLocaleString()})
            </span>
          )}
        </div>
      )}
    </div>
  )
}

// Export with configuration
RatingStars.config = RATING_CONFIG

export default RatingStars