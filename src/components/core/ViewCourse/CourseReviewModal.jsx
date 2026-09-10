import IconBtn from "../../common/IconBtn"
import ReactStars from "react-rating-stars-component"
import { RxCross2 } from "react-icons/rx"
import { createRating } from "../../../services/operations/courseDetailsAPI"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"

export default function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { courseEntireData } = useSelector((state) => state.viewCourse)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    setValue("courseExperience", "")
    setValue("courseRating", 0)
    // Prevent background scroll when modal is open
    document.body.style.overflow = 'hidden'
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [setValue])

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating)
  }

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    )
    setReviewModal(false)
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setReviewModal(false)
    }
  }

  return (
    <div 
      className="fixed inset-0 z-[9999] grid h-screen w-screen place-items-center overflow-auto bg-richblack-900/90 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="my-10 w-11/12 max-w-[700px] rounded-2xl border border-richblack-600 bg-richblack-800 shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-2xl bg-richblack-700 p-6">
          <p className="text-2xl font-bold text-richblack-5">Add Review</p>
          <button 
            onClick={() => setReviewModal(false)}
            className="rounded-full p-2 text-richblack-5 hover:bg-richblack-600 transition-colors duration-200"
          >
            <RxCross2 className="text-2xl" />
          </button>
        </div>
        
        {/* Modal Body */}
        <div className="p-8">
          <div className="flex items-center justify-center gap-4 mb-8">
            <img
              src={user?.image}
              alt={user?.firstName + " profile"}
              className="aspect-square w-14 rounded-full object-cover border-2 border-richblack-600"
            />
            <div>
              <p className="font-semibold text-richblack-5 text-lg">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-richblack-300">Posting Publicly</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Star Rating */}
            <div className="flex flex-col items-center space-y-4">
              <label className="text-lg font-medium text-richblack-5">
                How would you rate this course?
              </label>
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={32}
                activeColor="#ffd700"
                classNames="flex justify-center"
              />
            </div>

            {/* Review Textarea */}
            <div className="space-y-3">
              <label className="text-lg font-medium text-richblack-5" htmlFor="courseExperience">
                Share your experience <sup className="text-pink-200">*</sup>
              </label>
              <textarea
                id="courseExperience"
                placeholder="What did you like about the course? What could be improved? Share your thoughts..."
                {...register("courseExperience", { required: true })}
                className="w-full min-h-[150px] rounded-lg bg-richblack-700 border border-richblack-600 px-4 py-3 text-richblack-5 placeholder-richblack-400 focus:outline-none focus:border-yellow-500 transition-colors duration-300 resize-none"
              />
              {errors.courseExperience && (
                <span className="text-sm text-pink-200">
                  Please share your experience
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => setReviewModal(false)}
                className="flex items-center gap-2 rounded-lg bg-richblack-600 px-6 py-3 font-semibold text-richblack-5 hover:bg-richblack-500 transition-all duration-300"
              >
                Cancel
              </button>
              <IconBtn 
                text="Submit Review" 
                type="submit"
                customClasses="px-6 py-3 bg-yellow-50 text-richblack-900 hover:bg-yellow-200 transition-all duration-300"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}