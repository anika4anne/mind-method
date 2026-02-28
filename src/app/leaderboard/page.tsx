"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

type LeaderboardRow = {
  group: string;
  players: string;
  difficulty: string;
  minutes: string | number;
  durationSeconds: number; // for sorting by time
  points: number;
  status: string;
};

const DIFFICULTY_FILTERS = ["all", "easy", "medium", "hard"] as const;
type DifficultyFilter = (typeof DIFFICULTY_FILTERS)[number];

/** Convert raw time from sheet to total seconds for sorting */
function timeToSeconds(value: string | number | null | undefined): number {
  if (value == null || value === "") return Infinity;
  if (typeof value === "number") {
    if (value > 0 && value < 1) return Math.round(value * 24 * 60 * 60);
    return Math.round(value);
  }
  const s = String(value).trim();
  const match = s.match(/^(\d+):(\d{2})$/); // "8:33" or "12:05"
  if (match) return Number(match[1]) * 60 + Number(match[2]);
  const n = Number(s);
  return Number.isNaN(n) ? Infinity : n;
}

function pointsRowClass(points: number): string {
  if (points === 25)
    return "border-emerald-400/60 bg-gradient-to-br from-emerald-500/30 via-emerald-400/25 to-emerald-500/30 shadow-[0_0_24px_rgba(16,185,129,0.35)]";
  if (points === 50)
    return "border-orange-400/60 bg-gradient-to-br from-orange-500/30 via-orange-400/25 to-orange-500/30 shadow-[0_0_24px_rgba(249,115,22,0.35)]";
  if (points === 75)
    return "border-red-400/60 bg-gradient-to-br from-red-500/30 via-red-400/25 to-red-500/30 shadow-[0_0_24px_rgba(239,68,68,0.35)]";
  return "border-white/20 bg-white/10 shadow-[0_0_20px_rgba(148,163,184,0.4)]";
}

const GOOGLE_JSON_URL =
  "https://docs.google.com/spreadsheets/d/1Weik18OF3ZkT6P-Jdw3utyCqzU3wVK-Ph6yW5eUKqjo/gviz/tq?tqx=out:json";

function formatMinutes(value: string | number) {
  if (!value) return "-";
  return value.toString();
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>("all");

  const displayedRows = useMemo(() => {
    let list =
      difficultyFilter === "all"
        ? [...leaderboard]
        : leaderboard.filter(
            (r) => r.difficulty.toLowerCase() === difficultyFilter,
          );
    if (difficultyFilter !== "all") {
      list = [...list].sort((a, b) => a.durationSeconds - b.durationSeconds);
    } else {
      list = [...list].sort((a, b) => b.points - a.points);
    }
    return list;
  }, [leaderboard, difficultyFilter]);

  async function fetchLeaderboard() {
    try {
      setError(null);
      const res = await fetch(GOOGLE_JSON_URL, { cache: "no-store" });
      const text = await res.text();

      const json = JSON.parse(text.substring(47).slice(0, -2));
      const rows = (json.table.rows || []) as {
        c: { v: string | number | null }[];
      }[];

      const rawTime = (r: { c: { v: unknown }[] }) => r.c[5]?.v as string | number | null | undefined;
      const data: LeaderboardRow[] = rows
        .map((r) => ({
          group: (r.c[0]?.v as string) ?? "",
          players: (r.c[1]?.v as string) ?? "",
          difficulty: (r.c[2]?.v as string) ?? "",
          minutes: rawTime(r) ?? "-",
          durationSeconds: timeToSeconds(rawTime(r)),
          points: Number(r.c[6]?.v ?? 0),
          status: (r.c[7]?.v as string) ?? "",
        }))
        .filter((r) => r.status === "Finished" || r.status === "Completed")
        .sort((a, b) => b.points - a.points);

      setLeaderboard(data);
    } catch (err) {
      console.error("Failed to fetch leaderboard", err);
      setError("Could not load leaderboard. Please try again.");
    }
  }

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 3000); // refresh every 3 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="fixed inset-0 -z-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "url(/bg/2.svg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

      <div className="min-h-screen px-6 py-16">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mb-12 text-center"
          >
            <motion.h1
              variants={itemVariants}
              className="mb-4 text-5xl font-black tracking-tight text-white drop-shadow-[0_4px_32px_rgba(64,224,208,0.7)] sm:text-6xl"
            >
              Live Leaderboard 🏆
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mx-auto max-w-2xl text-lg text-white/85"
            >
              Scores update automatically every{" "}
              <span className="font-semibold text-cyan-300">3 seconds</span>. QR
              codes record each group's start and finish time.
            </motion.p>
          </motion.div>

          {error && (
            <div className="mb-6 rounded-2xl border border-red-400/40 bg-red-500/20 p-4 text-sm text-red-100">
              {error}
            </div>
          )}

          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {DIFFICULTY_FILTERS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDifficultyFilter(d)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold capitalize transition ${
                  difficultyFilter === d
                    ? "bg-cyan-500 text-white ring-2 ring-cyan-400 ring-offset-2 ring-offset-transparent"
                    : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
              >
                {d === "all" ? "All" : d}
              </button>
            ))}
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <div className="flex flex-col items-center gap-4">
              {displayedRows.map((row, index) => {
                const place = index + 1;

                const borderClass = pointsRowClass(row.points);
                let label = `#${place}`;
                let labelColor = "bg-white/20 text-white";
                const isPodium = place <= 3;
                const labelSize = isPodium ? "px-4 py-2 text-sm" : "px-3 py-1 text-xs";
                if (place === 1) {
                  label = "🥇 1st Place";
                  labelColor = "bg-black/30 text-yellow-200";
                } else if (place === 2) {
                  label = "🥈 2nd Place";
                  labelColor = "bg-black/30 text-slate-100";
                } else if (place === 3) {
                  label = "🥉 3rd Place";
                  labelColor = "bg-black/30 text-amber-100";
                }

                return (
                  <motion.div
                    key={row.group + row.points}
                    variants={itemVariants}
                    className="w-full"
                  >
                    <div
                      className={`relative flex min-h-[5.5rem] items-center justify-between overflow-hidden rounded-3xl border-4 px-6 py-5 backdrop-blur-xl ${borderClass}`}
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className={`rounded-full font-semibold ${labelSize} ${labelColor}`}
                        >
                          {label}
                        </span>
                        <div className="min-w-0 flex-1">
                          <h2 className="text-xl font-black text-white">
                            {row.group}
                          </h2>
                          <p className="mt-0.5 text-sm text-white/80">
                            {row.players}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end text-white/90">
                        <span className="text-lg font-semibold">
                          Time: {formatMinutes(row.minutes)}
                        </span>
                        <span className="text-xs text-white/70">
                          {row.points} pts
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {displayedRows.length === 0 && !error && (
              <p className="text-center text-sm text-white/70">
                {difficultyFilter === "all"
                  ? "No completed groups yet. As soon as a group finishes, they'll appear here."
                  : `No completed groups on ${difficultyFilter} yet.`}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}
