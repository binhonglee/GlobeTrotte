import { ElNotification, ElAlert, ElMessage } from "element-plus";
import VueRouter, { Route } from "vue-router";
import { DefineComponent } from "vue";

declare module "*.vue" {
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $notify: ElNotification;
    $alert: ElAlert;
    $message: ElMessage;
    $route: Route;
    $router: VueRouter;
  }
}
