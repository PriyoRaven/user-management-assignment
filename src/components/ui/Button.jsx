import React from "react";

const Button = ({
  variant = "primary",
  size = "medium",
  loading = false,
  disabled = false,
  children,
  onClick,
  className = "",
  icon,
  iconPosition = "left",
  formAction,
  loadingText = "Loading...",
  pending = false,
}) => {
  const getButtonClasses = () => {
    let classes =
      "inline-flex items-center border justify-center font-medium cursor-pointer rounded-full transition-all ";

    // Size variants
    if (size === "smaller") classes += "px-2 py-1 text-xs ";
    if (size === "small") classes += "px-3 py-1.5 text-sm ";
    if (size === "medium") classes += "px-4 py-2 text-base ";
    if (size === "large") classes += "px-6 py-3 text-sm md:text-lg ";

    // Color variants
    if (variant === "solid") classes += "bg-white text-black hover:bg-white ";
    if (variant === "primary")
      classes +=
        "bg-transparent border-white text-white hover:bg-white hover:text-black ";
    if (variant === "secondary")
      classes +=
        "bg-transparent border-black text-black hover:bg-black hover:text-white ";
    if (variant === "tertiary")
      classes +=
        "bg-transparent border-transparent text-black hover:bg-gray-200 hover:text-white ";
    if (variant === "danger")
      classes += "bg-red-500 text-white hover:bg-red-600 ";
    if (variant === "success")
      classes += "bg-green-500 text-white hover:bg-green-600 ";
    if (variant === "warning")
      classes += "bg-yellow-500 text-white hover:bg-yellow-600 ";
    if (variant === "transparent")
      classes +=
        "bg-black/20 backdrop-blur-md border-none text-white hover:bg-black/30 hover:border-black/50 shadow-md hover:shadow-xl ";

    // Disabled or loading state
    if (disabled || loading || pending)
      classes += "opacity-60 cursor-not-allowed ";

    return classes;
  };

  const isLoading = loading || pending;
  const buttonText = isLoading ? loadingText : children;

  return (
    <button
      className={`${getButtonClasses()} ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      formAction={formAction}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {!isLoading && icon && iconPosition === "left" && (
        <span className="mr-2">{icon}</span>
      )}
      {buttonText}
      {!isLoading && icon && iconPosition === "right" && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
};

export default Button;
