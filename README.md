# vue-middleware
## Vue插件
https://github1s.com/vuejs/vue/blob/2.6/src/core/global-api/use.js#L7
```js
function initUse (Vue) {
  Vue.use = function (plugin) {
      // 内置installedPlugins
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    // 如果已经存在此插件，那么跳过
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // 执行参数
    var args = toArray(arguments, 1);
    args.unshift(this);
    // 最终组合成的形式 [this, 参数A, 参数B]

    // 执行plugin.install
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
      // 或者直接执行plugin
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}
```
```js
let MyPlugin = {};

MyPlugin.install = function (Vue, options) {
  console.log(Vue, this, options);
  // 1. 添加全局方法或 property
  Vue.myGlobalMethod = function () {
    // 逻辑...
  };

  // 2. 添加全局资源
  Vue.directive("my-directive", {
    bind(el, binding, vnode, oldVnode) {
      // 逻辑...
    },
  });

  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      console.log("哈哈哈哈");
    },
  });

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  };
};

export default MyPlugin;
```

这也是vue组件库的基础，组件库都是这么干的。

## Rollup插件

https://cegmktg0el.feishu.cn/wiki/wikcnA0sHycXeUkevS1ZPkfn9Ld#BfEWMD


## webpack插件
> 简单的写一个插件，将代码中的所有 "占位" 修改
```js
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
```
# webpack运行流程、源码解析，Tabable原理
https://juejin.cn/post/6844903976563900430
