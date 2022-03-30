import Vue from "vue";
import App from "./App.vue";
import MyPlugin from "./MyPlugin";
import TomatoCustomUi from "tomato-custom-ui";
Vue.config.productionTip = false;
Vue.use(MyPlugin);
Vue.use(TomatoCustomUi);
// 第一次执行。
new Vue({
  render: (h) => h(App),
}).$mount("#app");
