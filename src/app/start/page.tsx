"use client";

import { useState } from "react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwCdJP6eF60YCRfFA1c5o86-kYxzO_uq3VlbfLL80Fwvu9deuXxj3xCoxOQ9c5vbG_6/exec";

const DIFFICULTIES = ["easy", "medium", "hard"] as const;
type Difficulty = (typeof DIFFICULTIES)[number];

export default function StartPage() {
  const [groupName, setGroupName] = useState("");
  const [playersText, setPlayersText] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const playerList = playersText
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);

    if (!groupName || playerList.length === 0) {
      setMessage("❌ Please enter a group name and at least one player.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({
          type: "start",
          group: groupName,
          players: playersText,
          difficulty,
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      setMessage(
        `✅ Start time recorded for group "${groupName}" at ${new Date().toLocaleTimeString()}!`,
      );

      setGroupName("");
      setPlayersText("");
      setDifficulty("medium");
    } catch (err) {
      console.error(err);
      setMessage("❌ Could not record start. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-900 px-6 py-16 text-white">
      <div className="container mx-auto max-w-xl rounded-xl bg-gray-800 p-8 shadow-lg">
        <h1 className="mb-2 text-4xl font-black text-cyan-400">
          Escape Room Start
        </h1>
        <p className="mb-6 text-sm text-white/80">
          Don&apos;t forget your group name, you&apos;ll need it for the finish.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-white">
              Group Name
            </label>
            <input
              className="w-full rounded-lg bg-white/10 px-4 py-2 text-white placeholder-white/60 outline-none"
              placeholder="Enter your group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Difficulty
            </label>
            <div className="flex gap-2">
              {DIFFICULTIES.map((d) => {
                const selectedClass =
                  d === "easy"
                    ? "bg-emerald-500 text-white ring-2 ring-emerald-400 ring-offset-2 ring-offset-gray-800"
                    : d === "medium"
                      ? "bg-orange-500 text-white ring-2 ring-orange-400 ring-offset-2 ring-offset-gray-800"
                      : "bg-red-500 text-white ring-2 ring-red-400 ring-offset-2 ring-offset-gray-800";
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDifficulty(d)}
                    className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold capitalize transition ${
                      difficulty === d ? selectedClass : "bg-white/10 text-white/80 hover:bg-white/20"
                    }`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-white">
              Players (comma‑separated)
            </label>
            <textarea
              className="w-full rounded-lg bg-white/10 px-4 py-2 text-white placeholder-white/60 outline-none"
              rows={3}
              placeholder="Ex. anikachu, avogadro, habubu"
              value={playersText}
              onChange={(e) => setPlayersText(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-cyan-500 px-4 py-2 text-lg font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Saving..." : "Start"}
          </button>
        </form>

        {message && <p className="mt-4 text-sm text-white/90">{message}</p>}
      </div>
    </main>
  );
}
