"use client";
import { useState } from "react";

export default function UnsubscribePage() {
  const [status, setStatus] = useState<null | "success" | "error">(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("email") || "";
    }
    return "";
  });

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-cyan-100 to-teal-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
        <h1 className="mb-4 text-3xl font-bold text-cyan-700">Unsubscribe</h1>
        {status === "success" ? (
          <p className="font-semibold text-green-600">
            You have been unsubscribed.
          </p>
        ) : (
          <form onSubmit={handleUnsubscribe} className="space-y-4">
            <p className="mb-2">
              Are you sure you want to unsubscribe{email ? ` (${email})` : ""}?
            </p>
            <input
              type="email"
              className="w-full rounded border px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Your email"
              disabled={!!email}
            />
            <button
              type="submit"
              className="w-full rounded bg-red-500 py-2 font-bold text-white transition hover:bg-red-600"
              disabled={loading}
            >
              {loading ? "Unsubscribing..." : "Unsubscribe"}
            </button>
            {status === "error" && (
              <p className="font-semibold text-red-600">
                There was an error. Please try again.
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
