import { readFileSync, readdirSync, statSync } from 'node:fs';
import { transformSync } from 'esbuild';
import { join } from 'node:path';

const roots = ['src', 'scripts'];
const sourceFiles = [];

function collectJsFiles(directory) {
  for (const entry of readdirSync(directory)) {
    const path = join(directory, entry);
    const stat = statSync(path);

    if (stat.isDirectory()) {
      collectJsFiles(path);
    } else if (path.endsWith('.js') || path.endsWith('.jsx')) {
      sourceFiles.push(path);
    }
  }
}

for (const root of roots) {
  collectJsFiles(root);
}

for (const file of sourceFiles) {
  const source = readFileSync(file, 'utf8');
  transformSync(source, {
    loader: file.endsWith('.jsx') ? 'jsx' : 'js',
    format: 'esm'
  });
}

console.log(`Validacion correcta: ${sourceFiles.length} archivos JavaScript revisados.`);
