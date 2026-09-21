import { createJsonStore } from "@/lib/json-store";
import {
  CONTACT_PURPOSES,
  isContactPurpose,
  type ContactPurpose,
} from "@/lib/contact-purposes";

export { CONTACT_PURPOSES, isContactPurpose, type ContactPurpose };

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  purpose: ContactPurpose;
  createdAt: string;
};

const store = createJsonStore<ContactMessage>("contact-messages.json");

export async function listContactMessages(): Promise<ContactMessage[]> {
  const entries = await store.list();
  return entries.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function addContactMessage(
  name: string,
  email: string,
  message: string,
  purpose: ContactPurpose,
): Promise<ContactMessage> {
  const entry: ContactMessage = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    purpose,
    createdAt: new Date().toISOString(),
  };
  await store.append(entry);
  return entry;
}
