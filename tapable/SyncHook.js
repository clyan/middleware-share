class SyncHook {
  constructor(args) {
    // 任务存放
    this.tasks = [];
  }
  tap(name, task) {
    this.tasks.push(task);
  }

  call(...args) {
    // 发布订阅
    // this.tasks.forEach((item) => {
    //   item(...args);
    // });
    // 瀑布模式
    let [first, ...others] = this.tasks;
    let re = first(...args);

    others.reduce((a, b) => {
      return b(a);
    }, re);
  }
}

let hooks = new SyncHook();
hooks.tap("aaa", function (name) {
  console.log("aaa事件：", name);
  return "aaa111事件";
});

hooks.tap("ddd", function (name) {
  console.log("ddd事件：", name);
  return "ddd事件";
});

hooks.tap("ccc", function (name) {
  console.log("ccc事件：", name);
  return "ccc事件";
});

hooks.tap("ffff", function (name) {
  console.log("ffff事件：", name);
});

hooks.call("yangjie");
