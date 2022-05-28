import { MountingOptions } from "@vue/test-utils";
import naive from "naive-ui";
import { createHead } from "@vueuse/head";
import { GlobalMountOptions } from "@vue/test-utils/dist/types";
import UserObj from "@/wings/UserObj";
import { FetchedUserObj } from "@/cache/UserCache";

export type routerFunctions =
  | "replace"
  | "push"
  | "onError"
  | "go"
  | "forward"
  | "beforeEach"
  | "beforeResolve"
  | "afterEach"
  | "back"
  | "resolve"
  | "addRoute"
  | "removeRoute"
  | "hasRoute"
  | "getRoutes"
  | "isReady"
  | "install";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type Vue = any;

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
  };
}

export function getFetchedUserObj(userObj: UserObj): FetchedUserObj {
  const toRet = new FetchedUserObj();
  toRet.completed = userObj;
  toRet.fromStorage = false;
  toRet.promise = null;
  return toRet;
}
