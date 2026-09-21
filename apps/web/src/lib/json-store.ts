import { get, put } from "@vercel/blob";

/**
 * Minimal JSON store backed by private Vercel Blob storage, shared by
 * waitlist-store.ts and contact-store.ts. Vercel's serverless functions
 * have a read-only filesystem in production, so this can't just write to a
 * local file (that throws EROFS and crashes the request) - Blob is the
 * simplest persistent store that needs no schema/migrations for this
 * "start small" phase. Access is private since these files hold real user
 * emails. Before this needs real querying, swap this module for a database
 * (Postgres/Supabase) - this file is the only place that touches storage.
 */
export function createJsonStore<T>(filename: string) {
  const pathname = `data/${filename}`;

  async function list(): Promise<T[]> {
    const result = await get(pathname, { access: "private", useCache: false });
    if (!result) return [];
    const text = await new Response(result.stream).text();
    return JSON.parse(text) as T[];
  }

  async function append(entry: T): Promise<void> {
    const entries = await list();
    entries.push(entry);
    await put(pathname, JSON.stringify(entries, null, 2), {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
  }

  return { list, append };
}
