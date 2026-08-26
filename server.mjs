/* 静态预览服务器 —— 零依赖，只用 Node 内置模块。
   这套站没有构建步骤：HTML/CSS 直接就是产物，改完刷新即可。 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, resolve, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('.', import.meta.url));
const PORT = Number(process.env.PORT) || 8080;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

const server = createServer(async (req, res) => {
  let rel = decodeURIComponent(req.url.split('?')[0]);
  if (rel.endsWith('/')) rel += 'index.html';

  const file = normalize(join(ROOT, rel));
  if (!resolve(file).startsWith(resolve(ROOT))) {
    res.writeHead(403).end('forbidden');
    return;
  }

  try {
    const buf = await readFile(file);
    res.writeHead(200, { 'Content-Type': TYPES[extname(file).toLowerCase()] ?? 'application/octet-stream' });
    res.end(buf);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404  ' + rel);
    console.log('404', rel);
  }
});

/* 端口被占用时自动往后找一个可用的，最多试 10 个。
   避免"上次的服务器没退干净 → 这次起不来"这种卡住。 */
let port = PORT;
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE' && port < PORT + 10) {
    console.log('  端口 ' + port + ' 被占用，改用 ' + (port + 1));
    server.listen(++port);
  } else {
    console.error(err.message);
    process.exit(1);
  }
});
server.listen(port, () => {
  console.log('\n  Portfolio  →  http://localhost:' + port + '\n');
});
