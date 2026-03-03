// ForgotPassword.jsx
import { useState } from "react";
import { Mail, Send } from "lucide-react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { authApi } from "../api/authApi";
import toast from "react-hot-toast";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!email) return toast.error("Enter your email");
    setLoading(true);
    try {
      await authApi.forgot(email);
      toast.success("Reset link generated (check backend console)");
      setEmail("");
    } catch {
      toast.error("User not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2E282A] p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border border-[#507DBC]/10">
        <h2 className="text-xl font-bold text-[#2E282A] mb-1">Forgot Password</h2>
        <p className="text-sm text-[#2E282A]/50 mb-6">Enter your email to receive a reset link</p>

        <Input label="Email" icon={Mail} value={email} onChange={(e) => setEmail(e.target.value)} />

        <Button className="mt-4 w-full" variant="default" onClick={submit} disabled={loading}>
          <Send size={16} />
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
      </div>
    </div>
  );
}

export default ForgotPassword;