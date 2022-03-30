function Custom(options) {
  options.plugins.forEach((plugin) => plugin(this));
}
function Plugin1() {}
function Plugin2() {}

const options = {
  plugins: [Plugin1, Plugin2],
};

const custom = new Custom(options);
