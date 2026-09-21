import { NextRequest, NextResponse } from "next/server";
import { addContactMessage, isContactPurpose } from "@/lib/contact-store";
import { sendContactNotification } from "@/lib/resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LENGTH = 4000;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const { name, email, message, purpose } = (body ?? {}) as {
    name?: string;
    email?: string;
    message?: string;
    purpose?: string;
  };

  if (!name || typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Enter your name." }, { status: 400 });
  }
  if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    );
  }
  if (!message || typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ error: "Enter a message." }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: "Message is too long." },
      { status: 400 },
    );
  }
  if (!isContactPurpose(purpose)) {
    return NextResponse.json(
      { error: "Select what this is about." },
      { status: 400 },
    );
  }

  const entry = await addContactMessage(name, email, message, purpose);

  // Fire-and-forget — don't block the response on the email provider.
  void sendContactNotification({
    name: entry.name,
    email: entry.email,
    message: entry.message,
    purpose: entry.purpose,
  });

  return NextResponse.json({ ok: true });
}
