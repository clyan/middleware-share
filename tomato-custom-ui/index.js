import Button from "./Button";
import Popup from "./Popup";

var components = [Button, Popup];

var install = function (Vue, options) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};

export default {
  install,
  Button,
  Popup,
};
