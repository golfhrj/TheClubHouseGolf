import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin-auth";
import { listWaitlist } from "@/lib/waitlist-store";

function toCsv(rows: { email: string; source: string; createdAt: string }[]): string {
  const header = "email,source,created_at";
  const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const lines = rows.map((r) => [r.email, r.source, r.createdAt].map(escape).join(","));
  return [header, ...lines].join("\n");
}

export async function GET(_req: NextRequest) {
  const jar = await cookies();
  const session = jar.get(ADMIN_COOKIE)?.value;
  if (!verifySessionToken(session)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const entries = await listWaitlist();
  const csv = toCsv(entries);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="clubhouse-golf-waitlist.csv"`,
    },
  });
}
