"use client";

import { useState, type FormEvent } from "react";
import { CONTACT_PURPOSES, type ContactPurpose } from "@/lib/contact-purposes";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [purpose, setPurpose] = useState<ContactPurpose>("general");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, purpose }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setPurpose("general");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <p className="text-body text-ink-muted">
        Thanks - we&apos;ve got your message and will get back to you soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
      <input
        type="text"
        required
        aria-label="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        disabled={status === "loading"}
        className="w-full border border-border bg-background px-3.5 py-2.5 text-caption text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-accent disabled:opacity-60"
      />
      <input
        type="email"
        required
        aria-label="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        disabled={status === "loading"}
        className="w-full border border-border bg-background px-3.5 py-2.5 text-caption text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-accent disabled:opacity-60"
      />
      <select
        required
        aria-label="What's this about?"
        value={purpose}
        onChange={(e) => setPurpose(e.target.value as ContactPurpose)}
        disabled={status === "loading"}
        className="w-full border border-border bg-background px-3.5 py-2.5 text-caption text-ink outline-none transition-colors focus:border-accent disabled:opacity-60"
      >
        {CONTACT_PURPOSES.map((p) => (
          <option key={p.value} value={p.value}>
            {p.label}
          </option>
        ))}
      </select>
      <textarea
        required
        rows={3}
        aria-label="Your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="What's on your mind?"
        disabled={status === "loading"}
        className="w-full resize-none border border-border bg-background px-3.5 py-2.5 text-caption text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-accent disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="border border-accent bg-accent px-4 py-2.5 text-caption font-semibold uppercase tracking-wide text-[#1A1508] transition-colors hover:bg-accent-hover disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Send message"}
      </button>
      {error && <p className="text-caption text-danger">{error}</p>}
    </form>
  );
}
