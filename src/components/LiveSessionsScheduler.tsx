"use client";

import { useState } from "react";
import { Calendar, Clock, Users, MapPin, Video, Plus, Bell, Download } from "lucide-react";

interface LiveSession {
  id: string;
  title: string;
  course: string;
  instructor: string;
  date: string;
  time: string;
  duration: number;
  capacity: number;
  enrolled: number;
  location: "virtual" | "hybrid" | "in-person";
  roomUrl?: string;
  address?: string;
  status: "upcoming" | "live" | "ended" | "cancelled";
}

const mockSessions: LiveSession[] = [
  {
    id: "1",
    title: "CPR/AED Certification - Session A",
    course: "CPR/AED",
    instructor: "Dr. Sarah Martinez",
    date: "2026-04-05",
    time: "10:00 AM",
    duration: 120,
    capacity: 20,
    enrolled: 18,
    location: "virtual",
    roomUrl: "https://zoom.us/meeting/123456",
    status: "upcoming",
  },
  {
    id: "2",
    title: "BLS Advanced Techniques",
    course: "BLS",
    instructor: "James Chen, MD",
    date: "2026-04-08",
    time: "2:00 PM",
    duration: 180,
    capacity: 15,
    enrolled: 12,
    location: "hybrid",
    address: "Main Campus - Room 205",
    roomUrl: "https://zoom.us/meeting/654321",
    status: "upcoming",
  },
  {
    id: "3",
    title: "De-escalation Skills Workshop",
    course: "De-escalation",
    instructor: "Linda Rodriguez, LCSW",
    date: "2026-03-28",
    time: "3:30 PM",
    duration: 240,
    capacity: 25,
    enrolled: 25,
    location: "in-person",
    address: "Conference Center - Room A",
    status: "live",
  },
];

const statusColors: Record<string, string> = {
  upcoming: "bg-blue-500/10 text-blue-300 border-blue-500/30",
  live: "bg-red-500/10 text-red-300 border-red-500/30 animate-pulse",
  ended: "bg-slate-500/10 text-slate-400 border-slate-500/30",
  cancelled: "bg-red-500/10 text-red-300 border-red-500/30",
};

export default function LiveSessionsScheduler() {
  const [sessions, setSessions] = useState<LiveSession[]>(mockSessions);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [filter, setFilter] = useState<"all" | "upcoming" | "live" | "ended">("all");

  const filteredSessions =
    filter === "all" ? sessions : sessions.filter((s) => s.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Live Sessions</h2>
          <p className="text-slate-400 text-sm mt-1">
            Schedule and manage instructor-led training courses
          </p>
        </div>
        <button
          onClick={() => setShowScheduleModal(true)}
          className="button button-pulse flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Schedule Session
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {(["all", "upcoming", "live", "ended"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
              filter === f
                ? "bg-indigo-500 text-white"
                : "bg-[rgba(99,102,241,0.1)] text-slate-400 hover:text-white"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Sessions Grid */}
      <div className="space-y-4">
        {filteredSessions.map((session) => (
          <div
            key={session.id}
            className="glass-card p-6 rounded-2xl border border-[rgba(99,102,241,0.2)] hover:border-[rgba(99,102,241,0.4)] transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-white">{session.title}</h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                      statusColors[session.status]
                    }`}
                  >
                    {session.status}
                  </span>
                </div>
                <p className="text-slate-400 text-sm">{session.course}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5 pb-5 border-b border-[rgba(99,102,241,0.1)]">
              <div>
                <div className="text-[10px] uppercase tracking-[0.1em] text-slate-500 mb-1">
                  Date & Time
                </div>
                <div className="flex items-center gap-2 text-sm text-white">
                  <Calendar className="w-4 h-4 text-indigo-300" />
                  {session.date}, {session.time}
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-[0.1em] text-slate-500 mb-1">
                  Duration
                </div>
                <div className="flex items-center gap-2 text-sm text-white">
                  <Clock className="w-4 h-4 text-indigo-300" />
                  {session.duration} min
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-[0.1em] text-slate-500 mb-1">
                  Enrollment
                </div>
                <div className="flex items-center gap-2 text-sm text-white">
                  <Users className="w-4 h-4 text-indigo-300" />
                  {session.enrolled}/{session.capacity}
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-[0.1em] text-slate-500 mb-1">
                  Format
                </div>
                <div className="flex items-center gap-2 text-sm text-white capitalize">
                  <Video className="w-4 h-4 text-indigo-300" />
                  {session.location}
                </div>
              </div>
            </div>

            {/* Location Details */}
            <div className="mb-5 pb-5 border-b border-[rgba(99,102,241,0.1)]">
              <p className="text-sm text-slate-300 mb-2">
                <strong>Instructor:</strong> {session.instructor}
              </p>
              {session.location === "virtual" || session.location === "hybrid" ? (
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Video className="w-4 h-4 text-indigo-300" />
                  <a
                    href={session.roomUrl}
                    className="text-indigo-300 hover:text-white transition-colors"
                  >
                    Join Virtual Meeting
                  </a>
                </div>
              ) : null}

              {session.location === "in-person" || session.location === "hybrid" ? (
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <MapPin className="w-4 h-4 text-indigo-300" />
                  {session.address}
                </div>
              ) : null}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {session.status === "upcoming" && (
                <>
                  <button className="button button-pulse flex-1 flex items-center justify-center gap-2">
                    Register
                  </button>
                  <button className="button button-outline flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                  </button>
                </>
              )}

              {session.status === "live" && (
                <button className="button button-pulse flex-1 flex items-center justify-center gap-2 animate-pulse">
                  <Video className="w-4 h-4" />
                  Join Now
                </button>
              )}

              {session.status === "ended" && (
                <button className="button button-outline flex-1 flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  View Recording
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredSessions.length === 0 && (
        <div className="glass-card p-12 text-center rounded-2xl">
          <Calendar className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No sessions yet</h3>
          <p className="text-slate-400 mb-6">
            Check back soon for upcoming live training sessions.
          </p>
          <button className="button button-outline">Browse On-Demand Courses</button>
        </div>
      )}
    </div>
  );
}
