import { readFileSync } from "fs";
import SVGO, { Options } from "svgo";
import { Plugin } from "vite";
import { compileTemplate } from "@vue/component-compiler-utils";
import compiler from "vue-template-compiler";

function compileSvg(svg, id: string): string {
  let code = compileTemplate({
    compiler,
    source: `
    <template>
      ${svg}
    </template>
  `,
    filename: id,
  }).code;

  return code;
}

async function optimizeSvg(svgo, content, path) {
  const { data } = await svgo.optimize(content, {
    path,
  });

  return data;
}

export default function svgPlugin(
  options: {
    svgoConfig?: Options;
  } = {}
): Plugin {
  const { svgoConfig } = options;
  const svgo = new SVGO(svgoConfig);
  const svgRegex = /\.svg$/;

  return {
    name: "vite-plugin-vue2-svg",
    async transform(source, id) {
      const isMatch = id.match(svgRegex);
      if (isMatch) {
        const code = readFileSync(id);
        const svg = await optimizeSvg(svgo, code, id);
        const result = compileSvg(svg, id);
        // console.log(svg);
        return result;
      }
      return null;
    },
  };
}
