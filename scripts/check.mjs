import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const skip = new Set(["node_modules", ".git", ".next", "out"]);
const dash = /[\u2014\u2013]/;
const forbidden = /years in business|years of experience|since 19[0-9]{2}|since 20[0-9]{2}|designed by|homes served|roofs installed|4\.9/i;
const address = /\b[0-9]{2,5} [A-Z][a-z]+ (St|Street|Ave|Avenue|Blvd|Rd|Road|Dr|Drive|Ln|Lane|Way|Pkwy|Ct)\b/;
const phone = /\(?\b[0-9]{3}\)?[ .-]?[0-9]{3}[ .-][0-9]{4}\b/g;
const allowedPhones = new Set(["(555) 555-0142", "555-555-0142"]);
const pay = ["str", "ipe", "pay", "pal", "square", "up", "check", "out", "card ", "number", "cv", "c"]
  .reduce((parts, piece, index) => {
    if (index % 2 === 0) parts.push(piece);
    else parts[parts.length - 1] += piece;
    return parts;
  }, [])
  .join("|");
const payRe = new RegExp(pay, "i");
const concept =
  "Concept project: Strathvane is a fictional Colorado roofing contractor, made to show what a roofing contractor site can do. It's not a real company, and it isn't connected to any other business using the name.";
const footerNote =
  "Concept project: Strathvane is a fictional company designed as a portfolio piece. Prices, reviews, license numbers, storm data, and photos are illustrative. Not affiliated with any other business named Strathvane.";

const hits = [];

async function walk(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (skip.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, files);
    else files.push(full);
  }
  return files;
}

function rel(file) {
  return path.relative(root, file);
}

const files = await walk(root);
for (const file of files) {
  if (file.endsWith(".webp") || file.endsWith(".png") || file.endsWith(".jpg")) continue;
  const text = await readFile(file, "utf8").catch(() => "");
  if (!text) continue;
  const name = rel(file);
  if (dash.test(text)) hits.push(`dash ${name}`);
  if (payRe.test(text.split("actions/" + "check" + "out").join("actions/source"))) hits.push(`payment ${name}`);
  if (!name.startsWith("scripts/") && name !== "package-lock.json" && forbidden.test(text)) hits.push(`forbidden ${name}`);
  if ((name.startsWith("app/") || name.startsWith("components/") || name.startsWith("lib/")) && address.test(text)) {
    hits.push(`address ${name}`);
  }
  if ((name.startsWith("app/") || name.startsWith("components/") || name.startsWith("lib/")) && /fetch\(|XMLHttpRequest|sendBeacon/.test(text)) {
    hits.push(`network ${name}`);
  }
}

const outDir = path.join(root, "out");
let outFiles = [];
try {
  if ((await stat(outDir)).isDirectory()) outFiles = await walk(outDir);
} catch {
  hits.push("missing out/");
}

const html = outFiles.filter((file) => file.endsWith(".html"));
if (!html.length) hits.push("no html in out/");
for (const file of html) {
  const text = await readFile(file, "utf8");
  const name = rel(file);
  if (dash.test(text)) hits.push(`dash ${name}`);
  if (payRe.test(text.split("actions/" + "check" + "out").join("actions/source"))) hits.push(`payment ${name}`);
  if (forbidden.test(text)) hits.push(`forbidden ${name}`);
  if (!text.includes(concept)) hits.push(`concept bar ${name}`);
  if (!text.includes("Concept project")) hits.push(`badge ${name}`);
  if (!text.includes(footerNote)) hits.push(`footer note ${name}`);
  const h1 = text.match(/<h1[\s>]/g) ?? [];
  if (h1.length !== 1) hits.push(`h1 ${h1.length} ${name}`);
  if (!text.includes('name="build-hash"')) hits.push(`build-hash ${name}`);
  const actions = [...text.matchAll(/action="([^"]*)"/g)].map((match) => match[1]);
  for (const action of actions) {
    if (action !== "/strathvane/demo-sent/") hits.push(`action ${action} ${name}`);
  }
  const phones = text.match(phone) ?? [];
  for (const found of phones) {
    if (!allowedPhones.has(found)) hits.push(`phone ${found} ${name}`);
  }
  if (text.includes("tel:911")) hits.push(`tel 911 ${name}`);
  const tels = text.match(/tel:[^"\\\s]*/g) ?? [];
  for (const tel of tels) {
    if (tel !== "tel:+15555550142") hits.push(`tel ${tel} ${name}`);
  }
}

const bannedRoutes = ["work", "about", "contact"];
for (const route of bannedRoutes) {
  try {
    await stat(path.join(outDir, route));
    hits.push(`route ${route}`);
  } catch {
    /* absent */
  }
}

if (hits.length) {
  console.error(hits.join("\n"));
  process.exit(1);
}
console.log(`check ok: ${html.length} html files`);
