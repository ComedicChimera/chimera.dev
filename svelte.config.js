const sveltePreprocess = require("svelte-preprocess");

module.exports = {
  preprocess: sveltePreprocess({
    tsconfigFile: "tsconfig.json",
  }),
  emitCss: true,
  compilerOptions: {
    customElement: true
  }
};