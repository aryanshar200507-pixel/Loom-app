import { useEffect, useState } from "react";
import { Plus, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import Modal from "../components/ui/Modal";
import JobForm from "../components/jobs/JobForm";
import JobTable from "../components/jobs/JobTable";
import Loader from "../components/ui/Loader";
import Button from "../components/ui/Button";
import { jobApi } from "../api/jobApi";
import toast from "react-hot-toast";
import logo from "../assets/logo.png";

const STATUS_OPTIONS = [
	"",
	"APPLIED",
	"SHORTLISTED",
	"INTERVIEW",
	"PENDING",
	"OFFER",
	"REJECTED",
];

const notifyDashboard = () => window.dispatchEvent(new Event("jobs-updated"));

const Jobs = () => {
	const [jobs, setJobs] = useState([]);
	const [loading, setLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [editingJob, setEditingJob] = useState(null);
	const [page, setPage] = useState(0);
	const [totalPages, setTotalPages] = useState(1);
	const [status, setStatus] = useState("");
	const [confirmDeleteId, setConfirmDeleteId] = useState(null);
	const [deleting, setDeleting] = useState(false);

	useEffect(() => {
		fetchJobs();
	}, [page, status]);

	const fetchJobs = async () => {
		setLoading(true);
		try {
			const res = await jobApi.getJobs({ page, size: 5, status });
			setJobs(res.data.content || []);
			setTotalPages(res.data.totalPages || 1);
		} catch (err) {
			toast.error("Failed to fetch jobs");
			setJobs([]);
		} finally {
			setLoading(false);
		}
	};

	const createJob = async (data) => {
		try {
			await jobApi.create(data);
			notifyDashboard();
			toast.success("Job added!");
			setShowModal(false);
			fetchJobs();
		} catch {
			toast.error("Failed to add job");
		}
	};

	const updateJob = async (data) => {
		try {
			await jobApi.update(editingJob.jobId, data);
			notifyDashboard();
			toast.success("Job updated!");
			setEditingJob(null);
			fetchJobs();
		} catch {
			toast.error("Failed to update job");
		}
	};

	const deleteJob = async () => {
		if (!confirmDeleteId) return;

		setDeleting(true);
		try {
			await jobApi.delete(confirmDeleteId);
			toast.success("Job deleted");
			fetchJobs();
		} catch (err) {
			toast.error("Failed to delete job");
			console.error(err);
		} finally {
			setDeleting(false);
			setConfirmDeleteId(null);
		}
	};

	return (
		<div className="space-y-5">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
				<div className="flex items-center gap-3">
					<div className=" p-2 rounded-xl shadow-md">
						<img src={logo} alt="Logo" className="w-7 h-7 object-cover" />
					</div>
					<div>
						<h2 className="text-xl font-bold text-[#2E282A]">
							My Applications
						</h2>
						<p className="text-sm text-[#2E282A]/50">
							{jobs.length} jobs listed
						</p>
					</div>
				</div>

				<Button variant="default" onClick={() => setShowModal(true)}>
					<Plus size={16} />
					Add Job
				</Button>
			</div>

			<div className="flex items-center gap-2">
				<Filter size={15} className="text-[#507DBC]" />
				<select
					className="border border-[#507DBC]/20 rounded-lg px-3 py-2 text-sm bg-[#507DBC]/5 text-[#2E282A] focus:outline-none focus:ring-2 focus:ring-[#507DBC] focus:bg-white transition-all"
					value={status}
					onChange={(e) => {
						setStatus(e.target.value);
						setPage(0);
					}}>
					{STATUS_OPTIONS.map((s) => (
						<option key={s} value={s}>
							{s === "" ? "All Statuses" : s}
						</option>
					))}
				</select>
			</div>

			{loading ? (
				<Loader text="Loading jobs..." />
			) : (
				<JobTable
					jobs={jobs}
					onEdit={setEditingJob}
					onDelete={(userId) => setConfirmDeleteId(userId)}
				/>
			)}

			<div className="flex items-center justify-between">
				<p className="text-sm text-[#2E282A]/50">
					Page <span className="font-semibold text-[#507DBC]">{page + 1}</span>{" "}
					of <span className="font-semibold text-[#507DBC]">{totalPages}</span>
				</p>

				<div className="flex gap-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => setPage((p) => Math.max(0, p - 1))}
						disabled={page === 0}>
						<ChevronLeft size={15} /> Prev
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => setPage((p) => p + 1)}
						disabled={page + 1 >= totalPages}>
						Next <ChevronRight size={15} />
					</Button>
				</div>
			</div>

			{showModal && (
				<Modal title="Add New Job" onClose={() => setShowModal(false)}>
					<JobForm onSubmit={createJob} onCancel={() => setShowModal(false)} />
				</Modal>
			)}

			{editingJob && (
				<Modal title="Edit Job" onClose={() => setEditingJob(null)}>
					<JobForm
						defaultData={editingJob}
						onSubmit={updateJob}
						onCancel={() => setEditingJob(null)}
					/>
				</Modal>
			)}

			{confirmDeleteId && (
				<Modal title="Delete Job" onClose={() => setConfirmDeleteId(null)}>
					<div className="space-y-4">
						<p className="text-sm text-gray-600">
							Are you sure you want to delete this job application?
						</p>

						<div className="flex justify-end gap-2 pt-2">
							<Button
								variant="outline"
								onClick={() => setConfirmDeleteId(null)}>
								Cancel
							</Button>

							<Button variant="danger" onClick={deleteJob} disabled={deleting}>
								{deleting ? "Deleting..." : "Yes, Delete"}
							</Button>
						</div>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default Jobs;
