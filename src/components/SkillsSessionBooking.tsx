"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { courses } from "@/lib/courses";
import { Calendar, Loader2, CheckCircle } from "lucide-react";

export default function SkillsSessionBooking() {
  const searchParams = useSearchParams();
  const presetCourse = searchParams.get("course") ?? "";
  const arcCourses = useMemo(
    () => courses.filter((course) => course.americanRedCrossPathway),
    []
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [courseSlug, setCourseSlug] = useState(
    arcCourses.some((c) => c.slug === presetCourse) ? presetCourse : arcCourses[0]?.slug ?? ""
  );
  const [preferredDate, setPreferredDate] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const selected = arcCourses.find((course) => course.slug === courseSlug);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const courseTitle = selected?.title ?? courseSlug;
    const message = [
      "Skills session booking request",
      `Course: ${courseTitle}`,
      preferredDate ? `Preferred date/time: ${preferredDate}` : "Preferred date/time: flexible",
      notes ? `Notes: ${notes}` : null,
      "Learner already understands NyxPulse certificate is separate from optional Red Cross digital certificate.",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          trainingType: [courseTitle],
          format: "Live / Hybrid skills session",
          message,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not submit booking request.");
        return;
      }
      setSuccess(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="glass-card p-8 text-center">
        <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Request received</h3>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          We&apos;ll follow up to confirm your skills session with Jeremy. Your NyxPulse
          certificate remains available in Certificates even before the skills session.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="glass-card p-6 sm:p-8 space-y-5">
      <div className="flex items-start gap-3 mb-2">
        <Calendar className="w-5 h-5 text-cyan-300 mt-0.5" />
        <div>
          <h2 className="text-white font-semibold text-lg">Book a skills session</h2>
          <p className="text-slate-400 text-sm">
            Request an instructor-led session. Jeremy may teach through NyxPulse or another
            authorized organization depending on the certification path you need.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="block text-sm">
          <span className="text-slate-400 mb-1.5 block">Your name</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2.5 text-white"
          />
        </label>
        <label className="block text-sm">
          <span className="text-slate-400 mb-1.5 block">Email</span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2.5 text-white"
          />
        </label>
      </div>

      <label className="block text-sm">
        <span className="text-slate-400 mb-1.5 block">Training</span>
        <select
          required
          value={courseSlug}
          onChange={(e) => setCourseSlug(e.target.value)}
          className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2.5 text-white"
        >
          {arcCourses.map((course) => (
            <option key={course.slug} value={course.slug}>
              {course.title}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm">
        <span className="text-slate-400 mb-1.5 block">Preferred date / time</span>
        <input
          value={preferredDate}
          onChange={(e) => setPreferredDate(e.target.value)}
          placeholder="e.g. Next Tuesday afternoon, or flexible"
          className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2.5 text-white"
        />
      </label>

      <label className="block text-sm">
        <span className="text-slate-400 mb-1.5 block">Notes</span>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          placeholder="Group size, location, Red Cross card needed, etc."
          className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2.5 text-white"
        />
      </label>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary inline-flex items-center gap-2 disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Calendar className="w-4 h-4" /> Request session
          </>
        )}
      </button>
    </form>
  );
}
