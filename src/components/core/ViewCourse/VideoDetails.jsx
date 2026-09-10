import "video-react/dist/video-react.css"

import { BigPlayButton, Player } from "video-react"
import {
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
  FiPlay
} from "react-icons/fi"
import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import IconBtn from "../../common/IconBtn"
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI"
import { updateCompletedLectures } from "../../../slices/viewCourseSlice"
import { useLocation } from "react-router-dom"

const VideoDetails = () => {
  const { courseId, sectionId, SubsectionId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const playerRef = useRef(null)
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse)

  const [videoData, setVideoData] = useState(null)
  const [previewSource, setPreviewSource] = useState("")
  const [videoEnded, setVideoEnded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isVideoLoading, setIsVideoLoading] = useState(true)

  useEffect(() => {
    const initializeVideoData = async () => {
      if (!courseSectionData.length) return
      
      if (!courseId || !sectionId || !SubsectionId) {
        navigate(`/dashboard/enrolled-courses`)
        return
      }

      try {
        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId
        )
        
        const filteredVideoData = filteredData?.[0]?.Subsection.filter(
          (data) => data._id === SubsectionId
        )
        
        setVideoData(filteredVideoData[0])
        setPreviewSource(courseEntireData.thumbnail)
        setVideoEnded(false)
        setIsVideoLoading(false)
      } catch (error) {
        console.error("Error initializing video data:", error)
        setIsVideoLoading(false)
      }
    }

    initializeVideoData()
  }, [courseSectionData, courseEntireData, location.pathname, courseId, sectionId, SubsectionId, navigate])

  const isFirstVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    const currentSubsectionIndx = courseSectionData[
      currentSectionIndx
    ]?.Subsection.findIndex((data) => data._id === SubsectionId)

    return currentSectionIndx === 0 && currentSubsectionIndx === 0
  }

  const isLastVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    
    if (currentSectionIndx === -1) return false

    const noOfSubsections = courseSectionData[currentSectionIndx].Subsection.length
    const currentSubsectionIndx = courseSectionData[
      currentSectionIndx
    ]?.Subsection.findIndex((data) => data._id === SubsectionId)

    return (
      currentSectionIndx === courseSectionData.length - 1 &&
      currentSubsectionIndx === noOfSubsections - 1
    )
  }

  const goToNextVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubsections = courseSectionData[currentSectionIndx].Subsection.length
    const currentSubsectionIndx = courseSectionData[
      currentSectionIndx
    ]?.Subsection.findIndex((data) => data._id === SubsectionId)

    if (currentSubsectionIndx !== noOfSubsections - 1) {
      const nextSubsectionId = courseSectionData[currentSectionIndx].Subsection[
        currentSubsectionIndx + 1
      ]._id
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubsectionId}`
      )
    } else {
      const nextSectionId = courseSectionData[currentSectionIndx + 1]._id
      const nextSubsectionId = courseSectionData[currentSectionIndx + 1].Subsection[0]._id
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubsectionId}`
      )
    }
  }

  const goToPrevVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const currentSubsectionIndx = courseSectionData[
      currentSectionIndx
    ]?.Subsection.findIndex((data) => data._id === SubsectionId)

    if (currentSubsectionIndx !== 0) {
      const prevSubsectionId = courseSectionData[currentSectionIndx].Subsection[
        currentSubsectionIndx - 1
      ]._id
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubsectionId}`
      )
    } else {
      const prevSectionId = courseSectionData[currentSectionIndx - 1]._id
      const prevSubsectionLength = courseSectionData[currentSectionIndx - 1].Subsection.length
      const prevSubsectionId = courseSectionData[currentSectionIndx - 1].Subsection[
        prevSubsectionLength - 1
      ]._id
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubsectionId}`
      )
    }
  }

  const handleLectureCompletion = async () => {
    setLoading(true)
    try {
      const res = await markLectureAsComplete(
        // { courseID: courseId, SubsectionId: SubsectionId },
        {courseId: courseId, SubsectionId: SubsectionId},
        token
      )
      if (res) {
        dispatch(updateCompletedLectures(SubsectionId))
      }
    } catch (error) {
      console.error("Error marking lecture as complete:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleVideoLoad = () => {
    setIsVideoLoading(false)
  }

  const handleVideoError = () => {
    setIsVideoLoading(false)
    console.error("Error loading video")
  }

  return (
    <div className="flex flex-col gap-6 text-white">
      {/* Video Player Section */}
      <div className="relative rounded-2xl overflow-hidden bg-richblack-900 shadow-2xl">
        {isVideoLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-richblack-800 z-10">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-richblack-500 border-t-yellow-400 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-richblack-200">Loading video...</p>
            </div>
          </div>
        )}

        {!videoData ? (
          <div className="aspect-video flex items-center justify-center bg-richblack-800">
            <img
              src={previewSource}
              alt="Course preview"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <Player
            ref={playerRef}
            aspectRatio="16:9"
            playsInline
            onEnded={() => setVideoEnded(true)}
            onLoad={handleVideoLoad}
            onError={handleVideoError}
            src={videoData?.videoUrl}
            className="video-player"
          >
            <BigPlayButton position="center" />
            
            {/* Video End Overlay */}
            {videoEnded && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-gradient-to-t from-richblack-900 via-richblack-900/80 to-transparent">
                <div className="text-center space-y-6 px-8">
                  {/* Completion Status */}
                  {!completedLectures.includes(SubsectionId) ? (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <FiCheckCircle className="text-2xl text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-richblack-5">
                        Lecture Completed!
                      </h3>
                      <p className="text-richblack-200 max-w-md">
                        Great job! You've completed this lecture. Mark it as completed to track your progress.
                      </p>
                      <IconBtn
                        disabled={loading}
                        onclick={handleLectureCompletion}
                        text={!loading ? "Mark as Completed" : "Saving..."}
                        customClasses="px-8 py-3 text-lg bg-green-600 hover:bg-green-500 text-white"
                      />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <FiCheckCircle className="text-2xl text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-richblack-5">
                        Lecture Already Completed
                      </h3>
                      <p className="text-richblack-200">
                        You've already completed this lecture. Ready to continue?
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <IconBtn
                      disabled={loading}
                      onclick={() => {
                        if (playerRef?.current) {
                          playerRef.current.seek(0)
                          setVideoEnded(false)
                        }
                      }}
                      text="Watch Again"
                      customClasses="px-6 py-3 bg-richblack-600 hover:bg-richblack-500 text-richblack-5"
                    />
                    
                    <div className="flex gap-4">
                      {!isFirstVideo() && (
                        <button
                          disabled={loading}
                          onClick={goToPrevVideo}
                          className="flex items-center gap-2 px-6 py-3 bg-richblack-600 hover:bg-richblack-500 text-richblack-5 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <FiChevronLeft className="text-lg" />
                          Previous
                        </button>
                      )}
                      {!isLastVideo() && (
                        <button
                          disabled={loading}
                          onClick={goToNextVideo}
                          className="flex items-center gap-2 px-6 py-3 bg-yellow-50 hover:bg-yellow-100 text-richblack-900 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next
                          <FiChevronRight className="text-lg" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Player>
        )}
      </div>

      {/* Video Information */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <h1 className="text-3xl font-bold text-richblack-5">
              {videoData?.title || "Loading..."}
            </h1>
            {videoData?.description && (
              <p className="text-lg text-richblack-200 leading-relaxed">
                {videoData.description}
              </p>
            )}
          </div>
          
          {/* Completion Badge */}
          {completedLectures.includes(SubsectionId) && (
            <div className="flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full border border-green-500/30">
              <FiCheckCircle className="text-lg" />
              <span className="font-semibold text-sm">Completed</span>
            </div>
          )}
        </div>

        {/* Progress Navigation */}
        <div className="flex justify-between items-center pt-4 border-t border-richblack-700">
          <div className="flex gap-4">
            {!isFirstVideo() && (
              <button
                onClick={goToPrevVideo}
                className="flex items-center gap-2 px-4 py-2 text-richblack-200 hover:text-richblack-5 transition-colors duration-200"
              >
                <FiChevronLeft />
                <span>Previous Lecture</span>
              </button>
            )}
          </div>
          
          <div className="flex gap-4">
            {!isLastVideo() && (
              <button
                onClick={goToNextVideo}
                className="flex items-center gap-2 px-4 py-2 text-richblack-200 hover:text-richblack-5 transition-colors duration-200"
              >
                <span>Next Lecture</span>
                <FiChevronRight />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoDetails

