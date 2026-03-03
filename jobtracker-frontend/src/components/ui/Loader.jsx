const Loader = ({ size = "md", text = "" }) => {
  const sizes = {
    sm: "h-5 w-5 border-2",
    md: "h-10 w-10 border-2",
    lg: "h-14 w-14 border-[3px]",
  };

  return (
    <div className="flex flex-col justify-center items-center py-12 gap-3">
      <div
        className={`animate-spin rounded-full border-[#507DBC]/20 border-t-[#507DBC] ${sizes[size]}`}
      />
      {text && <p className="text-sm text-[#507DBC]/70 animate-pulse">{text}</p>}
    </div>
  );
};

export default Loader;