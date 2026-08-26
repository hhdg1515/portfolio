import { readdir, readFile, stat } from 'node:fs/promises';
import { dirname, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const errors = [];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const path = resolve(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else files.push(path);
  }
  return files;
}

function count(source, pattern) {
  return source.match(pattern)?.length ?? 0;
}

function localTargets(source) {
  return [...source.matchAll(/(?:href|src)=["']([^"']+)["']/g)]
    .map((match) => match[1])
    .filter((value) => !/^(?:https?:|mailto:|tel:|#|data:|javascript:)/i.test(value));
}

async function exists(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

const files = await walk(ROOT);
const htmlFiles = files.filter((file) => extname(file) === '.html');

for (const file of htmlFiles) {
  const source = await readFile(file, 'utf8');
  const name = file.slice(ROOT.length + 1);
  const h1Count = count(source, /<h1\b/gi);
  const h2Count = count(source, /<h2\b/gi);

  if (h1Count !== 1) errors.push(`${name}: expected one h1, found ${h1Count}`);
  if (h2Count === 0) errors.push(`${name}: expected at least one h2`);

  for (const target of localTargets(source)) {
    const clean = target.split('#')[0].split('?')[0];
    if (!clean) continue;
    const path = resolve(dirname(file), clean);
    if (!await exists(path)) errors.push(`${name}: missing local target ${target}`);
  }
}

const publicText = await Promise.all(htmlFiles.map((file) => readFile(file, 'utf8')));
const joined = publicText.join('\n');
const forbiddenClaims = [
  'Six projects that shipped',
  'search engines had no signal for them',
  'A finished feature I decided not to switch on',
];

for (const claim of forbiddenClaims) {
  if (joined.includes(claim)) errors.push(`forbidden or superseded claim remains: ${claim}`);
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}

console.log(`Site check passed: ${htmlFiles.length} HTML files, local links and claim guards verified.`);
