import { Send, MessageSquare, PartyPopper, XCircle, Clock , Star } from "lucide-react";
import Card from "../ui/Card";


const STAT_CONFIG = [
  { key: "applied",     label: "Applied",     icon: Send,          bg: "bg-[#507DBC]/10",  icon_color: "text-[#507DBC]",   value_color: "text-[#507DBC]"  },
  { key: "shortlisted", label: "Shortlisted", icon: Star,          bg: "bg-purple-50",     icon_color: "text-purple-500",  value_color: "text-purple-600" },
  { key: "interview",   label: "Interview",   icon: MessageSquare, bg: "bg-[#DBFE87]/20",  icon_color: "text-[#2E282A]",   value_color: "text-[#2E282A]"  },
  { key: "offer",       label: "Offers",      icon: PartyPopper,   bg: "bg-[#BDF7B7]/20",  icon_color: "text-[#2a6b27]",   value_color: "text-[#2a6b27]"  },
  { key: "rejected",    label: "Rejected",    icon: XCircle,       bg: "bg-red-50",        icon_color: "text-red-500",     value_color: "text-red-600"    },
  { key: "pending",     label: "Pending",     icon: Clock,         bg: "bg-[#EDB88B]/20",  icon_color: "text-[#7a4f1e]",   value_color: "text-[#7a4f1e]"  },
];

const StatCard = ({ label, value, icon: Icon, bg, icon_color, value_color }) => (
  <Card className="flex items-center gap-4">
    <div className={`${bg} ${icon_color} p-3 rounded-xl shrink-0`}>
      <Icon size={20} />
    </div>
    <div>
      <p className="text-xs text-[#2E282A]/50 font-semibold uppercase tracking-widest">{label}</p>
      <h2 className={`text-2xl font-bold leading-tight ${value_color}`}>{value ?? 0}</h2>
    </div>
  </Card>
);

const StatsCards = ({ stats }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
    {STAT_CONFIG.map((config) => (
      <StatCard key={config.key} label={config.label} value={stats?.[config.key]}
        icon={config.icon} bg={config.bg} icon_color={config.icon_color} value_color={config.value_color} />
    ))}
  </div>
);

export default StatsCards;