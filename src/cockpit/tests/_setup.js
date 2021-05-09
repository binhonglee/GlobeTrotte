var html;
var options = { url: "http://localhost/" };
require("jsdom-global")(html, options);

// Fix the Date object, see <https://github.com/vuejs/vue-test-utils/issues/936#issuecomment-415386167>.
window.Date = Date;

// Setup browser environment
const hooks = require("require-extension-hooks");
const { createApp } = require("vue");
const ElementPlus = require("element-plus");
const Axios = require("axios");
Axios.defaults.withCredentials = true;

const app = createApp();
app.use(ElementPlus);

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
