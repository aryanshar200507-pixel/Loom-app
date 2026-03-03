const Button = ({ children, className = "", variant = "default", size = "md", ...props }) => {
  const base = "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    default: "bg-[#507DBC] text-white hover:bg-[#3d6494] focus:ring-[#507DBC] shadow-sm",
    danger:  "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400 shadow-sm",
    warning: "bg-[#EDB88B] text-[#2E282A] hover:bg-[#e0a070] focus:ring-[#EDB88B] shadow-sm",
    ghost:   "bg-transparent text-[#507DBC] hover:bg-[#507DBC]/10 focus:ring-[#507DBC]/30",
    outline: "border border-[#507DBC]/30 text-[#507DBC] hover:bg-[#507DBC]/5 focus:ring-[#507DBC]/30 bg-white",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
  };

  return (
    <button
      className={`${base} ${variants[variant] || ""} ${sizes[size] || ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;