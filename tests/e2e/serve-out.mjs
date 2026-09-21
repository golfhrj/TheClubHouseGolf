// Serves out/ under /TheClubHouseGolf/ - the same sub-path GitHub Pages
// uses - so E2E tests exercise the real deployed URL structure.
import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import path from "node:path";

const OUT = path.resolve(import.meta.dirname, "../../out");
const BASE = "/TheClubHouseGolf";
const PORT = Number(process.env.PORT ?? 4173);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

createServer((req, res) => {
  const url = decodeURIComponent((req.url ?? "/").split("?")[0]);
  if (!url.startsWith(`${BASE}/`)) {
    res.writeHead(404).end();
    return;
  }
  let file = path.join(OUT, url.slice(BASE.length));
  if (!file.startsWith(OUT)) {
    res.writeHead(403).end();
    return;
  }
  if (existsSync(file) && statSync(file).isDirectory())
    file = path.join(file, "index.html");
  if (!existsSync(file)) {
    res.writeHead(404, { "Content-Type": TYPES[".html"] });
    createReadStream(path.join(OUT, "404.html")).pipe(res);
    return;
  }
  res.writeHead(200, {
    "Content-Type": TYPES[path.extname(file)] ?? "application/octet-stream",
  });
  createReadStream(file).pipe(res);
}).listen(PORT, () =>
  console.log(`Serving out/ at http://localhost:${PORT}${BASE}/`),
);
