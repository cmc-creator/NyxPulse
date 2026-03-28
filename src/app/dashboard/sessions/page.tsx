import Link from "next/link";
import { Calendar, Video, Users, MapPin, ArrowRight, CheckCircle } from "lucide-react";

const formats = [
  {
    icon: MapPin,
    title: "On-Site Live",
    description:
      "We come to your facility. Hands-on training with real equipment in your environment.",
    color: "from-violet-600 to-violet-400",
    glow: "rgba(124,58,237,0.3)",
  },
  {
    icon: Video,
    title: "Virtual Live",
    description:
      "Real-time instructor-led training via video conference. Interactive, not pre-recorded.",
    color: "from-cyan-600 to-cyan-400",
    glow: "rgba(6,182,212,0.3)",
  },
  {
    icon: Users,
    title: "Hybrid",
    description:
      "Remote participants join live as the instructor trains an on-site cohort simultaneously.",
    color: "from-amber-600 to-amber-400",
    glow: "rgba(217,119,6,0.3)",
  },
];

const steps = [
  "Fill out the booking form with your preferred training and dates",
  "Our team confirms availability and sends a calendar invite",
  "You'll receive a pre-training packet with preparation materials",
  "Attend your live or virtual session with a certified instructor",
  "Complete the post-training assessment and receive your certificate",
];

export default function SessionsPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Live Sessions</h1>
        <p className="text-slate-400 mt-1">
          Schedule and attend live or virtual training with certified instructors.
        </p>
      </div>

      {/* Upcoming — empty state */}
      <section>
        <h2 className="text-xl font-bold text-white mb-5">Upcoming Sessions</h2>
        <div className="glass-card p-10 text-center">
          <Calendar className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            No sessions booked yet
          </h3>
          <p className="text-slate-400 text-sm mb-6 max-w-sm mx-auto">
            Use the booking form to schedule a live or virtual training with one of
            our certified instructors.
          </p>
          <Link
            href="/contact"
            className="btn-primary inline-flex items-center gap-2"
          >
            Book a Session <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Delivery formats */}
      <section>
        <h2 className="text-xl font-bold text-white mb-5">Delivery Formats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {formats.map(({ icon: Icon, title, description, color, glow }) => (
            <div key={title} className="glass-card p-6">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4`}
                style={{ boxShadow: `0 0 20px ${glow}` }}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section>
        <h2 className="text-xl font-bold text-white mb-5">How It Works</h2>
        <div className="glass-card p-6 space-y-4">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-7 h-7 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center flex-shrink-0 text-violet-400 text-xs font-bold">
                {i + 1}
              </div>
              <div className="flex-1">
                <p className="text-slate-300 text-sm leading-relaxed">{step}</p>
              </div>
              {i < steps.length - 1 && (
                <CheckCircle className="w-4 h-4 text-slate-700 mt-0.5 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="glass-card p-6 border border-violet-500/20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-semibold text-white mb-1">Ready to book?</h3>
            <p className="text-slate-400 text-sm">
              Contact us to discuss dates, group size, and which trainings are right
              for your team.
            </p>
          </div>
          <Link
            href="/contact"
            className="btn-primary flex-shrink-0 inline-flex items-center gap-2"
          >
            Book Training <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
