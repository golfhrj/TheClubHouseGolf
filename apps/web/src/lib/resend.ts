import { Resend } from "resend";
import { render } from "@react-email/components";
import { WaitlistConfirmationEmail } from "@/emails/waitlist-confirmation";
import { siteUrl } from "@/lib/site";
import { CONTACT_PURPOSES, type ContactPurpose } from "@/lib/contact-purposes";

const PARTNERSHIP_INBOX = "zach@chgolfco.com";

function purposeLabel(purpose: ContactPurpose): string {
  return CONTACT_PURPOSES.find((p) => p.value === purpose)?.label ?? purpose;
}

/**
 * Wraps Resend so the rest of the app never has to check "is this configured?"
 * itself. Without RESEND_API_KEY set, sends are silently skipped (and logged)
 * so local dev / early testing works before real credentials exist.
 */

const apiKey = process.env.RESEND_API_KEY;
const fromEmail =
  process.env.RESEND_FROM_EMAIL ?? "Clubhouse Golf <onboarding@resend.dev>";
// Where "someone submitted the contact form" notifications land. Falls back
// to the sender address itself (Resend's dev domain only delivers to the
// account's own email anyway, so this is a reasonable default either way).
const adminInbox =
  process.env.ADMIN_NOTIFICATION_EMAIL ??
  fromEmail.match(/<(.+)>/)?.[1] ??
  fromEmail;

const client = apiKey ? new Resend(apiKey) : null;

export async function sendWaitlistConfirmation(toEmail: string): Promise<void> {
  if (!client) {
    console.warn(
      `[resend] RESEND_API_KEY not set — skipping confirmation email to ${toEmail}. ` +
        "Run `npx resend-cli login` (or add RESEND_API_KEY to .env.local) to enable sending.",
    );
    return;
  }

  try {
    const html = await render(
      WaitlistConfirmationEmail({ siteUrl: siteUrl() }),
    );

    await client.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: "You're on the Clubhouse Golf waitlist",
      html,
    });
  } catch (err) {
    console.error("[resend] Failed to send waitlist confirmation:", err);
  }
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  message: string;
  purpose: ContactPurpose;
}): Promise<void> {
  if (!client) {
    console.warn(
      "[resend] RESEND_API_KEY not set — skipping contact notification email. " +
        "The message is still saved and visible in /admin/messages.",
    );
    return;
  }

  // Partnership enquiries go straight to Zach rather than the general inbox.
  const to = data.purpose === "partnership" ? PARTNERSHIP_INBOX : adminInbox;

  try {
    await client.emails.send({
      from: fromEmail,
      to,
      replyTo: data.email,
      subject: `New ${purposeLabel(data.purpose).toLowerCase()} enquiry from ${data.name}`,
      html: `
        <div style="font-family:'Helvetica Neue',Arial,sans-serif;background:#F5F1E7;padding:32px;color:#1A2420;">
          <p style="letter-spacing:2px;text-transform:uppercase;font-size:11px;color:#A97F2C;margin:0 0 16px;font-weight:700;">Clubhouse Golf &middot; New enquiry</p>
          <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin:0 0 20px;">
            <tr><td style="padding:0 0 10px;">
              <p style="font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#5C665F;margin:0 0 2px;">Purpose</p>
              <p style="font-size:15px;color:#0B2F24;font-weight:600;margin:0;">${escapeHtml(purposeLabel(data.purpose))}</p>
            </td></tr>
            <tr><td style="padding:0 0 10px;">
              <p style="font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#5C665F;margin:0 0 2px;">Name</p>
              <p style="font-size:15px;color:#0B2F24;font-weight:600;margin:0;">${escapeHtml(data.name)}</p>
            </td></tr>
            <tr><td style="padding:0 0 10px;">
              <p style="font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#5C665F;margin:0 0 2px;">Email</p>
              <p style="font-size:15px;color:#0B2F24;font-weight:600;margin:0;">${escapeHtml(data.email)}</p>
            </td></tr>
          </table>
          <p style="font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#5C665F;margin:0 0 6px;">Message</p>
          <p style="font-size:15px;line-height:1.6;white-space:pre-wrap;margin:0 0 20px;">${escapeHtml(data.message)}</p>
          <p style="font-size:13px;color:#5C665F;margin:0;">Reply to this email and it goes straight back to them.</p>
        </div>
      `,
    });
  } catch (err) {
    console.error("[resend] Failed to send contact notification:", err);
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
