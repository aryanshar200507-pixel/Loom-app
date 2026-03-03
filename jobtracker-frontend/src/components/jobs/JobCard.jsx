import { Building2, Briefcase, ExternalLink, FileText, Pencil, Trash2 } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";

const statusStyles = {
  APPLIED:     "bg-[#507DBC]/15 text-[#507DBC] border border-[#507DBC]/30",
  SHORTLISTED: "bg-purple-100 text-purple-700 border border-purple-200",
  INTERVIEW:   "bg-[#DBFE87]/20 text-[#2E282A] border border-[#DBFE87]/50",
  OFFER:       "bg-[#BDF7B7]/20 text-[#2a6b27] border border-[#BDF7B7]/50",
  REJECTED:    "bg-red-100 text-red-700 border border-red-200",
  PENDING:     "bg-[#EDB88B]/20 text-[#7a4f1e] border border-[#EDB88B]/50",
};

const JobCard = ({ job, onEdit, onDelete }) => {
  return (
    <Card hover className="flex flex-col gap-3">
      <div className="flex justify-between items-start gap-2">
        <div className="flex items-start gap-3 min-w-0">
          <div className="bg-[#507DBC]/10 text-[#507DBC] p-2 rounded-xl shrink-0">
            <Building2 size={18} />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-[#2E282A] truncate">{job.companyName}</h3>
            <p className="text-sm text-[#2E282A]/60 flex items-center gap-1 mt-0.5">
              <Briefcase size={13} className="shrink-0" />
              <span className="truncate">{job.jobRole}</span>
            </p>
          </div>
        </div>
        <span className={`shrink-0 text-xs px-2.5 py-1 rounded-full font-semibold whitespace-nowrap ${statusStyles[job.status] || "bg-gray-100 text-gray-600"}`}>
          {job.status}
        </span>
      </div>

      {job.notes && (
        <div className="flex items-start gap-2 text-sm text-[#2E282A]/60 bg-[#507DBC]/5 rounded-lg px-3 py-2">
          <FileText size={14} className="shrink-0 mt-0.5 text-[#507DBC]/60" />
          <p className="line-clamp-2">{job.notes}</p>
        </div>
      )}

      {job.jobLink && (
        <a href={job.jobLink} target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-[#507DBC] hover:text-[#2E282A] font-medium transition-colors">
          <ExternalLink size={14} />
          View Job Posting
        </a>
      )}

      <div className="flex gap-2 pt-1 border-t border-[#507DBC]/8 mt-auto">
        <Button onClick={() => onEdit(job)} variant="warning" size="sm" className="flex-1">
          <Pencil size={13} /> Edit
        </Button>
        <Button onClick={() => onDelete(job.jobId)} variant="danger" size="sm" className="flex-1">
          <Trash2 size={13} /> Delete
        </Button>
      </div>
    </Card>
  );
};

export default JobCard;