"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { BrandMark } from "@/components/brand-mark";

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Login failed.");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl border border-border-subtle bg-surface p-8 shadow-raised"
      >
        <div className="flex items-center gap-2">
          <BrandMark className="h-5 w-5 text-accent" />
          <p className="text-eyebrow uppercase tracking-widest text-accent">Clubhouse Golf</p>
        </div>
        <h1 className="mt-3 font-display text-h2 text-ink">Admin</h1>
        <p className="mt-2 text-body text-ink-muted">
          Enter the admin password to view the waitlist.
        </p>

        <input
          type="password"
          required
          aria-label="Admin password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mt-6 w-full rounded-md border border-border bg-surface px-4 py-3 text-body text-ink outline-none transition-colors focus:border-accent"
        />

        {error && <p className="mt-3 text-caption text-danger">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-5 w-full rounded-md bg-accent px-6 py-3 text-body font-semibold text-black transition-colors hover:bg-accent-hover disabled:opacity-60"
        >
          {loading ? "Checking…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
