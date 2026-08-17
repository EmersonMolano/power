import { build } from 'esbuild';
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const source = resolve('src');
const target = resolve('dist');

export async function buildFrontend() {
  if (existsSync(target)) {
    rmSync(target, { recursive: true, force: true });
  }

  mkdirSync(target, { recursive: true });
  cpSync(resolve(source, 'index.html'), resolve(target, 'index.html'));
  cpSync(resolve(source, 'styles.css'), resolve(target, 'styles.css'));

  await build({
    entryPoints: [resolve(source, 'main.jsx')],
    bundle: true,
    format: 'esm',
    outfile: resolve(target, 'main.js'),
    jsx: 'automatic',
    sourcemap: false,
    minify: false,
    target: ['es2020']
  });

  console.log(`Frontend listo en ${target}`);
}

const entryScript = process.argv[1] ? pathToFileURL(process.argv[1]).href : null;

if (import.meta.url === entryScript) {
  buildFrontend().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
