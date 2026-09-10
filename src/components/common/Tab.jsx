// export default function Tab({ tabData, field, setField }) {
//     return (
//       <div
//         style={{
//           boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//         }}
//         className="flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max"
//       >
//         {tabData.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setField(tab.type)}
//             className={`${
//               field === tab.type
//                 ? "bg-richblack-900 text-richblack-5"
//                 : "bg-transparent text-richblack-200"
//             } py-2 px-5 rounded-full transition-all duration-200`}
//           >
//             {tab?.tabName}
//           </button>
//         ))}
//       </div>
//     );
//   }

export default function Tab({ tabData, field, setField }) {
  return (
    <div
      style={{
        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
      }}
      className="flex bg-richblack-800 p-1.5 gap-x-1 my-8 rounded-2xl max-w-max border border-richblack-600 backdrop-blur-sm"
    >
      {tabData.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setField(tab.type)}
          className={`
            relative
            py-3 px-6 
            rounded-xl
            font-medium
            text-sm
            transition-all
            duration-300
            ease-out
            transform
            hover:scale-105
            active:scale-95
            focus:outline-none
            focus:ring-2
            focus:ring-yellow-50
            focus:ring-opacity-50
            group
            ${
              field === tab.type
                ? "bg-gradient-to-r from-yellow-50 to-yellow-100 text-richblack-900 shadow-lg shadow-yellow-50/25 font-semibold"
                : "bg-transparent text-richblack-300 hover:text-richblack-50 hover:bg-richblack-700"
            }
          `}
        >
          {/* Active state indicator */}
          {field === tab.type && (
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-50 to-yellow-100 opacity-10"></div>
          )}
          
          {/* Ripple effect background */}
          <span className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-300"></span>
          
          {/* Tab content */}
          <span className="relative z-10 flex items-center gap-2">
            {tab?.icon && (
              <span className={`
                transition-transform duration-300
                ${field === tab.type ? 'scale-110' : 'group-hover:scale-110'}
              `}>
                {tab.icon}
              </span>
            )}
            {tab?.tabName}
          </span>

          {/* Optional: Bottom border indicator for active tab */}
          {field === tab.type && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-richblack-900 rounded-full opacity-60"></div>
          )}
        </button>
      ))}
    </div>
  );
}