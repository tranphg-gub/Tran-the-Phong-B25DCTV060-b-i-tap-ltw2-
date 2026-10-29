import { build } from 'vite';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const result = await build({
  root,
  configFile: false,
  base: './',
  build: {
    write: false,
    assetsInlineLimit: Infinity,
    rollupOptions: { output: { inlineDynamicImports: true } }
  }
});
const files = result.output;
const chunks = files.filter(file => file.type === 'chunk');
if (chunks.length !== 1 || chunks[0].imports.length) throw new Error('Bản mở nhanh còn phụ thuộc tệp JavaScript ngoài.');
let html = String(files.find(file => file.type === 'asset' && file.fileName.endsWith('.html')).source);
html = html.replace(/<script type="module"[^>]*src="[^"]+"[^>]*><\/script>/g, '');
html = html.replace(/<link rel="stylesheet"[^>]*>/g, '');
html = html.replace(/<link rel="modulepreload"[^>]*>/g, '');
html = html.replace(/<script data-file-redirect>[\s\S]*?<\/script>/g, '');
html = html.replace(/[ \t]+$/gm, '');
const css = files.filter(file => file.type === 'asset' && file.fileName.endsWith('.css')).map(file => String(file.source)).join('\n');
const code = chunks[0].code.replace(/<\/script/gi, '<\\/script');
html = html.replace('</head>', () => '<style>' + css + '</style></head>');
html = html.replace('</body>', () => '<script type="module">' + code + '</script></body>');
await writeFile(resolve(root, 'Thu-vien.html'), html, 'utf8');
await writeFile(resolve(root, 'dist/Thu-vien.html'), html, 'utf8');
