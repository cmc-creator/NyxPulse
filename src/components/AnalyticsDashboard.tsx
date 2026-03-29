"use client";

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { TrendingUp, Users, Target, Clock, Download, Filter } from "lucide-react";

// Mock analytics data
const completionData = [
  { month: "Jan", rate: 45 },
  { month: "Feb", rate: 52 },
  { month: "Mar", rate: 68 },
  { month: "Apr", rate: 72 },
  { month: "May", rate: 85 },
  { month: "Jun", rate: 88 },
];

const courseCompletion = [
  { name: "CPR/AED", completed: 156, enrolled: 180, percentage: 87 },
  { name: "BLS", completed: 142, enrolled: 165, percentage: 86 },
  { name: "De-escalation", completed: 98, enrolled: 140, percentage: 70 },
  { name: "Emergency Mgmt", completed: 45, enrolled: 50, percentage: 90 },
  { name: "ICS/HICS", completed: 67, enrolled: 80, percentage: 84 },
  { name: "OSHA Safety", completed: 89, enrolled: 120, percentage: 74 },
];

const learnerProgress = [
  { name: "Not Started", value: 120, fill: "#94a3b8" },
  { name: "In Progress", value: 340, fill: "#60a5fa" },
  { name: "Completed", value: 597, fill: "#10b981" },
];

const timeToCompletion = [
  { range: "0-7 days", count: 245 },
  { range: "8-14 days", count: 189 },
  { range: "15-30 days", count: 98 },
  { range: "30+ days", count: 65 },
];

export default function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const stats = [
    {
      label: "Total Learners",
      value: 1057,
      icon: Users,
      color: "from-violet-600 to-violet-400",
      glow: "rgba(124,58,237,0.3)",
    },
    {
      label: "Avg Completion Rate",
      value: "83%",
      icon: TrendingUp,
      color: "from-emerald-600 to-emerald-400",
      glow: "rgba(16,185,129,0.3)",
    },
    {
      label: "Certifications Issued",
      value: "597",
      icon: Target,
      color: "from-amber-600 to-amber-400",
      glow: "rgba(217,119,6,0.3)",
    },
    {
      label: "Avg Days to Complete",
      value: "12.4",
      icon: Clock,
      color: "from-cyan-600 to-cyan-400",
      glow: "rgba(6,182,212,0.3)",
    },
  ];

  const filteredCourseData = selectedCourse
    ? courseCompletion.filter((c) => c.name === selectedCourse)
    : courseCompletion;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
        <p className="text-slate-400">
          Monitor over all platform metrics and learner progress
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="glass-card p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-400 text-sm font-semibold">{stat.label}</h3>
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                  style={{ boxShadow: `0 0 20px ${stat.glow}` }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white">{stat.value}</div>
            </div>
          );
        })}
      </div>

      {/* Completion Rate Trend */}
      <div className="glass-card p-8 rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Overall Completion Rate Trend</h2>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 text-sm bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.2)] rounded-lg text-white focus:outline-none focus:border-[rgba(99,102,241,0.5)]"
          >
            <option value="all">All Time</option>
            <option value="6m">Last 6 Months</option>
            <option value="3m">Last 3 Months</option>
            <option value="1m">Last Month</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={completionData}>
            <defs>
              <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.1)" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                border: "1px solid rgba(99,102,241,0.2)",
                borderRadius: "8px",
              }}
              cursor={{ stroke: "rgba(99,102,241,0.3)" }}
            />
            <Area
              type="monotone"
              dataKey="rate"
              stroke="#6366f1"
              fillOpacity={1}
              fill="url(#colorRate)"
              name="Completion %"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Course Completion */}
        <div className="glass-card p-8 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-6">Course Completion Status</h2>
          <div className="space-y-4">
            {courseCompletion.map((course) => (
              <div key={course.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-white">{course.name}</span>
                  <span className="text-xs font-semibold text-indigo-300">
                    {course.completed}/{course.enrolled} ({course.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-[rgba(99,102,241,0.1)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-indigo-300 transition-all duration-300"
                    style={{ width: `${course.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learner Progress Distribution */}
        <div className="glass-card p-8 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-6">Learner Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={learnerProgress}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value, percent }) => (
                  <text className="text-xs fill-white font-semibold">
                    {name}: {value} ({((percent ?? 0) * 100).toFixed(0)}%)
                  </text>
                )}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {learnerProgress.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.95)",
                  border: "1px solid rgba(99,102,241,0.2)",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Time to Completion */}
      <div className="glass-card p-8 rounded-2xl">
        <h2 className="text-xl font-bold text-white mb-6">Time to Completion Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={timeToCompletion}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.1)" />
            <XAxis dataKey="range" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                border: "1px solid rgba(99,102,241,0.2)",
                borderRadius: "8px",
              }}
              cursor={{ fill: "rgba(99,102,241,0.1)" }}
            />
            <Bar dataKey="count" fill="#6366f1" radius={[8, 8, 0, 0]} name="Learners" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Export & Actions */}
      <div className="flex items-center justify-between">
        <p className="text-slate-400 text-sm">
          Last updated: {new Date().toLocaleString()}
        </p>
        <button className="button button-outline flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>
    </div>
  );
}
