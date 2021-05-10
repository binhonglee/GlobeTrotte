import { ElNotification, ElAlert, ElMessage } from "element-plus";
import VueRouter, { Route } from "vue-router";

declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent;
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
