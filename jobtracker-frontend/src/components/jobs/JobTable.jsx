import { Pencil, Trash2, ExternalLink, Inbox } from "lucide-react";
import Button from "../ui/Button";

const statusStyles = {
  APPLIED:     "bg-[#507DBC]/15 text-[#507DBC] border border-[#507DBC]/30",
  SHORTLISTED: "bg-purple-100 text-purple-700 border border-purple-200",
  INTERVIEW:   "bg-[#DBFE87]/20 text-[#2E282A] border border-[#DBFE87]/50",
  OFFER:       "bg-[#BDF7B7]/20 text-[#2a6b27] border border-[#BDF7B7]/50",
  REJECTED:    "bg-red-100 text-red-700 border border-red-200",
  PENDING:     "bg-[#EDB88B]/20 text-[#7a4f1e] border border-[#EDB88B]/50",
};

const JobTable = ({ jobs, onEdit, onDelete }) => {
  const showActions = onEdit && onDelete;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#507DBC]/10 overflow-hidden">
      <div className="px-5 py-4 border-b border-[#507DBC]/10 bg-[#2E282A]">
        <h3 className="font-semibold text-[#DBFE87] text-base tracking-wide">
          Recent Applications
        </h3>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#507DBC]/5 text-[#507DBC] text-xs uppercase tracking-widest">
              <th className="px-5 py-3 text-left font-semibold">Company</th>
              <th className="px-5 py-3 text-left font-semibold">Role</th>
              <th className="px-5 py-3 text-left font-semibold">Link</th>
              <th className="px-5 py-3 text-left font-semibold">Status</th>
              <th className="px-5 py-3 text-left font-semibold">Notes</th>
              {showActions && (
                <th className="px-5 py-3 text-left font-semibold">Actions</th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#507DBC]/8">
            {Array.isArray(jobs) && jobs.length > 0 ? (
              jobs.map((job) => (
                <tr key={job.jobId} className="hover:bg-[#507DBC]/4 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-[#2E282A]">
                    {job.companyName}
                  </td>

                  <td className="px-5 py-3.5 text-[#2E282A]/70">
                    {job.jobRole}
                  </td>

                  <td className="px-5 py-3.5">
                    {job.jobLink ? (
                      <a
                        href={job.jobLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[#507DBC] hover:text-[#2E282A] font-medium transition-colors"
                      >
                        View <ExternalLink size={13} />
                      </a>
                    ) : (
                      <span className="text-[#2E282A]/30">—</span>
                    )}
                  </td>

                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                        statusStyles[job.status] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>

                  <td className="px-5 py-3.5 text-[#2E282A]/50 max-w-45 truncate">
                    {job.notes || "—"}
                  </td>

                  {showActions && (
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <Button variant="warning" size="sm" onClick={() => onEdit(job)}>
                          <Pencil size={13} /> Edit
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => onDelete(job.jobId)}>
                          <Trash2 size={13} /> Delete
                        </Button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={showActions ? 6 : 5} className="px-5 py-16 text-center">
                  <div className="flex flex-col items-center gap-2 text-[#507DBC]/40">
                    <Inbox size={36} strokeWidth={1.2} />
                    <p className="text-sm font-medium">No jobs found</p>
                    <p className="text-xs">Add your first application to get started</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-[#507DBC]/10">
        {Array.isArray(jobs) && jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.jobId} className="p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-[#2E282A]">{job.companyName}</p>
                  <p className="text-sm text-[#2E282A]/60">{job.jobRole}</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${statusStyles[job.status] || "bg-gray-100 text-gray-600"}`}>
                  {job.status}
                </span>
              </div>

              {job.notes && (
                <p className="text-xs text-[#2E282A]/50 line-clamp-2">{job.notes}</p>
              )}

              <div className="flex items-center justify-between pt-1">
                {job.jobLink ? (
                  <a href={job.jobLink} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#507DBC] font-medium">
                    View posting <ExternalLink size={11} />
                  </a>
                ) : <span />}

                {showActions && (
                  <div className="flex gap-2">
                    <Button variant="warning" size="sm" onClick={() => onEdit(job)}>
                      <Pencil size={12} />
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => onDelete(job.jobId)}>
                      <Trash2 size={12} />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="py-16 flex flex-col items-center gap-2 text-[#507DBC]/40">
            <Inbox size={36} strokeWidth={1.2} />
            <p className="text-sm font-medium">No jobs found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobTable;