import { useEffect, useState } from "react";
import StatsCards from "../components/dashboard/StatusCard";
import StatusChart from "../components/dashboard/StatusChart";
import JobTable from "../components/jobs/JobTable";
import Loader from "../components/ui/Loader";
import { jobApi } from "../api/jobApi";
import toast from "react-hot-toast";

function Dashboard() {
	const [stats, setStats] = useState(null);
	const [jobs, setJobs] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchAll();
		const handler = () => fetchAll();
		window.addEventListener("jobs-updated", handler);
		return () => window.removeEventListener("jobs-updated", handler);
	}, []);

	const fetchAll = async () => {
		setLoading(true);
		try {
			const [statsRes, jobsRes] = await Promise.all([
				jobApi.stats(),
				jobApi.getJobs({ page: 0, size: 5 }),
			]);

			const raw = statsRes.data || {};
			const counts = raw.statusCount || {};
			const normalized = {
				applied: counts.APPLIED ?? 0,
				shortlisted: counts.SHORTLISTED ?? 0,
				interview: counts.INTERVIEW ?? 0,
				offer: counts.OFFER ?? 0,
				rejected: counts.REJECTED ?? 0,
				pending: counts.PENDING ?? 0,
			};

			setStats(normalized);
			setJobs(jobsRes.data.content || []);
		} catch (err) {
			toast.error("Failed to load dashboard");
		} finally {
			setLoading(false);
		}
	};

	if (loading) return <Loader size="lg" text="Loading dashboard..." />;

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold text-[#2E282A]">Dashboard</h2>
				<p className="text-sm text-[#2E282A]/50 mt-0.5">
					Overview of your job applications
				</p>
			</div>

			{stats && <StatsCards stats={stats} />}

			<div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
				{stats && <StatusChart stats={stats} />}
				<JobTable jobs={jobs} />
			</div>
		</div>
	);
}

export default Dashboard;
