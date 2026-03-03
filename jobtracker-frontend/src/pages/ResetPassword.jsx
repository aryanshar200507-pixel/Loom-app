import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Lock, Save } from "lucide-react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { authApi } from "../api/authApi";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!password) return toast.error("Enter password");
    setLoading(true);
    try {
      await authApi.reset(token, password);
      toast.success("Password updated!");
      navigate("/login");
    } catch {
      toast.error("Invalid or expired token");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2E282A] p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border border-[#507DBC]/10">
        <h2 className="text-xl font-bold text-[#2E282A] mb-1">Reset Password</h2>
        <p className="text-sm text-[#2E282A]/50 mb-6">Enter your new password below</p>

        <Input label="New Password" type="password" icon={Lock}
          value={password} onChange={(e) => setPassword(e.target.value)} />

        <Button className="mt-4 w-full" variant="default" onClick={submit} disabled={loading}>
          <Save size={16} />
          {loading ? "Updating..." : "Update Password"}
        </Button>
      </div>
    </div>
  );
}