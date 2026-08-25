import type { LessonVideo } from "@/lib/courses/lesson-videos";

interface RedCrossVideoProps {
  video: LessonVideo;
  className?: string;
}

/**
 * Privacy-enhanced YouTube embed of an official American Red Cross training
 * video, with attribution. Content is streamed from the Red Cross channel —
 * never rehosted.
 */
export default function RedCrossVideo({ video, className }: RedCrossVideoProps) {
  return (
    <figure
      className={`overflow-hidden rounded-2xl border border-white/10 bg-black/40 ${className ?? ""}`}
    >
      <div className="relative aspect-video">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?rel=0`}
          title={`${video.title} — American Red Cross`}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full"
        />
      </div>
      <figcaption className="px-4 py-3 text-xs leading-relaxed text-slate-400 border-t border-white/10">
        <span className="block font-semibold text-red-300/90">
          American Red Cross · {video.title}
        </span>
        {video.caption && <span className="mt-1 block">{video.caption}</span>}
      </figcaption>
    </figure>
  );
}
