import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const files = [join(root, "out/404.html"), join(root, "out/404/index.html")];
const tag = '<meta name="robots" content="noindex"/>';

const payload = '[\\"$\\",\\"meta\\",null,{\\"name\\":\\"robots\\",\\"content\\":\\"noindex\\"}],';

for (const file of files) {
  let text = await readFile(file, "utf8");
  text = text.replaceAll(tag, "").replaceAll('<meta name="robots" content="noindex" />', "");
  if (!text.includes(payload)) throw new Error(`expected noindex payload in ${file}`);
  text = text.replace(payload, "");
  if (text.includes("noindex")) throw new Error(`noindex remains in ${file}`);
  await writeFile(file, text);
}
