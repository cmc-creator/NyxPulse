"use client";

import { useState } from "react";
import { Plus, Mail, Trash2, Shield, Eye, Edit2, CheckCircle, Clock } from "lucide-react";

interface TeamMember {
  id: string;
  email: string;
  name: string;
  role: "admin" | "manager" | "viewer";
  status: "active" | "pending" | "inactive";
  joinedAt: string;
}

const roleDescriptions: Record<string, string> = {
  admin: "Full access to settings, team management, and billing",
  manager: "Can manage courses, track learner progress, and invite team members",
  viewer: "Read-only access to dashboard and reports",
};

const mockMembers: TeamMember[] = [
  {
    id: "1",
    email: "you@hospital.edu",
    name: "You",
    role: "admin",
    status: "active",
    joinedAt: "2026-01-15",
  },
  {
    id: "2",
    email: "sarah@hospital.edu",
    name: "Sarah Martinez",
    role: "manager",
    status: "active",
    joinedAt: "2026-02-20",
  },
  {
    id: "3",
    email: "james@hospital.edu",
    name: "James Chen",
    role: "viewer",
    status: "pending",
    joinedAt: "2026-03-25",
  },
];

const roleIcons: Record<string, React.ReactNode> = {
  admin: <Shield className="w-4 h-4" />,
  manager: <Edit2 className="w-4 h-4" />,
  viewer: <Eye className="w-4 h-4" />,
};

export default function TeamManagement() {
  const [members, setMembers] = useState<TeamMember[]>(mockMembers);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"manager" | "viewer">("manager");

  const handleInvite = () => {
    if (!inviteEmail) return;

    const newMember: TeamMember = {
      id: `temp-${Date.now()}`,
      email: inviteEmail,
      name: inviteEmail.split("@")[0],
      role: inviteRole,
      status: "pending",
      joinedAt: new Date().toISOString().split("T")[0],
    };

    setMembers([...members, newMember]);
    setInviteEmail("");
    setShowInviteModal(false);
  };

  const handleRemove = (id: string) => {
    if (id !== "1") {
      setMembers(members.filter((m) => m.id !== id));
    }
  };

  const handleRoleChange = (id: string, newRole: "admin" | "manager" | "viewer") => {
    if (id !== "1") {
      setMembers(members.map((m) => (m.id === id ? { ...m, role: newRole } : m)));
    }
  };

  const statusColors: Record<string, string> = {
    active: "text-emerald-300",
    pending: "text-amber-300",
    inactive: "text-slate-500",
  };

  const statusBg: Record<string, string> = {
    active: "bg-emerald-500/10",
    pending: "bg-amber-500/10",
    inactive: "bg-slate-500/10",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Team Members</h2>
          <p className="text-slate-400 text-sm mt-1">
            Manage team access and roles ({members.length} member{members.length !== 1 ? "s" : ""})
          </p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="button button-pulse flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Invite Member
        </button>
      </div>

      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="glass-card p-8 rounded-2xl max-w-md w-full mx-4 border border-[rgba(99,102,241,0.3)]">
            <h3 className="text-xl font-bold text-white mb-4">Invite Team Member</h3>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Email Address</label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="member@hospital.edu"
                  className="w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(99,102,241,0.2)] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[rgba(99,102,241,0.5)]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as "manager" | "viewer")}
                  className="w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(99,102,241,0.2)] rounded-lg text-white focus:outline-none focus:border-[rgba(99,102,241,0.5)]"
                >
                  <option value="manager">Manager (manage courses & track progress)</option>
                  <option value="viewer">Viewer (read-only access)</option>
                </select>
                <p className="text-xs text-slate-400 mt-2">{roleDescriptions[inviteRole]}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowInviteModal(false)}
                className="button button-outline flex-1"
              >
                Cancel
              </button>
              <button onClick={handleInvite} className="button button-pulse flex-1">
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="glass-card rounded-2xl border border-[rgba(99,102,241,0.2)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(99,102,241,0.1)] bg-[rgba(99,102,241,0.05)]">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-[0.1em]">
                  Member
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-[0.1em]">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-[0.1em]">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-[0.1em]">
                  Joined
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-300 uppercase tracking-[0.1em]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr
                  key={member.id}
                  className="border-b border-[rgba(99,102,241,0.08)] hover:bg-[rgba(99,102,241,0.05)] transition-colors"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-300 flex items-center justify-center text-white font-bold text-sm">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{member.name}</div>
                        <div className="text-xs text-slate-500">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    {member.id === "1" ? (
                      <div className="flex items-center gap-2 text-sm font-semibold text-white">
                        {roleIcons[member.role]}
                        {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                      </div>
                    ) : (
                      <select
                        value={member.role}
                        onChange={(e) =>
                          handleRoleChange(member.id, e.target.value as "admin" | "manager" | "viewer")
                        }
                        className="text-sm font-semibold text-white bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.2)] rounded px-2 py-1 focus:outline-none focus:border-[rgba(99,102,241,0.5)]"
                      >
                        <option value="manager">Manager</option>
                        <option value="viewer">Viewer</option>
                      </select>
                    )}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          member.status === "active"
                            ? "bg-emerald-500"
                            : member.status === "pending"
                              ? "bg-amber-500"
                              : "bg-slate-500"
                        }`}
                      />
                      <span
                        className={`text-xs font-semibold capitalize ${statusColors[member.status]}`}
                      >
                        {member.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-400">{member.joinedAt}</td>
                  <td className="px-6 py-5 text-right">
                    {member.id !== "1" && (
                      <button
                        onClick={() => handleRemove(member.id)}
                        className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            icon: Shield,
            title: "Admin",
            desc: "Full access including billing and settings",
          },
          {
            icon: Edit2,
            title: "Manager",
            desc: "Manage courses and track learner progress",
          },
          {
            icon: Eye,
            title: "Viewer",
            desc: "Read-only access to reports and dashboard",
          },
        ].map((role, idx) => {
          const Icon = role.icon;
          return (
            <div key={idx} className="bg-[rgba(99,102,241,0.05)] border border-[rgba(99,102,241,0.1)] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-5 h-5 text-indigo-300" />
                <div className="font-semibold text-white text-sm">{role.title}</div>
              </div>
              <p className="text-xs text-slate-400">{role.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
