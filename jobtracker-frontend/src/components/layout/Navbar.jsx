import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, LogOut, Menu } from "lucide-react";
import Button from "../ui/Button";
import logo from "../../assets/logo.png";

const Navbar = ({ onMenuToggle }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-[#507DBC]/10 shadow-sm px-4 sm:px-6 py-3 flex justify-between items-center sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-lg text-[#507DBC] hover:bg-[#507DBC]/10 transition-colors lg:hidden"
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-9 h-9 object-contain rounded-2xl" />
          <h1 className="font-bold text-[#2E282A] text-lg tracking-tight hidden sm:block">
            Loom
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={() => navigate("/profile")} variant="ghost" size="sm" className="text-[#507DBC]">
          <User size={16} />
          <span className="hidden sm:inline">Profile</span>
        </Button>

        <Button onClick={handleLogout} variant="danger" size="sm">
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
};

export default Navbar;