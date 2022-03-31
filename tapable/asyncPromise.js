class asyncPromise {
  constructor(args) {
    // 任务存放
    this.tasks = [];
  }
  tapAsync(name, task) {
    this.tasks.push(task);
  }
  tapPromise(name, task) {
    this.tasks.push(task);
  }

  callAsync(...args) {
    // return new Promise((reslove, reject) => {
    //     let index = 0;
    //     this.tasks.forEach((task) =>
    //         task(...args).then(() => {
    //             index++;
    //             if (index == this.tasks.length) {
    //                 reslove();
    //             }
    //         })
    //     );
    // });

    // 并行
    // this.proArr = this.tasks.map((task) => task(...args));
    // return Promise.all(this.proArr);

    // 串行
    return new Promise((re, je) => {
      let [first, ...others] = this.tasks;
      others.reduce((a, b) => {
        return a.then((res) => b(res));
      }, first(...args));
    });
  }
}

let hooks = new asyncPromise();
hooks.tapPromise("aaa", function (name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("aaa事件：", name);
      resolve("aa得传值");
    }, 1000);
  });
});

hooks.tapPromise("ddd", function (name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("ddd事件：", name);
      resolve("ddd得传值");
    }, 1000);
  });
});

hooks.tapPromise("ccc", function (name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("ccc事件：", name);
      resolve();
    }, 1000);
  });
});

hooks.callAsync("wj").then((res) => {
  console.log("res:end", res);
});
