import Axios from "axios";
import ElementPlus from "element-plus";
import { createSSRApp, defineComponent, h } from "vue";
import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import "element-plus/lib/theme-chalk/index.css";
import General from "./shared/General";
import router from "./router";
import routes from "./routes";
import R from "./shared/R";
import App from "./App.vue";
import type { PageContext } from "./shared/PageContextTypes";

Axios.defaults.withCredentials = true;

export function createApp(pageContext: PageContext) {
  const { Page, pageProps } = pageContext;
  const PageWithLayout = defineComponent({
    render() {
      return h(
        App,
        {},
        {
          default() {
            return h(Page, pageProps || {});
          },
        },
      );
    },
  });

  const app = createSSRApp(PageWithLayout);
  app.use(ElementPlus);

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
    },
  );

  app.config.globalProperties.$router = router;
  app.use(router);
  // setPageContext(app, pageContext);

  return app;
}
