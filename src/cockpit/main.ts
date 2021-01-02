import Axios from "axios";
import ElementUI from "element-ui";
import Vue from "vue";
import { Route } from "vue-router";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import General from "./shared/General";
import router from "./router";

Axios.defaults.withCredentials = true;

Vue.use(ElementUI);
Vue.config.productionTip = false;

router.beforeEach(async (to: Route, from: Route, next) => {
  if (to.matched.some((record) => record.meta.loggedIn)) {
    if (General.authSession()) {
      next();
    } else {
      let path = General.addNext(to.path, "/trip/view/10");
      path = General.addNext("/myaccount", path);
      path = General.addNext("/register", path);
      next(General.addNext("/login", path));
    }
  } else if (
    to.matched.some((record) => record.meta.guest)
  ) {
    if (General.authSession()) {
      next(General.getNext(to.path));
    } else {
      next();
    }
  } else {
    next();
  }
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
