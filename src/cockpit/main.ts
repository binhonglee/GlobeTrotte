import Axios from "axios";
import viteSSR from "vite-ssr";
import { createHead } from "@vueuse/head";
import ElementPlus from "element-plus";
import {
  RouteLocationNormalized,
  NavigationGuardNext,
  Router,
} from "vue-router";
import "element-plus/lib/theme-chalk/index.css";
import App from "./App.vue";
import General from "./shared/General";
import { routes } from "./router";
import constRoutes from "./routes";
import R from "./shared/R";
import Routing from "./shared/Routing";

Axios.defaults.withCredentials = true;

export default viteSSR(App, { routes }, async ({ app, router }) => {
  app.use(ElementPlus);
  app.config.globalProperties.$router = router;

  router.beforeEach(
    async (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext,
    ) => {
      if (to.matched.some((record) => record.meta.loggedIn)) {
        if (General.authSession()) {
          next();
        } else {
          next(R.addParamNext(constRoutes.Login, to.path));
        }
      } else if (to.matched.some((record) => record.meta.confirmed)) {
        if (General.authSession()) {
          if (General.confirmed()) {
            next();
          } else {
            next(R.addParamNext(constRoutes.unconfirmed_Email, to.path));
          }
        } else {
          next(R.addParamNext(constRoutes.Login, to.path));
        }
      } else if (to.matched.some((record) => record.meta.unconfirmed)) {
        if (General.authSession()) {
          if (General.confirmed()) {
            next(R.getNext(to));
          } else {
            next();
          }
        } else {
          next(R.addParamNext(constRoutes.Login, to.path));
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
    },
  );

  Routing.setRouter(router);

  const head = createHead();
  app.use(head);

  return { head };
});
