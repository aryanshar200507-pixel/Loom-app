import { X } from "lucide-react";
import { useEffect } from "react";

const Modal = ({ children, onClose, title = "", size = "md" }) => {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const sizes = { sm: "max-w-sm", md: "max-w-md", lg: "max-w-lg", xl: "max-w-2xl" };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#2E282A]/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={`bg-white rounded-2xl shadow-2xl w-full ${sizes[size]} relative animate-[fadeInUp_0.2s_ease-out]`}>
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#507DBC]/10 bg-[#2E282A] rounded-t-2xl">
            <h2 className="text-lg font-semibold text-[#DBFE87]">{title}</h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {!title && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1.5 rounded-lg text-[#507DBC]/50 hover:text-[#2E282A] hover:bg-[#507DBC]/10 transition-colors z-10"
          >
            <X size={18} />
          </button>
        )}

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;