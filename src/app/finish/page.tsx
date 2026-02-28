"use client";

import { useState } from "react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwCdJP6eF60YCRfFA1c5o86-kYxzO_uq3VlbfLL80Fwvu9deuXxj3xCoxOQ9c5vbG_6/exec";

const GOOGLE_JSON_URL =
  "https://docs.google.com/spreadsheets/d/1Weik18OF3ZkT6P-Jdw3utyCqzU3wVK-Ph6yW5eUKqjo/gviz/tq?tqx=out:json";

export default function FinishPage() {
  const [groupName, setGroupName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function findBestMatchingGroup(input: string): Promise<string | null> {
    try {
      const res = await fetch(GOOGLE_JSON_URL, { cache: "no-store" });
      const text = await res.text();
      const json = JSON.parse(text.substring(47).slice(0, -2));
      const rows = (json.table.rows || []) as {
        c: { v: string | number | null }[];
      }[];

      const candidates = rows
        .map((r) => (r.c[0]?.v as string | undefined)?.trim())
        .filter((v): v is string => !!v);

      const inputLower = input.trim().toLowerCase();

      const exact = candidates.find(
        (name) => name.toLowerCase() === inputLower,
      );
      if (exact) return exact;

      let best: string | null = null;
      let bestScore = 0;

      for (const name of candidates) {
        const lower = name.toLowerCase();
        if (lower.includes(inputLower) || inputLower.includes(lower)) {
          const score =
            Math.min(lower.length, inputLower.length) /
            Math.max(lower.length, inputLower.length);
          if (score > bestScore) {
            bestScore = score;
            best = name;
          }
          continue;
        }

        let prefix = 0;
        const maxLen = Math.min(lower.length, inputLower.length);
        for (let i = 0; i < maxLen; i++) {
          if (lower[i] === inputLower[i]) prefix++;
          else break;
        }
        const score = prefix / Math.max(lower.length, inputLower.length);
        if (score > bestScore) {
          bestScore = score;
          best = name;
        }
      }

      // Only suggest if confidence is reasonable
      if (best && bestScore >= 0.5) {
        const confirmed = window.confirm(`Did you mean "${best}"?`);
        if (confirmed) return best;
      }

      return null;
    } catch (err) {
      console.error("Failed to fetch groups for matching", err);
      return null;
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const trimmedName = groupName.trim();
      if (!trimmedName) {
        setMessage("❌ Please enter your group name.");
        setLoading(false);
        return;
      }

      // Try to match the entered name to an existing group from the sheet
      const matched = await findBestMatchingGroup(trimmedName);
      if (!matched) {
        setMessage(
          "❌ Could not find a matching group. Please check your group name spelling.",
        );
        setLoading(false);
        return;
      }

      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({
          type: "finish",
          group: matched,
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      setMessage("✅ Finish time recorded!");
      setGroupName("");
    } catch (err) {
      console.error(err);
      setMessage("❌ Could not record finish. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-900 px-6 py-16 text-white">
      <div className="container mx-auto max-w-xl rounded-xl bg-gray-800 p-8 shadow-lg">
        <h1 className="mb-6 text-4xl font-black text-emerald-400">
          Escape Room Finish
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-white">
              Group Name
            </label>
            <p className="mb-2 text-xs text-white/60">
              Use the same group name you used when you started. We&apos;ll
              suggest similar names if needed.
            </p>
            <input
              className="w-full rounded-lg bg-white/10 px-4 py-2 text-white placeholder-white/60 outline-none"
              placeholder="Enter your group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-500 px-4 py-2 text-lg font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Saving..." : "Finish"}
          </button>
        </form>

        {message && <p className="mt-4 text-sm text-white/90">{message}</p>}
      </div>
    </main>
  );
}
