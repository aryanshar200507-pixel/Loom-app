import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, UserPlus } from "lucide-react";
import { authApi } from "../api/authApi";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import toast from "react-hot-toast";
import logo from "../assets/logo.png";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authApi.register(form);
      toast.success("Registered successfully!");
      navigate("/login");
    } catch {
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2E282A] p-4">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full bg-[#507DBC]/10 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 rounded-full bg-[#DBFE87]/5 blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-[#ffff] p-3 rounded-2xl shadow-lg mb-3 ring-4 ring-[#DBFE87]/20">
            <img src={logo} alt="Logo" className="w-8 h-8 object-cover" />
          </div>
          <h1 className="text-2xl font-bold text-white">Loom</h1>
          <p className="text-white/40 text-sm mt-1">Create your account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl border border-[#507DBC]/10 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full Name" placeholder="John Doe" icon={User}
              value={form.name} onChange={set("name")} required />
            <Input label="Email" type="email" placeholder="you@example.com" icon={Mail}
              value={form.email} onChange={set("email")} required />
            <Input label="Password" type="password" placeholder="Min. 8 characters" icon={Lock}
              value={form.password} onChange={set("password")} required />

            <Button type="submit" variant="default" className="w-full mt-2" disabled={loading}>
              <UserPlus size={16} />
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <p className="text-center mt-5 text-sm text-[#2E282A]/50">
            Already have an account?{" "}
            <Link to="/login" className="text-[#507DBC] font-semibold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
