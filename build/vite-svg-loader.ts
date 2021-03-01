import { readFileSync } from "fs";
import { basename, extname } from "path";
import SVGO from "svgo";
import { Plugin } from "vite";
import { compileTemplate, parse } from "@vue/component-compiler-utils";
import * as compiler from "vue-template-compiler";

function compileSvg(svg, id: string): string {
  const template = parse({
    source: `
      <template>
        ${svg}
      </template>
    `,
    compiler: compiler as any,
    filename: `${basename(id)}.vue`,
  }).template;

  const result = compileTemplate({
    compiler: compiler as any,
    source: template.content,
    filename: `${basename(id)}.vue`,
  });
  console.log(result);
  return `
    ${result.code}
    export default {
      render: render,    
    }
  `;
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
