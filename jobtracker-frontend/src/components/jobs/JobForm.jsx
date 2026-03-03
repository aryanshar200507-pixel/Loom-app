import { useState, useEffect } from "react";
import { Building2, Briefcase, Link, FileText, ChevronDown } from "lucide-react";
import Input from "../ui/Input";
import Button from "../ui/Button";

const STATUS_OPTIONS = ["APPLIED", "SHORTLISTED", "INTERVIEW", "PENDING", "OFFER", "REJECTED"];

const JobForm = ({ defaultData = {}, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    companyName: "",
    jobRole: "",
    jobLink: "",
    status: "APPLIED",
    notes: "",
  });

  useEffect(() => {
    if (defaultData && defaultData.jobId) {
      setForm({
        companyName: defaultData.companyName || "",
        jobRole:     defaultData.jobRole     || "",
        jobLink:     defaultData.jobLink     || "",
        status:      defaultData.status      || "APPLIED",
        notes:       defaultData.notes       || "",
      });
    }
  }, [defaultData]);

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Company" placeholder="e.g. Google" icon={Building2}
          value={form.companyName} onChange={(e) => set("companyName", e.target.value)} required />
        <Input label="Job Role" placeholder="e.g. Frontend Engineer" icon={Briefcase}
          value={form.jobRole} onChange={(e) => set("jobRole", e.target.value)} required />
      </div>

      <Input label="Job Link" placeholder="https://..." icon={Link}
        value={form.jobLink} onChange={(e) => set("jobLink", e.target.value)} type="url" />

      <div className="space-y-1">
        <label className="block text-sm font-medium text-[#2E282A]">Status</label>
        <div className="relative">
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#507DBC] pointer-events-none" />
          <select
            className="w-full border border-[#507DBC]/20 rounded-lg py-2.5 px-4 text-sm bg-[#507DBC]/5 text-[#2E282A]
              focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#507DBC] focus:border-transparent
              transition-all duration-200 appearance-none font-medium"
            value={form.status}
            onChange={(e) => set("status", e.target.value)}
          >
            {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-[#2E282A]">Notes</label>
        <div className="relative">
          <FileText size={16} className="absolute left-3 top-3 text-[#507DBC]/50" />
          <textarea
            placeholder="Any additional notes..."
            rows={3}
            className="w-full border border-[#507DBC]/20 rounded-lg py-2.5 pl-9 pr-4 text-sm bg-[#507DBC]/5 text-[#2E282A]
              placeholder-[#2E282A]/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#507DBC] focus:border-transparent
              transition-all duration-200 resize-none"
            value={form.notes}
            onChange={(e) => set("notes", e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 pt-2">
        <Button type="submit" variant="default" className="flex-1">Save Application</Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">Cancel</Button>
      </div>
    </form>
  );
};

export default JobForm;