import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';


export default defineConfig(() => {

  return {
    base: "./",
    define: {
      "process.env": {
        NODE_ENV: "production",
      },
    },
    plugins: [viteStaticCopy({
      targets: [
        {
          src: 'node_modules/@pdftron/webviewer/public/**',
          dest: 'webviewer'
        }
      ]
    })],
    build: {
      emptyOutDir: true,
      sourcemap: false,
      minify: "esbuild",
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            return assetInfo.name!;
          },
        },
      },
      lib: {
        formats: ["es"],
        entry: [
          "./src/webcomponent-shadowed.ts",
          "./src/webcomponent-iframe.ts",
        ],
      },
      target: "esnext",
    },
  };
});
