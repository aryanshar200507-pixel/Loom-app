const Card = ({ children, className = "", hover = false }) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-[#507DBC]/10 p-5
        ${hover ? "hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer" : ""}
        ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;