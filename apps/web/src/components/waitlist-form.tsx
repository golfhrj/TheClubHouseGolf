"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setMessage(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "coming-soon" }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }
      setStatus("success");
      setMessage(
        data.alreadyOnList
          ? "You're already on the list - we'll email you the day we're live."
          : "You're on the list - we'll email you the day we're live.",
      );
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-2 sm:flex-row sm:gap-2"
      >
        <input
          type="email"
          required
          aria-label="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          disabled={status === "loading"}
          className="w-full rounded-md border border-border bg-surface px-4 py-3 text-caption text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-accent disabled:opacity-60 sm:text-body"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full whitespace-nowrap rounded-md bg-accent px-6 py-3 text-caption font-semibold text-black transition-colors hover:bg-accent-hover disabled:opacity-60 sm:w-auto sm:text-body"
        >
          {status === "loading" ? "Joining…" : "Notify me"}
        </button>
      </form>
      <p
        className={`mt-3 text-caption ${
          status === "error" ? "text-danger" : "text-ink-faint"
        }`}
      >
        {message ?? "We'll email you the moment the new site goes live."}
      </p>
    </div>
  );
}
