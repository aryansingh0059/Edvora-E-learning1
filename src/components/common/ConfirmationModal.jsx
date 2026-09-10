import IconBtn from "./IconBtn"

export default function ConfirmationModal({ modalData }) {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-richblack-900 bg-opacity-60 backdrop-blur-md transition-opacity duration-300">
      <div className="w-11/12 max-w-[400px] rounded-2xl border border-richblack-600 bg-gradient-to-br from-richblack-800 to-richblack-900 p-8 shadow-2xl transform transition-all duration-300 scale-95 animate-in fade-in-90 zoom-in-90">
        
        {/* Modal Header */}
        <div className="text-center mb-2">
          {/* Optional: Add an icon here */}
          {/* <div className="mx-auto w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-richblack-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div> */}
          
          <p className="text-2xl font-bold text-richblack-5 bg-gradient-to-r from-white to-richblack-100 bg-clip-text text-transparent">
            {modalData?.text1}
          </p>
        </div>

        {/* Modal Body */}
        <div className="text-center mb-8">
          <p className="text-lg leading-7 text-richblack-100 font-medium">
            {modalData?.text2}
          </p>
        </div>

        {/* Modal Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            className="cursor-pointer rounded-xl bg-richblack-600 hover:bg-richblack-500 border border-richblack-500 py-3 px-6 font-semibold text-richblack-5 transition-all duration-200 hover:scale-105 hover:shadow-lg flex-1 text-center min-w-[120px]"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
          
          <IconBtn
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
            customClasses="flex-1 min-w-[120px] justify-center hover:scale-105 transition-transform duration-200"
          />
        </div>

        {/* Optional: Add a decorative element */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-50 to-transparent opacity-20 rounded-t-2xl"></div>
      </div>
    </div>
  )
}