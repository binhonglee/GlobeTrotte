var html;
var options = { url: "http://localhost/" };
require("jsdom-global")(html, options);

// Fix the Date object, see <https://github.com/vuejs/vue-test-utils/issues/936#issuecomment-415386167>.
window.Date = Date;

// Setup browser environment
const hooks = require("require-extension-hooks");
const Vue = require("vue");
const ElementUI = require("element-ui");
const Axios = require("axios");
Axios.defaults.withCredentials = true;

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.config.devtools = false;

hooks("vue").plugin("vue").push();
hooks(["vue", "ts"])
  .exclude(({ filename }) =>
    filename.match(/\/node_modules\//),
  )
  .plugin("babel")
  .push();

if (!window.localStorage) {
  window.localStorage = {
    getItem() {
      return "{}";
    },
    setItem() {},
    clear() {},
  };
}

localStorage = window.localStorage;
