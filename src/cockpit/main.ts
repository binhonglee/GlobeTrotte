import Vue from "vue";
import ElementUI from "element-ui";
import Axios, { AxiosResponse } from "axios";
import "element-ui/lib/theme-chalk/index.css";
import { Route } from "vue-router";
import router from "./router";
import HTTPReq from "./shared/HTTPReq";
import App from "./App.vue";

Axios.defaults.withCredentials = true;

Vue.use(ElementUI);
Vue.config.productionTip = false;

router.beforeEach((to: Route, from: Route, next) => {
  let success = false;
  Axios.get(HTTPReq.getURI("auth"), {
    withCredentials: true,
  })
    .then((loggedIn: AxiosResponse) => {
      success = loggedIn.status === 200;
    })
    .finally(() => {
      localStorage.setItem("authed", String(success));
      if (
        to.matched.some((record) => record.meta.loggedIn)
      ) {
        if (success) {
          next({
            path: "login",
            params: { nextUrl: to.fullPath },
          });
        } else {
          next();
        }
      } else if (
        to.matched.some((record) => record.meta.guest)
      ) {
        if (!success) {
          next();
        } else {
          next("/");
        }
      } else {
        next();
      }
    });
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
