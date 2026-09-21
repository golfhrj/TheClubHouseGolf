"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton({ className }: { className?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={
        className ??
        "rounded-md border border-border px-4 py-2 text-caption font-medium text-ink-muted transition-colors hover:border-ink-muted hover:text-ink disabled:opacity-60"
      }
    >
      Sign out
    </button>
  );
}
