// Works around a Next.js static-export bug on Windows only.
//
// Next writes per-segment prefetch files as `__next.<a>.<b>.__PAGE__.txt`,
// building the name by replacing "/" with "." in a path made by
// path.relative() - which on Windows uses "\" instead. The backslashes
// survive, so the files land in nested folders (`__next.a\b\__PAGE__.txt`)
// and the client's prefetch requests 404. This flattens them back into the
// names Next requests. On Linux/macOS (and in CI) it does nothing.
import { readdirSync, renameSync, rmSync } from "node:fs";
import path from "node:path";

if (process.platform !== "win32") process.exit(0);

const OUT = path.resolve(import.meta.dirname, "../out");

function filesUnder(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory()
      ? filesUnder(path.join(dir, e.name))
      : [path.join(dir, e.name)],
  );
}

function fix(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    if (!entry.name.startsWith("__next.")) {
      fix(full);
      continue;
    }
    for (const file of filesUnder(full)) {
      const parts = path.relative(full, file).split(path.sep);
      renameSync(file, path.join(dir, [entry.name, ...parts].join(".")));
    }
    rmSync(full, { recursive: true });
  }
}

fix(OUT);
