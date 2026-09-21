import { isAdminAuthed } from "@/lib/require-admin";
import { listContactMessages } from "@/lib/contact-store";
import { CONTACT_PURPOSES } from "@/lib/contact-purposes";

function purposeLabel(purpose: string): string {
  return CONTACT_PURPOSES.find((p) => p.value === purpose)?.label ?? purpose;
}
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminLoginForm } from "@/app/admin/login-form";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  if (!(await isAdminAuthed())) {
    return <AdminLoginForm />;
  }

  const messages = await listContactMessages();

  return (
    <AdminShell messageCount={messages.length}>
      <div className="mx-auto max-w-5xl">
        <p className="font-display text-h1 text-ink text-balance">Messages</p>
        <p className="mt-2 text-body text-ink-muted">
          Everything submitted through the contact form on the site.
        </p>

        <div className="mt-8 flex flex-col gap-4">
          {messages.length === 0 && (
            <div className="border border-border-subtle bg-surface px-6 py-12 text-center text-ink-faint">
              No messages yet.
            </div>
          )}
          {messages.map((m) => (
            <div
              key={m.id}
              className="border border-border-subtle bg-surface p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <p className="font-display text-h3 text-ink">{m.name}</p>
                  <a
                    href={`mailto:${m.email}`}
                    className="text-caption text-accent transition-colors hover:text-accent-hover"
                  >
                    {m.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="border border-accent/40 px-2 py-0.5 text-caption uppercase tracking-wide text-accent">
                    {purposeLabel(m.purpose)}
                  </span>
                  <p className="text-caption text-ink-faint">
                    {new Date(m.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <p className="mt-4 whitespace-pre-wrap text-body text-ink-muted">
                {m.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
