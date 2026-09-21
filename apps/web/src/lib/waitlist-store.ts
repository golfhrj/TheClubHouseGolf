import { createJsonStore } from "@/lib/json-store";

export type WaitlistEntry = {
  id: string;
  email: string;
  source: string;
  createdAt: string;
};

const store = createJsonStore<WaitlistEntry>("waitlist.json");

export async function listWaitlist(): Promise<WaitlistEntry[]> {
  const entries = await store.list();
  return entries.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function addToWaitlist(
  email: string,
  source: string,
): Promise<{ entry: WaitlistEntry; alreadyOnList: boolean }> {
  const entries = await store.list();

  const normalized = email.trim().toLowerCase();
  const existing = entries.find((e) => e.email.toLowerCase() === normalized);
  if (existing) {
    return { entry: existing, alreadyOnList: true };
  }

  const entry: WaitlistEntry = {
    id: crypto.randomUUID(),
    email: email.trim(),
    source,
    createdAt: new Date().toISOString(),
  };
  await store.append(entry);
  return { entry, alreadyOnList: false };
}

export async function waitlistCount(): Promise<number> {
  const entries = await listWaitlist();
  return entries.length;
}
