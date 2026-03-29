"use client";

import { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2, Settings } from "lucide-react";

interface VideoHostingConfig {
  videoId: string;
  title: string;
  duration: number;
  thumbnail?: string;
  provider: "youtube" | "vimeo" | "custom";
  description?: string;
}

export default function VideoPlayer({ config }: { config: VideoHostingConfig }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((e) => console.error("Play error:", e));
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
        setIsFullscreen(false);
      } else {
        containerRef.current.requestFullscreen?.();
        setIsFullscreen(true);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const progress = (currentTime / config.duration) * 100 || 0;

  // Render based on provider
  if (config.provider === "youtube") {
    return (
      <div className="w-full rounded-2xl overflow-hidden glass-card">
        <div className="aspect-video bg-black relative">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${config.videoId}?rel=0&modestbranding=1`}
            title={config.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-2xl"
          />
        </div>
        {config.description && (
          <div className="p-6 border-t border-[rgba(99,102,241,0.1)]">
            <h3 className="text-lg font-bold text-white mb-2">{config.title}</h3>
            <p className="text-slate-400 text-sm">{config.description}</p>
          </div>
        )}
      </div>
    );
  }

  if (config.provider === "vimeo") {
    return (
      <div className="w-full rounded-2xl overflow-hidden glass-card">
        <div className="aspect-video bg-black relative">
          <iframe
            width="100%"
            height="100%"
            src={`https://player.vimeo.com/video/${config.videoId}`}
            title={config.title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="rounded-2xl"
          />
        </div>
        {config.description && (
          <div className="p-6 border-t border-[rgba(99,102,241,0.1)]">
            <h3 className="text-lg font-bold text-white mb-2">{config.title}</h3>
            <p className="text-slate-400 text-sm">{config.description}</p>
          </div>
        )}
      </div>
    );
  }

  // Custom HTML5 video player
  return (
    <div
      ref={containerRef}
      className="w-full rounded-2xl overflow-hidden glass-card bg-black"
    >
      <div className="aspect-video bg-black relative group">
        <video
          ref={videoRef}
          className="w-full h-full"
          poster={config.thumbnail}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={`/videos/${config.videoId}.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay controls */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-b from-black/30 to-black/50 flex flex-col justify-between p-4">
          <div className="flex items-center justify-between">
            <span className="text-white text-sm font-semibold">{config.title}</span>
            <button
              onClick={() => setCurrentTime(0)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="space-y-2">
            {/* Progress bar */}
            <div
              className="w-full h-1 bg-white/20 cursor-pointer rounded-full overflow-hidden"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const percent = (e.clientX - rect.left) / rect.width;
                const time = percent * config.duration;
                setCurrentTime(time);
                if (videoRef.current) videoRef.current.currentTime = time;
              }}
            >
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-indigo-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePlayPause}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </button>

                <button
                  onClick={toggleMute}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>

                <span className="text-xs ml-2">
                  {formatTime(currentTime)} / {formatTime(config.duration)}
                </span>
              </div>

              <button
                onClick={toggleFullscreen}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {config.description && (
        <div className="p-6 border-t border-[rgba(99,102,241,0.1)]">
          <h3 className="text-lg font-bold text-white mb-2">{config.title}</h3>
          <p className="text-slate-400 text-sm">{config.description}</p>
        </div>
      )}
    </div>
  );
}

/**
 * Video hosting reference
 * 
 * For production deployment, you can use:
 * 
 * 1. YouTube - Free, easy embedding, good for public content
 *    - Pros: No storage cost, automatic transcoding, analytics
 *    - Cons: Limited privacy control, ads on free tier
 * 
 * 2. Vimeo - Professional video hosting
 *    - Pros: Privacy controls, custom branding, enterprise features
 *    - Cons: Monthly cost ($75-600+)
 * 
 * 3. Bunny CDN Video Streaming - Cost-effective
 *    - Pros: Cheap ($0.01-0.03/GB), DRM support, live streaming
 *    - Cons: Requires setup, less integrated player
 * 
 * 4. AWS S3 + CloudFront - Maximum control
 *    - Pros: Cheapest for high volume, full control
 *    - Cons: Complex setup, requires security headers
 * 
 * 5. Mux - Developer-friendly
 *    - Pros: Great API, easy player, good DRM
 *    - Cons: $0.005/GB stored + variable play cost
 * 
 * Recommended for NyxPulse:
 * - Production: Bunny Video for cost-effectiveness (500+ learners)
 * - Mid-tier: Vimeo for features and support
 * - Early stage: YouTube for ease of use
 */
