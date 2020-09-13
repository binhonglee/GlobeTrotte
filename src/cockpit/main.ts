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
    if (await General.authSession()) {
      next();
    } else {
      next({
        path: "login",
        params: { nextUrl: to.fullPath },
      });
    }
  } else if (
    to.matched.some((record) => record.meta.guest)
  ) {
    if (await General.authSession()) {
      next("/");
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
