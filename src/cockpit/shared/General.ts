import { ElNotificationOptions, MessageType } from "element-ui";
import { WingsStructUtil } from "wings-ts-util";
import HTTPReq from "./HTTPReq";
import User from "@/wings/User";
import Trip from "@/wings/Trip";
import VueRouter from "vue-router";

export default class General {
  public static paramID(v: Vue): string | undefined {
    /* istanbul ignore next: $route is a pain to mock, using this as a workaround for testing */
    return v.$route.params.id;
  }

  public static paramNext(v: Vue): string {
    /* istanbul ignore next: $route is a pain to mock, using this as a workaround for testing */
    try {
      return v.$route.params["path"] ?? "";
    } catch (_) {
      return "";
    }
  }

  public static paramUUID(v: Vue): string {
    /* istanbul ignore next: $route is a pain to mock, using this as a workaround for testing */
    try {
      return v.$route.params.uuid ?? "";
    } catch (_) {
      return "";
    }
  }

  public static addNext(path: string, next: string): string {
    if (next.startsWith("/")) {
      next = next.substr(1, next.length);
    }
    const nexts = next.split("/:");
    const first = nexts.shift()?.split("/").join(".");
    if (nexts.length > 0) {
      next = first + "&" + nexts.join("");
    } else {
      next = first;
    }

    return path + "/:" + next;
  }

  public static getNext(path: string): string {
    if (path !== "") {
      if (path.startsWith("/")) {
        path = path.substr(1, path.length);
      }

      if (!path.startsWith(":") || path.length < 2) {
        path = "";
      } else {
        path = path.substr(1, path.length);
        const paths = path.split("&");
        let next = "";
        while (next === "" || next === undefined) {
          next = paths.shift()?.split(".").join("/");
        }
        path = next;
        if (paths.length > 0) {
          path += "/:" + paths.join("&");
        }
      }
    }
    return "/" + path;
  }

  public static toNext(v: Vue): void {
    v.$router.push(this.getNext(this.paramNext(v)));
  }

  public static notifConfig(
    title: string,
    message: string,
    type: MessageType,
    duration = 2000,
    offset = 50,
  ): ElNotificationOptions {
    return {
      message: message,
      title: title,
      type: type,
      duration: duration,
      offset: offset,
    };
  }

  public static async genUser(router: VueRouer, id: number): Promise<User> {
    const user = await HTTPReq.genGET(router, "user/" + id);
    return new User(user);
  }

  public static async genTrip(router: VueRouter, id: number): Promise<Trip> {
    const trip = await HTTPReq.genGET(router, "trip/" + id);
    return new Trip(trip);
  }

  public static getIsCurrentUser(id: number): boolean {
    return this.getCurrentUser().ID === id;
  }

  public static async genUpdateCurrentUser(): Promise<void> {
    await this.genCurrentUser();
  }

  public static async genCurrentUser(): Promise<User> {
    const id = JSON.parse(await HTTPReq.genGET("whoami")).id;
    if (id === -1) {
      localStorage.clear();
    } else {
      localStorage.setItem(
        "user",
        WingsStructUtil.stringify(await this.genUser(id)),
      );
    }

    return this.getCurrentUser();
  }

  private static getCurrentUser(): User {
    const user = localStorage.getItem("user");
    if (user !== null) {
      return new User(JSON.parse(user));
    }

    return new User();
  }

  public static authSession(): boolean {
    return this.getCurrentUser().ID !== -1;
  }

  public static confirmed(): boolean {
    return this.getCurrentUser().confirmed;
  }

  public static async genRedirectTo(
    router: VueRouter,
    path: string,
    overrideRateLimit: bool = false,
  ): Promise<void> {
    if (
      router.currentRoute.path.startsWith("/ratelimited") &&
      !overrideRateLimit
    ) {
      return;
    }

    await router.push(path);
  }
}
