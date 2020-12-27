require("jsdom-global")();

// Fix the Date object, see <https://github.com/vuejs/vue-test-utils/issues/936#issuecomment-415386167>.
window.Date = Date;

// Setup browser environment
const hooks = require("require-extension-hooks");
const Vue = require("vue");

Vue.config.productionTip = false;

hooks("vue").plugin("vue").push();
hooks(["vue", "ts"])
  .exclude(({ filename }) =>
    filename.match(/\/node_modules\//),
  )
  .plugin("babel")
  .push();
