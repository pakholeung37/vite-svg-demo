import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import createSvgSpritePlugin from "vite-plugin-svg-sprite";
import { createSvgPlugin } from "vite-plugin-vue2-svg";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    createVuePlugin(),
    // createSvgSpritePlugin({
    //   symbolId: "icon-[name]-[hash]",
    // }),
    // * debug
    // createSvgComponentPlugin({}),
    createSvgPlugin(),
  ],
});
