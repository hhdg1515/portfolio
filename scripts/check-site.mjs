import { readdir, readFile, stat } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
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
  // ROOT 自带尾部分隔符，+1 会吃掉路径首字母
  const name = file.slice(ROOT.length).replace(/^[\\/]/, '');
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

  // 本地工具会往页面尾部注入 live-reload 脚本，每次运行都重新写入。
  // 带上线就是每个访客一个失败请求，外加把本地 token 印在公开 HTML 里。
  if (/localhost:|127\.0\.0\.1|impeccable-live/.test(source)) {
    errors.push(`${name}: local dev injection must be stripped before publishing`);
  }

  // 分享卡片 —— 只检查对外发布的页面，卡片版面源文件自身除外
  if (!name.startsWith(`scripts${sep}`)) {
    const meta = (property) =>
      source.match(new RegExp(`<meta (?:property|name)="${property}" content="([^"]*)"`))?.[1];

    for (const required of ['og:title', 'og:description', 'og:image', 'og:url']) {
      if (!meta(required)) errors.push(`${name}: missing ${required}`);
    }

    const image = meta('og:image');
    if (image && !image.startsWith('https://')) {
      errors.push(`${name}: og:image must be absolute, found ${image}`);
    }
    // 抓取器不会解析相对路径；漏掉这一点，分享出去就是一张空白卡
    if (image) {
      const local = resolve(ROOT, image.replace(/^https:\/\/[^/]+\//, ''));
      if (!await exists(local)) errors.push(`${name}: og:image file not found — ${image}`);
    }

    const url = meta('og:url');
    const canonical = source.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
    if (url && canonical && url !== canonical) {
      errors.push(`${name}: og:url and canonical disagree`);
    }
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
