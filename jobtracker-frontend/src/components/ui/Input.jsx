const Input = ({ className = "", label, icon: Icon, error, ...props }) => {
  return (
    <div className="w-full space-y-1">
      {label && (
        <label className="block text-sm font-medium text-[#2E282A]">{label}</label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#507DBC]/60">
            <Icon size={16} />
          </div>
        )}
        <input
          className={`w-full border border-[#507DBC]/20 rounded-lg py-2.5 px-4 text-sm text-[#2E282A]
            placeholder-[#2E282A]/30 bg-[#507DBC]/5 focus:bg-white
            focus:outline-none focus:ring-2 focus:ring-[#507DBC] focus:border-transparent
            transition-all duration-200
            ${Icon ? "pl-9" : ""}
            ${error ? "border-red-400 focus:ring-red-400" : ""}
            ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default Input;