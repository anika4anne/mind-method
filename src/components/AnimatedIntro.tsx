"use client";
import { useEffect, useState } from "react";

export default function AnimatedIntro({ onFinish }: { onFinish?: () => void }) {
  const [show, setShow] = useState(true);
  useEffect(() => {
    setShow(true);
  }, []);
  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      setShow(false);
      if (onFinish) onFinish();
    }, 5500);
    return () => clearTimeout(timer);
  }, [show, onFinish]);
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a1747]">
      {" "}
      <svg
        className="animate-spine-left absolute top-1/2 left-0 h-96 w-48 -translate-y-1/2"
        viewBox="0 0 60 240"
        fill="none"
      >
        <path
          d="M30 0 Q10 60 30 120 Q50 180 30 240"
          stroke="#7dd3fc"
          strokeWidth="8"
          fill="none"
        />
      </svg>
      <svg
        className="animate-spine-right absolute top-1/2 right-0 h-96 w-48 -translate-y-1/2"
        viewBox="0 0 60 240"
        fill="none"
      >
        <path
          d="M30 0 Q50 60 30 120 Q10 180 30 240"
          stroke="#a5b4fc"
          strokeWidth="8"
          fill="none"
        />
      </svg>
      <svg
        className="animate-brain-appear absolute top-1/2 left-1/2 h-[220px] w-[320px] -translate-x-1/2 -translate-y-1/2 opacity-0"
        viewBox="0 0 320 220"
        fill="none"
      >
        <ellipse
          cx="160"
          cy="110"
          rx="120"
          ry="90"
          fill="url(#brainGradient)"
        />
        <path
          d="M80 110 Q100 60 160 80 Q220 100 240 60"
          stroke="#7dd3fc"
          strokeWidth="8"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M100 140 Q120 180 160 160 Q200 140 220 180"
          stroke="#a5b4fc"
          strokeWidth="8"
          fill="none"
          opacity="0.7"
        />
        <defs>
          <radialGradient
            id="brainGradient"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="translate(160 110) scale(120 90)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#a5b4fc" />
            <stop offset="1" stopColor="#38bdf8" />
          </radialGradient>
        </defs>
      </svg>
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className={`animate-confetti-burst absolute h-4 w-4 rounded-full opacity-0 animate-confetti-burst-${i}`}
            style={{ background: `hsl(${i * 20},80%,70%)` }}
          />
        ))}
      </div>
      <div className="animate-popup-fade absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white/90 px-10 py-8 text-center text-2xl font-bold text-blue-900 opacity-0 shadow-2xl">
        Welcome to <span className="text-blue-500">Mind & Method</span>
      </div>
    </div>
  );
}
