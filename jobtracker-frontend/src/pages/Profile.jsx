import { useEffect, useState, useContext } from "react";
import { User, Mail, Shield, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { userApi } from "../api/userApi";
import { AuthContext } from "../context/AuthContext";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import Modal from "../components/ui/Modal";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const id = user?.userId || user?.id || 1;
      const res = await userApi.get(id);
      setForm({
        name: res.data.name || "",
        email: res.data.email || "",
      });
    } catch (err) {
      toast.error("Failed to load profile");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const save = async () => {
    const id = user?.userId || user?.id;
    if (!id) return;

    setSaving(true);
    try {
      await userApi.update(id, form);
      toast.success("Profile updated!");
    } catch (err) {
      toast.error("Failed to update profile");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const deleteAccount = async () => {
    const id = user?.userId || user?.id;
    if (!id) {
      toast.error("User ID not found");
      return;
    }

    setDeleting(true);
    try {
      await userApi.delete(id);

      toast.success("Account deleted successfully");
      logout();
      navigate("/login");
    } catch (err) {
      toast.error("Failed to delete account");
      console.error(err);
    } finally {
      setDeleting(false);
      setConfirmDelete(false);
    }
  };

  if (loading) return <Loader text="Loading profile..." />;

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Manage your account details
        </p>
      </div>

      {/* Avatar card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-5">
        <div className="bg-indigo-100 text-indigo-600 rounded-full p-4">
          <User size={32} />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">
            {form.name || "Your Name"}
          </h3>
          <p className="text-sm text-gray-500">
            {form.email || "your@email.com"}
          </p>
        </div>
      </div>

      {/* Edit Form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">

        <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
          <Shield size={16} className="text-indigo-500" />
          <h3 className="font-semibold text-gray-800 text-sm">
            Account Information
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            placeholder="Your name"
            icon={User}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            label="Email"
            type="email"
            placeholder="your@email.com"
            icon={Mail}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="flex justify-between pt-4 border-t border-gray-100">

          {/* Delete Button */}
          <Button
            variant="danger"
            onClick={() => setConfirmDelete(true)}
          >
            Delete Account
          </Button>

          {/* Save Button */}
          <Button
            variant="default"
            onClick={save}
            disabled={saving}
          >
            <Save size={15} />
            {saving ? "Saving..." : "Save Changes"}
          </Button>

        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <Modal title="Delete Account" onClose={() => setConfirmDelete(false)}>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Are you sure you want to delete your account?
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setConfirmDelete(false)}
              >
                Cancel
              </Button>

              <Button
                variant="danger"
                onClick={deleteAccount}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </Button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};

export default Profile;

