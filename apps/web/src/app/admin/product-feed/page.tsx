import Image from "next/image";
import { isAdminAuthed } from "@/lib/require-admin";
import { searchCjProducts, type CjSearchResult } from "@/lib/cj";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminLoginForm } from "@/app/admin/login-form";

export const dynamic = "force-dynamic";

const DEFAULT_KEYWORDS = ["golf"];

function formatPrice(price: { amount: string; currency: string } | null) {
  if (!price) return null;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
  }).format(Number(price.amount));
}

export default async function ProductFeedPage() {
  if (!(await isAdminAuthed())) {
    return <AdminLoginForm />;
  }

  let result: CjSearchResult | null = null;
  let error: string | null = null;
  try {
    result = await searchCjProducts(DEFAULT_KEYWORDS, 24);
  } catch (err) {
    error = err instanceof Error ? err.message : "Something went wrong.";
  }

  return (
    <AdminShell>
      <div className="mx-auto max-w-6xl">
        <p className="text-eyebrow uppercase tracking-widest text-accent">
          Proof of concept
        </p>
        <p className="mt-2 font-display text-h1 text-ink text-balance">
          Product feed - CJ Affiliate
        </p>
        <p className="mt-2 max-w-2xl text-body text-ink-muted">
          Live products pulled directly from CJ&apos;s Product Feed API,
          confirming the connection works end to end. This is a raw
          proof-of-concept view - not the storefront design, and not filtered to
          advertisers we&apos;ve joined yet. AWIN is the second supplier, not
          wired up yet.
        </p>

        {error && (
          <div className="mt-8 border border-danger/40 bg-danger/5 px-6 py-5 text-body text-danger">
            <p className="font-semibold">Couldn&apos;t reach CJ.</p>
            <p className="mt-1 text-caption">{error}</p>
          </div>
        )}

        {result && (
          <>
            <p className="mt-8 text-caption text-ink-faint">
              Showing {result.count} of {result.totalCount.toLocaleString()}{" "}
              matches for &ldquo;
              {DEFAULT_KEYWORDS.join(", ")}&rdquo; across CJ&apos;s network.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {result.products.map((p) => (
                <a
                  key={`${p.advertiserId}-${p.id}`}
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="group flex flex-col border border-border-subtle bg-surface transition-colors hover:border-accent/50"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-background">
                    {p.imageLink ? (
                      <Image
                        src={p.imageLink}
                        alt={p.title}
                        fill
                        unoptimized
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-caption text-ink-faint">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-3">
                    <p className="text-[0.65rem] uppercase tracking-wide text-accent">
                      {p.advertiserName}
                    </p>
                    <p className="mt-1 line-clamp-2 text-caption text-ink">
                      {p.title}
                    </p>
                    <p className="mt-auto pt-2 text-caption font-semibold text-ink">
                      {formatPrice(p.salePrice) ?? formatPrice(p.price) ?? "-"}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </AdminShell>
  );
}
