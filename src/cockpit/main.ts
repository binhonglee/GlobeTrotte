import Axios from "axios";
import ElementPlus from "element-plus";
import { createApp } from "vue";
import { Route } from "vue-router";
import "element-plus/lib/theme-chalk/index.css";
import App from "./App.vue";
import General from "./shared/General";
import router from "./router";
import routes from "./routes";
import R from "./shared/R";

Axios.defaults.withCredentials = true;

const app = createApp(App);
app.use(ElementPlus);

router.beforeEach(async (to: Route, from: Route, next) => {
  if (to.matched.some((record) => record.meta.loggedIn)) {
    if (General.authSession()) {
      next();
    } else {
      next(R.addParamNext(routes.Login, to.path));
    }
  } else if (to.matched.some((record) => record.meta.confirmed)) {
    if (General.authSession()) {
      if (General.confirmed()) {
        next();
      } else {
        next(R.addParamNext(routes.unconfirmed_Email, to.path));
      }
    } else {
      next(R.addParamNext(routes.Login, to.path));
    }
  } else if (to.matched.some((record) => record.meta.unconfirmed)) {
    if (General.authSession()) {
      if (General.confirmed()) {
        next(R.getNext(to));
      } else {
        next();
      }
    } else {
      next(R.addParamNext(routes.Login, to.path));
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (General.authSession()) {
      next(R.getNext(to));
    } else {
      next();
    }
  } else {
    next();
  }
});

app.config.globalProperties.$router = router;
app.use(router);
app.mount("#app");
