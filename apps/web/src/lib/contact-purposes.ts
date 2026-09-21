// Kept separate from contact-store.ts (which pulls in @vercel/blob, a
// server-only dependency) so the contact form - a client component - can
// import just this without leaking server code into the browser bundle.
export const CONTACT_PURPOSES = [
  { value: "general", label: "General enquiry" },
  { value: "partnership", label: "Partnerships" },
  { value: "press", label: "Press & media" },
  { value: "support", label: "Support" },
] as const;

export type ContactPurpose = (typeof CONTACT_PURPOSES)[number]["value"];

const PURPOSE_VALUES = new Set<string>(CONTACT_PURPOSES.map((p) => p.value));

export function isContactPurpose(value: unknown): value is ContactPurpose {
  return typeof value === "string" && PURPOSE_VALUES.has(value);
}
