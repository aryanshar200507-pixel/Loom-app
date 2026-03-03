import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { authApi } from "../api/authApi";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import toast from "react-hot-toast";
import logo from "../assets/logo.png";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authApi.login(form);
      login(res.data);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch {
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2E282A] p-4">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full bg-[#507DBC]/10 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 rounded-full bg-[#DBFE87]/5 blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-[#ffff] p-3 rounded-2xl shadow-lg mb-3 ring-4 ring-[#DBFE87]/20">
            <img src={logo} alt="Logo" className="w-8 h-8 object-cover" />
          </div>
          <h1 className="text-2xl font-bold text-white">Loom</h1>
          <p className="text-white/40 text-sm mt-1">Sign in to your account</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl border border-[#507DBC]/10 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Email" type="email" placeholder="you@example.com" icon={Mail}
              value={form.email} onChange={set("email")} required />
            <Input label="Password" type="password" placeholder="••••••••" icon={Lock}
              value={form.password} onChange={set("password")} required />

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-xs text-[#507DBC] font-medium hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" variant="default" className="w-full mt-1" disabled={loading}>
              <LogIn size={16} />
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="text-center mt-5 text-sm text-[#2E282A]/50">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#507DBC] font-semibold hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;