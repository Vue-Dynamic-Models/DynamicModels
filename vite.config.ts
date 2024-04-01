import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  base: './',
  clearScreen: false, // 控制台清空
  cacheDir: resolve(__dirname, '.cache'),
  server: { port: 5083 },
  json: { stringify: true },// json直接载入性能优化
  css: { devSourcemap: true },// css开发时产生映射
  build: {
    target: 'esnext', // es6 | esnext
    sourcemap: false, //  css不产生反向映射
    minify: 'esbuild', // 代码混淆
    cssCodeSplit: true, // css是否拆分
    assetsInlineLimit: 0, // 全部采用外部引用
    reportCompressedSize: true, // gzip 压缩大小报告
    outDir: resolve(__dirname, './dist'),
    rollupOptions: {
      input: {
        index: resolve(__dirname, './example/index.html'),
      },
    },
  },
  resolve: {
    alias: {
      'dynamic-module': resolve(__dirname, 'src'),
    },
  },
});
