import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid,
} from "recharts";

const BAR_COLORS = {
  Applied:     "#507DBC",
  Shortlisted: "#a855f7",
  Interview:   "#c8e830",
  Offer:       "#BDF7B7",
  Rejected:    "#f87171",
  Pending:     "#EDB88B",
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#2E282A] text-white text-xs px-3 py-2 rounded-lg shadow-lg border border-[#507DBC]/30">
        <p className="font-semibold text-[#DBFE87]">{label}</p>
        <p>{payload[0].value} application{payload[0].value !== 1 ? "s" : ""}</p>
      </div>
    );
  }
  return null;
};

const StatusChart = ({ stats }) => {
  const data = [
  { name: "Applied",     value: stats?.applied     ?? 0 },
  { name: "Shortlisted", value: stats?.shortlisted ?? 0 },
  { name: "Interview",   value: stats?.interview   ?? 0 },
  { name: "Offer",       value: stats?.offer       ?? 0 },
  { name: "Rejected",    value: stats?.rejected    ?? 0 },
  { name: "Pending",     value: stats?.pending     ?? 0 },
];


  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#507DBC]/10 p-5">
      <h3 className="font-semibold text-[#2E282A] mb-4 text-base tracking-wide">Application Status Overview</h3>
      <div className="h-56 sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={32} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#507DBC18" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#2E282A80" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#2E282A80" }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#507DBC0A", radius: 6 }} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {data.map((entry) => (
                <Cell key={entry.name} fill={BAR_COLORS[entry.name] || "#507DBC"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatusChart;