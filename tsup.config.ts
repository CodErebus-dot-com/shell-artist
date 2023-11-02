import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  entry: ['src/index.ts'],
  format: ['esm'],
  minify: true,
  outDir: 'dist',
  dts: true,
  sourcemap: false,
  treeshake: true,
});
