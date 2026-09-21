import { NextRequest, NextResponse } from "next/server";
import { addToWaitlist } from "@/lib/waitlist-store";
import { sendWaitlistConfirmation } from "@/lib/resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { email, source } = (body ?? {}) as { email?: string; source?: string };

  if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const { alreadyOnList } = await addToWaitlist(email, source ?? "unknown");

  if (!alreadyOnList) {
    // Fire-and-forget — don't block the response on the email provider.
    void sendWaitlistConfirmation(email.trim());
  }

  return NextResponse.json({ ok: true, alreadyOnList });
}
