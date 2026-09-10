export default function IconBtn({
  text,
  onclick,
  children,
  disabled = false,
  outline = false,
  customClasses = "",
  type = "button",
  loading = false,
  size = "medium", // "small" | "medium" | "large"
}) {
  // Size configurations
  const sizeClasses = {
    small: "py-2 px-4 text-sm gap-2",
    medium: "py-3 px-6 text-base gap-3",
    large: "py-4 px-8 text-lg gap-4"
  };

  // Base styles
  const baseClasses = `
    inline-flex
    items-center
    justify-center
    rounded-lg
    font-medium
    transition-all
    duration-200
    ease-out
    focus:outline-none
    focus:ring-2
    focus:ring-offset-2
    disabled:opacity-60
    disabled:cursor-not-allowed
    disabled:pointer-events-none
    group
    ${sizeClasses[size]}
  `;

  // Variant styles
  const variantClasses = outline
    ? `
        border
        border-blue-600
        bg-transparent
        text-blue-600
        hover:bg-blue-600
        hover:text-white
        focus:ring-blue-500
        active:bg-blue-700
        active:border-blue-700
      `
    : `
        bg-blue-600
        text-white
        hover:bg-blue-700
        focus:ring-blue-500
        active:bg-blue-800
        shadow-sm
        hover:shadow-md
      `;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onclick}
      className={`
        ${baseClasses}
        ${variantClasses}
        ${customClasses}
      `}
    >
      {/* Loading State */}
      {(loading) && (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </>
      )}

      {/* Normal State */}
      {!(loading) && (
        <>
          {children && (
            <span className={`
              transition-transform duration-200
              ${text ? 'group-hover:scale-110' : ''}
              flex items-center justify-center
            `}>
              {children}
            </span>
          )}
          
          {text && (
            <span className="whitespace-nowrap">
              {text}
            </span>
          )}
        </>
      )}
    </button>
  );
}

// Alternative: More versatile version with multiple variants
export function Button({
  text,
  onclick,
  children,
  disabled = false,
  variant = "primary", // "primary" | "secondary" | "outline" | "ghost"
  size = "medium",
  customClasses = "",
  type = "button",
  loading = false,
  fullWidth = false,
}) {
  const sizeClasses = {
    small: "py-2 px-4 text-sm",
    medium: "py-3 px-6 text-base",
    large: "py-4 px-8 text-lg"
  };

  const variantClasses = {
    primary: `
      bg-blue-600 text-white 
      hover:bg-blue-700 
      focus:ring-blue-500
      shadow-sm hover:shadow-md
    `,
    secondary: `
      bg-gray-600 text-white 
      hover:bg-gray-700 
      focus:ring-gray-500
      shadow-sm hover:shadow-md
    `,
    outline: `
      border border-blue-600 text-blue-600 bg-transparent
      hover:bg-blue-600 hover:text-white
      focus:ring-blue-500
    `,
    ghost: `
      text-blue-600 bg-transparent
      hover:bg-blue-50
      focus:ring-blue-500
    `
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onclick}
      className={`
        inline-flex items-center justify-center gap-3
        rounded-lg font-medium
        transition-all duration-200 ease-out
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-60 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${customClasses}
      `}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      
      {children && !loading && (
        <span className="flex items-center justify-center">
          {children}
        </span>
      )}
      
      {text && (
        <span className="whitespace-nowrap">
          {loading ? 'Loading...' : text}
        </span>
      )}
    </button>
  );
}