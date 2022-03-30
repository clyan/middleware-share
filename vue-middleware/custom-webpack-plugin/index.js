const { RawSource } = require("webpack-sources");
class CustomWebpackPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compile) {
    const { text } = this.options;
    compile.hooks.emit.tapAsync(
      "CustomWebpackPlugin",
      async (compilation, callback) => {
        const assets = compilation.assets;
        for (const [pathname, source] of Object.entries(assets)) {
          if (!(pathname.endsWith(".js") || pathname.endsWith(".html"))) {
            continue;
          }
          let chunkSourceCode = source.source();
          console.log("text", typeof chunkSourceCode);
          chunkSourceCode = chunkSourceCode.replace(/占位/g, text);
          console.log(pathname);
          compilation.updateAsset(pathname, new RawSource(chunkSourceCode));
        }
        return callback();
      }
    );
  }
}
module.exports = CustomWebpackPlugin;
