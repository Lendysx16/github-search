import vue from '@vitejs/plugin-vue2';
import Components from 'unplugin-vue-components/vite';
import { defineConfig, loadEnv } from 'vite';
import eslint from 'vite-plugin-eslint';
import stylelint from 'vite-plugin-stylelint';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
const DEFAULT_PORT = 8080;

export default ({ mode }) => {
  // https://vitejs.dev/config/
  return defineConfig({
    server: {
      host: 'localhost',
      port: DEFAULT_PORT,
    },
    build: {
      sourcemap: true,
    },
    plugins: [
      vue(),
      eslint(),
      stylelint({ fix: false }),
      Components({
        dts: true,
      }),
    ],
    resolve: {
      alias: [
        {
          find: /^@\/(.+)/,
          replacement: path.resolve(path.resolve(__dirname), 'src') + '/$1',
        },
        {
          find: /^~.+/,
          replacement: (val) => {
            return val.replace(/^~/, '');
          },
        },
      ],
    },
  });
};
