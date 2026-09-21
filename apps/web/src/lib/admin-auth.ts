import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Simple signed-cookie session for the admin dashboard. Deliberately minimal
 * for the "start small" phase — one shared password (ADMIN_PASSWORD), no
 * per-user accounts. Swap for real auth (e.g. NextAuth) once there's more
 * than one admin.
 */

export const ADMIN_COOKIE = "chg_admin_session";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

function secret(): string {
  const s = process.env.ADMIN_SESSION_SECRET ?? process.env.ADMIN_PASSWORD;
  if (!s) {
    throw new Error(
      "ADMIN_PASSWORD (or ADMIN_SESSION_SECRET) is not set. Add it to .env.local before using /admin.",
    );
  }
  return s;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

export function checkPassword(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    throw new Error("ADMIN_PASSWORD is not set. Add it to .env.local before using /admin.");
  }
  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function createSessionToken(): string {
  const expiry = String(Date.now() + SESSION_TTL_MS);
  return `${expiry}.${sign(expiry)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const [expiry, signature] = token.split(".");
  if (!expiry || !signature) return false;
  if (Date.now() > Number(expiry)) return false;
  const expectedSig = sign(expiry);
  const a = Buffer.from(signature);
  const b = Buffer.from(expectedSig);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
