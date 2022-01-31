import { mount, MountingOptions, VueWrapper } from "@vue/test-utils";
import App from "@/App.vue";
import router from "@/router";
import ElementPlus, {
  ElMessageBox,
  ElMessage,
  ElNotification,
} from "element-plus";
import naive from "naive-ui";
import { GlobalMountOptions } from "@vue/test-utils/dist/types";

export type routerFunctions =
  | "replace"
  | "push"
  | "forward"
  | "options"
  | "app"
  | "mode"
  | "currentRoute"
  | "beforeEach"
  | "beforeResolve"
  | "afterEach"
  | "go"
  | "back"
  | "getMatchedComponents"
  | "onReady"
  | "onError"
  | "addRoutes"
  | "resolve";

interface ElPlus {
  $notify(args: unknown): typeof ElNotification;
  $alert(args: unknown): typeof ElMessageBox.alert;
  $message(args: unknown): typeof ElMessage;
  $router(args: unknown): typeof router;
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type Vue = any & ElPlus;

// Sometimes whatever trigger takes a bit of time to come into effect and test
// runner runs through it too fast that whatever we try to check is still in
// previous state.This adds a buffer in between trigger and the checks.
export async function wait(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export function newLocalVueAndRouter(): MountingOptions<Vue, Vue> {
  return mount(App, {
    global: {
      plugins: [ElementPlus],
      mocks: {
        $router: router,
      },
    },
  });
}

export function mountingOptions(): MountingOptions<Vue, Vue> {
  return {
    global: globalMountingOptions(),
  };
}

export function globalMountingOptions(): GlobalMountOptions {
  return {
    plugins: [ElementPlus, naive],
    mocks: {
      $router: router,
      $message: ElMessage,
      $notify: ElNotification,
      $alert: ElMessageBox.alert,
    },
  };
}
