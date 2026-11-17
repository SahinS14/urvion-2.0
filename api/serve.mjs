import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const siteRoot = join(process.cwd(), 'src', 'site');
const mimeTypes = {
  '.css': 'text/css; charset=utf-8', '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.woff2': 'font/woff2',
  '.mp3': 'audio/mpeg', '.wav': 'audio/wav'
};

export default async function serve(req, res) {
  const requested = Array.isArray(req.query.path) ? req.query.path.join('/') : (req.query.path || '');
  const relative = requested.replace(/^\/+/, '') || 'index.html';
  let file = normalize(join(siteRoot, relative));

  if (!file.startsWith(siteRoot)) return res.status(403).end('Forbidden');

  try {
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    const content = await readFile(file);
    res.setHeader('Content-Type', mimeTypes[extname(file)] || 'application/octet-stream');
    res.setHeader('Cache-Control', /\.(?:html|json)$/i.test(file) ? 'no-cache' : 'public, max-age=31536000, immutable');
    res.status(200).end(content);
  } catch {
    res.status(404).end('Not found');
  }
}
