import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ArrowRight, CheckCircle2, BarChart3, Bell, Shield,
  Briefcase, TrendingUp, Filter, Zap
} from "lucide-react";
import logo from "../assets/logo.png";

const STATUSES = ["APPLIED", "INTERVIEW", "OFFER", "PENDING", "REJECTED"];
const STATUS_COLORS = {
  APPLIED:   { bg: "bg-[#507DBC]/15", text: "text-[#507DBC]",  dot: "bg-[#507DBC]" },
  INTERVIEW: { bg: "bg-[#DBFE87]/20", text: "text-[#5a6e00]",  dot: "bg-[#DBFE87]" },
  OFFER:     { bg: "bg-[#BDF7B7]/20", text: "text-[#2a6b27]",  dot: "bg-[#BDF7B7]" },
  PENDING:   { bg: "bg-[#EDB88B]/20", text: "text-[#7a4f1e]",  dot: "bg-[#EDB88B]" },
  REJECTED:  { bg: "bg-red-100",      text: "text-red-600",    dot: "bg-red-400" },
};

const MOCK_JOBS = [
  { company: "Stripe",    role: "Frontend Engineer",     status: "INTERVIEW" },
  { company: "Vercel",    role: "React Developer",       status: "OFFER" },
  { company: "Linear",    role: "Full Stack Engineer",   status: "APPLIED" },
  { company: "Figma",     role: "UI Engineer",           status: "PENDING" },
  { company: "GitHub",    role: "Software Engineer",     status: "INTERVIEW" },
];

const FEATURES = [
  { icon: BarChart3,   title: "Visual Dashboard",     desc: "See your entire job search at a glance with live stats and charts.",         color: "text-[#507DBC]", bg: "bg-[#507DBC]/10" },
  { icon: Filter,      title: "Smart Filtering",      desc: "Filter by status — Applied, Interview, Offer, and more — instantly.",        color: "text-[#DBFE87]", bg: "bg-[#DBFE87]/15" },
  { icon: Zap,         title: "Fast & Lightweight",   desc: "No bloat. A clean interface that gets out of your way.",                     color: "text-[#BDF7B7]", bg: "bg-[#BDF7B7]/15" },
  { icon: Shield,      title: "Secure by Default",    desc: "JWT authentication keeps your data private and your account protected.",    color: "text-[#EDB88B]", bg: "bg-[#EDB88B]/20" },
  { icon: TrendingUp,  title: "Track Progress",       desc: "Watch your pipeline grow from first application to final offer.",           color: "text-[#507DBC]", bg: "bg-[#507DBC]/10" },
  { icon: Bell,        title: "Stay Organized",       desc: "Add notes, links, and status updates to every application you track.",      color: "text-[#DBFE87]", bg: "bg-[#DBFE87]/15" },
];

const STATS = [
  { value: "500+", label: "Jobs Tracked" },
  { value: "5",    label: "Status Types" },
  { value: "100%", label: "Free to Use" },
  { value: "∞",    label: "Applications" },
];

// Animated counter hook
const useCounter = (target, duration = 1500) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const numeric = parseInt(target);
    if (isNaN(numeric)) return;
    let start = 0;
    const step = numeric / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= numeric) { setCount(numeric); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return isNaN(parseInt(target)) ? target : count;
};

const StatItem = ({ value, label }) => {
  const display = useCounter(value);
  return (
    <div className="text-center">
      <div className="text-3xl sm:text-4xl font-black text-[#DBFE87] mb-1">
        {typeof display === "number" ? `${display}+` : value}
      </div>
      <div className="text-sm text-white/50 font-medium uppercase tracking-widest">{label}</div>
    </div>
  );
};

export default function LandingPage() {
  const [hoveredJob, setHoveredJob] = useState(null);

  return (
    <div className="min-h-screen bg-[#2E282A] text-white overflow-x-hidden font-sans">

      {/* ── NAVBAR ─────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 py-4 bg-[#2E282A]/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <img src={logo} alt="Loom" className="w-8 h-8 object-contain" />
          <span className="text-lg font-bold tracking-tight text-white">Loom</span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-semibold text-white/70 hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 text-sm font-semibold bg-[#507DBC] hover:bg-[#3d6494] text-white rounded-lg transition-all active:scale-95 shadow-lg shadow-[#507DBC]/20"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-20">

        {/* Background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-[#507DBC]/12 blur-[100px]" />
          <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-[#DBFE87]/8 blur-[100px]" />
          <div className="absolute top-3/4 left-1/3 w-[300px] h-[300px] rounded-full bg-[#BDF7B7]/6 blur-[80px]" />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Copy */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#DBFE87]/10 border border-[#DBFE87]/20 text-[#DBFE87] text-xs font-semibold tracking-wide animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DBFE87] animate-pulse" />
              Your Job Search, Organized
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight">
              Track every{" "}
              <span className="relative inline-block">
                <span className="text-[#507DBC]">application</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 9 Q75 2 150 9 Q225 16 298 9" stroke="#DBFE87" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6"/>
                </svg>
              </span>
              <br />
              land your{" "}
              <span className="text-[#DBFE87]">dream job.</span>
            </h1>

            {/* Subtext */}
            <p className="text-lg text-white/50 leading-relaxed max-w-md">
              Loom helps you manage your entire job search in one place —
              from first application to final offer. No spreadsheets. No chaos.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/register"
                className="group inline-flex items-center gap-2 px-6 py-3.5 bg-[#507DBC] hover:bg-[#3d6494] text-white font-bold rounded-xl transition-all duration-200 active:scale-95 shadow-xl shadow-[#507DBC]/25 text-sm"
              >
                Start Tracking Free
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/15 hover:border-white/30 text-white/70 hover:text-white font-semibold rounded-xl transition-all duration-200 text-sm"
              >
                I have an account
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center gap-5 pt-2">
              {["No credit card required", "Free forever", "Setup in 60s"].map((t) => (
                <div key={t} className="flex items-center gap-1.5 text-xs text-white/40 font-medium">
                  <CheckCircle2 size={13} className="text-[#BDF7B7]" />
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Mock App Preview */}
          <div className="relative">
            {/* Glow behind card */}
            <div className="absolute inset-0 bg-[#507DBC]/10 rounded-3xl blur-3xl scale-110" />

            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              {/* Mini header */}
              <div className="bg-[#2E282A] border-b border-white/8 px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={logo} alt="" className="w-5 h-5 object-contain" />
                  <span className="text-sm font-bold text-[#DBFE87]">My Applications</span>
                </div>
                <span className="text-xs text-white/30 bg-white/5 px-2.5 py-1 rounded-full">5 jobs</span>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-px bg-white/5 border-b border-white/8">
                {[["3", "Active"], ["1", "Offer 🎉"], ["1", "Pending"]].map(([n, l]) => (
                  <div key={l} className="bg-[#2E282A]/60 px-4 py-3 text-center">
                    <div className="text-xl font-black text-white">{n}</div>
                    <div className="text-xs text-white/40 mt-0.5">{l}</div>
                  </div>
                ))}
              </div>

              {/* Job rows */}
              <div className="divide-y divide-white/5">
                {MOCK_JOBS.map((job, i) => {
                  const s = STATUS_COLORS[job.status];
                  return (
                    <div
                      key={i}
                      onMouseEnter={() => setHoveredJob(i)}
                      onMouseLeave={() => setHoveredJob(null)}
                      className={`flex items-center justify-between px-5 py-3.5 transition-colors duration-150 cursor-default
                        ${hoveredJob === i ? "bg-white/5" : ""}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center text-xs font-black text-white/60">
                          {job.company[0]}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">{job.company}</div>
                          <div className="text-xs text-white/40">{job.role}</div>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 ${s.bg} ${s.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                        {job.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Floating accent card */}
            <div className="absolute -bottom-4 -right-4 bg-[#BDF7B7] text-[#2E282A] rounded-2xl px-4 py-3 shadow-xl shadow-[#BDF7B7]/20 flex items-center gap-2">
              <span className="text-xl">🎉</span>
              <div>
                <div className="text-xs font-black">Offer received!</div>
                <div className="text-[10px] opacity-60">Vercel · React Dev</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────────── */}
      <section className="border-y border-white/8 bg-white/3 py-12">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {STATS.map((s) => <StatItem key={s.label} {...s} />)}
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────── */}
      <section className="py-28 px-6 sm:px-10 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <p className="text-[#507DBC] text-sm font-bold uppercase tracking-widest">Everything you need</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            Built for job seekers,<br />
            <span className="text-[#DBFE87]">not HR teams.</span>
          </h2>
          <p className="text-white/40 max-w-md mx-auto">
            Simple, focused, and powerful. Loom is exactly what you need to take control of your job hunt.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group bg-white/3 hover:bg-white/6 border border-white/8 hover:border-white/15 rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1"
            >
              <div className={`w-11 h-11 rounded-xl ${f.bg} flex items-center justify-center mb-4`}>
                <f.icon size={20} className={f.color} />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────── */}
      <section className="py-24 px-6 sm:px-10 bg-white/2 border-y border-white/6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <p className="text-[#EDB88B] text-sm font-bold uppercase tracking-widest">How it works</p>
            <h2 className="text-4xl sm:text-5xl font-black text-white">Up and running<br /><span className="text-[#507DBC]">in 3 steps.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-px bg-gradient-to-r from-[#507DBC]/40 via-[#DBFE87]/40 to-[#BDF7B7]/40" />

            {[
              { step: "01", color: "text-[#507DBC]", border: "border-[#507DBC]/30", bg: "bg-[#507DBC]/10", icon: "👤", title: "Create your account", desc: "Sign up for free in seconds. No credit card, no commitments." },
              { step: "02", color: "text-[#DBFE87]", border: "border-[#DBFE87]/30", bg: "bg-[#DBFE87]/10", icon: "📋", title: "Add your jobs",         desc: "Log every application with the company, role, link, and status." },
              { step: "03", color: "text-[#BDF7B7]", border: "border-[#BDF7B7]/30", bg: "bg-[#BDF7B7]/10", icon: "🚀", title: "Track & get hired",     desc: "Update statuses as you progress and watch your offer come in." },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center space-y-4">
                <div className={`w-20 h-20 rounded-2xl ${item.bg} border ${item.border} flex items-center justify-center text-3xl`}>
                  {item.icon}
                </div>
                <span className={`text-xs font-black ${item.color} uppercase tracking-widest`}>Step {item.step}</span>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ────────────────────────────────────── */}
      <section className="py-28 px-6 sm:px-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[#507DBC]/20 border border-[#507DBC]/30 mb-2">
            <img src={logo} alt="Loom" className="w-10 h-10 object-contain" />
            <div className="absolute inset-0 rounded-3xl bg-[#507DBC]/10 blur-xl scale-150" />
          </div>

          <h2 className="text-4xl sm:text-5xl font-black leading-tight">
            Ready to take control<br />of your{" "}
            <span className="text-[#DBFE87]">job search?</span>
          </h2>

          <p className="text-white/40 text-lg max-w-md mx-auto">
            Join hundreds of job seekers who use Loom to stay organized and land offers faster.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/register"
              className="group inline-flex items-center gap-2.5 px-8 py-4 bg-[#DBFE87] hover:bg-[#cff070] text-[#2E282A] font-black rounded-xl transition-all duration-200 active:scale-95 shadow-2xl shadow-[#DBFE87]/20 text-sm"
            >
              <Briefcase size={17} />
              Create Free Account
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/15 hover:border-white/30 text-white/60 hover:text-white font-semibold rounded-xl transition-all duration-200 text-sm"
            >
              Sign in instead
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="border-t border-white/8 px-6 sm:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Loom" className="w-5 h-5 object-contain opacity-60" />
          <span className="text-sm text-white/30 font-medium">Loom — Job Tracker</span>
        </div>
        <p className="text-xs text-white/20">© 2025 Loom. Built with Spring Boot & React.</p>
        <div className="flex items-center gap-5">
          <Link to="/login"    className="text-xs text-white/30 hover:text-white/60 transition-colors">Login</Link>
          <Link to="/register" className="text-xs text-white/30 hover:text-white/60 transition-colors">Register</Link>
        </div>
      </footer>

    </div>
  );
}