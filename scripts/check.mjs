/**
 * Copy and rules scan for the built site (out/) and the source. Exits non-zero on any hit.
 * Run after `npm run build`. Patterns that would match this file itself are written as escapes.
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const out = path.join(root, "out");
const failures = [];
const fail = (msg) => failures.push(msg);

const walk = (dir, filter = () => true) => {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    if (d.isDirectory()) return ["node_modules", ".git", ".next"].includes(d.name) ? [] : walk(p, filter);
    return filter(p) ? [p] : [];
  });
};
const textExt = /\.(html|txt|xml|js|mjs|ts|tsx|css|json|md|svg|yml|yaml)$/;
const read = (p) => fs.readFileSync(p, "utf8");
const rel = (p) => path.relative(root, p);
const decode = (s) =>
  s
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
const visibleText = (html) =>
  decode(
    html
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<style[\s\S]*?<\/style>/g, " ")
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " "),
  );

if (!fs.existsSync(out)) {
  console.error("out/ is missing: run npm run build first");
  process.exit(1);
}
const outFiles = walk(out, (p) => textExt.test(p));
const htmlFiles = walk(out, (p) => p.endsWith(".html"));
const sourceDirs = ["app", "components", "lib", "public", ".github"].map((d) => path.join(root, d));
const sourceFiles = [
  ...sourceDirs.flatMap((d) => walk(d, (p) => textExt.test(p))),
  ...["README.md", "package.json", "next.config.ts"].map((f) => path.join(root, f)).filter((f) => fs.existsSync(f)),
];
const scriptFiles = walk(path.join(root, "scripts"), (p) => textExt.test(p));

// 1. No em or en dashes anywhere (built output, source, and this script).
const dashes = /[\u2014\u2013]/;
for (const f of [...outFiles, ...sourceFiles, ...scriptFiles]) if (dashes.test(read(f))) fail(`dash character in ${rel(f)}`);

// 2. Forbidden claims.
const forbidden = /years in business|years of experience|since 19[0-9]{2}|since 20[0-9]{2}|designed by|homes served|roofs installed|4\.9/i;
for (const f of [...outFiles, ...sourceFiles]) {
  const m = read(f).match(forbidden);
  if (m) fail(`forbidden phrase "${m[0]}" in ${rel(f)}`);
}

// 3. Phones: only (555) 555-0142 and tel:+15555550142; never a 911 link.
const phoneRe = /\(?\b[0-9]{3}\)?[ .-]?[0-9]{3}[ .-][0-9]{4}\b/g;
for (const f of outFiles) {
  const s = read(f);
  for (const m of s.match(phoneRe) ?? []) if (!/555\D{0,2}555\D?0142/.test(m)) fail(`other phone number "${m}" in ${rel(f)}`);
  // Links live in the HTML and the page payloads (.txt); framework JS has React's own "tel" input-type key.
  if (/\.(html|txt)$/.test(f))
    for (const m of s.match(/tel:[^"'\s)\\]*/g) ?? []) if (m !== "tel:+15555550142") fail(`other tel link "${m}" in ${rel(f)}`);
  if (/tel:911/.test(s)) fail(`tel:911 in ${rel(f)}`);
}

// 4. No street addresses or postal fields.
const street = /\b[0-9]{2,5} [A-Z][a-z]+ (St|Street|Ave|Avenue|Blvd|Rd|Road|Dr|Drive|Ln|Lane|Way|Pkwy|Ct)\b/;
for (const f of [...outFiles, ...sourceFiles]) if (street.test(read(f))) fail(`street address pattern in ${rel(f)}`);
const postal = new RegExp(['"address"', "street" + "Address", "postal" + "Code"].join("|"));
for (const f of outFiles) if (postal.test(read(f))) fail(`address field in ${rel(f)}`);

// 5. No payment code, and forms only go to the demo page.
// Whole words, so content hashes in font filenames don't count. The deploy workflow (GitHub's own actions) is skipped.
const pay = new RegExp(`\\b(${["st" + "ripe", "pay" + "pal", "square" + "up", "check" + "out", "card " + "number", "c" + "vc"].join("|")})\\b`, "i");
for (const f of [...outFiles, ...sourceFiles].filter((p) => !p.includes(`${path.sep}.github${path.sep}`))) {
  const m = read(f).match(pay);
  if (m) fail(`payment term "${m[0]}" in ${rel(f)}`);
}
for (const f of htmlFiles) {
  for (const m of read(f).match(/action="[^"]*"/g) ?? []) if (m !== 'action="/strathvane/demo-sent/"') fail(`form ${m} in ${rel(f)}`);
}
for (const f of sourceFiles.filter((p) => /\.(ts|tsx)$/.test(p))) {
  if (/fetch\(|XMLHttpRequest|sendBeacon/.test(read(f))) fail(`network call in ${rel(f)}`);
}

// 6. Out-of-scope pages and their copy.
for (const d of ["work", "about", "contact"]) if (fs.existsSync(path.join(out, d))) fail(`out/${d} should not exist`);
for (const f of htmlFiles) if (/Our Roofing Work|Roofing Crew You Can Reach|Contact Strathvane/.test(read(f))) fail(`out-of-scope copy in ${rel(f)}`);

// 7. Concept labeling on every page.
const conceptBar =
  "Concept project: Strathvane is a fictional Colorado roofing contractor, made to show what a roofing contractor site can do. It's not a real company, and it isn't connected to any other business using the name.";
const footerNote =
  "Concept project: Strathvane is a fictional company designed as a portfolio piece. Prices, reviews, license numbers, storm data, and photos are illustrative. Not affiliated with any other business named Strathvane.";
for (const f of htmlFiles) {
  const t = visibleText(read(f));
  if (!t.includes(conceptBar)) fail(`concept bar missing in ${rel(f)}`);
  if (!t.includes("Concept project")) fail(`"Concept project" badge missing in ${rel(f)}`);
  if (!t.includes(footerNote)) fail(`footer concept note missing in ${rel(f)}`);
}

// 8. Brand tokens live in one place.
const tokenFiles = ["app/globals.css", "lib/brand.ts", "app/icon.svg", "components/BrandMark.tsx"];
for (const f of ["app", "components", "lib"].flatMap((d) => walk(path.join(root, d), (p) => textExt.test(p)))) {
  if (tokenFiles.includes(rel(f))) continue;
  const m = read(f).match(/#[0-9a-f]{6}\b/i);
  if (m) fail(`hard-coded color ${m[0]} in ${rel(f)} (use the token files)`);
}

// 9. Exactly the 17 kit photos, copied to out/.
const kit = ["hero-160", "hero-240", "hero-1200", "hero-1600", "hero-2048"]
  .concat(...["drone", "storm", "install", "roofline"].map((n) => [`${n}-160`, `${n}-240`, `${n}-1200`]))
  .map((n) => `${n}.webp`);
for (const dir of ["public/brand", "out/brand"]) {
  const have = fs.existsSync(path.join(root, dir)) ? fs.readdirSync(path.join(root, dir)).filter((f) => f.endsWith(".webp")) : [];
  const missing = kit.filter((k) => !have.includes(k));
  const extra = have.filter((h) => !kit.includes(h));
  if (missing.length || extra.length) fail(`${dir}: missing [${missing}] extra [${extra}]`);
}

// 10. Michroma is loaded at 400 only.
const layout = read(path.join(root, "app/layout.tsx"));
const mich = layout.match(/Michroma\(\{[^}]*\}/);
if (!mich || !/weight: "400"/.test(mich[0])) fail("Michroma must load weight 400 only");

if (failures.length) {
  console.error(`check: ${failures.length} problem(s)\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
console.log(`check: OK (${htmlFiles.length} HTML pages, ${outFiles.length} built text files, ${sourceFiles.length} source files)`);
