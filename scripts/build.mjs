import { cp, mkdir, rm, writeFile } from 'node:fs/promises';

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await cp('src/site', 'dist', { recursive: true });
await writeFile('dist/.nojekyll', '');
console.log('Built URVION Volume 2 static site.');
