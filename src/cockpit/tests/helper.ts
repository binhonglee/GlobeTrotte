import { MountingOptions } from "@vue/test-utils";
import router from "@/router";
import naive from "naive-ui";
import { createHead } from "@vueuse/head";
import { GlobalMountOptions } from "@vue/test-utils/dist/types";
import UserObj from "@/wings/UserObj";
import { FetchedUserObj } from "@/cache/UserCache";

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

export function mountingOptions(): MountingOptions<Vue, Vue> {
  return {
    global: globalMountingOptions(),
  };
}

export function globalMountingOptions(): GlobalMountOptions {
  return {
    plugins: [naive, createHead()],
    mocks: {
      $router: router,
    },
  };
}

export function getFetchedUserObj(userObj: UserObj): FetchedUserObj {
  const toRet = new FetchedUserObj();
  toRet.completed = userObj;
  toRet.fromStorage = false;
  toRet.promise = null;
  return toRet;
}
