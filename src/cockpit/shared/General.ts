import {
  ElNotificationOptions,
  MessageType,
} from "element-ui";
import { WingsStructUtil } from "wings-ts-util";
import HTTPReq from "./HTTPReq";
import User from "@/wings/User";
import Trip from "@/wings/Trip";
import { CombinedVueInstance } from "vue/types/vue";

export default class General {
  public static paramID(
    obj: CombinedVueInstance,
  ): string | undefined {
    /* istanbul ignore next: $route is a pain to mock, using this as a workaround for testing */
    return obj.$route.params.id;
  }

  public static paramNext(
    obj: CombinedVueInstance,
  ): string {
    /* istanbul ignore next: $route is a pain to mock, using this as a workaround for testing */
    try {
      return obj.$route.params.path ?? "";
    } catch (_) {
      return "";
    }
  }

  public static addNext(
    path: string,
    next: string,
  ): string {
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
      if (!path.startsWith(":")) {
        path = path.split("/:")[1] ?? "";
      } else {
        path = path.substr(1, path.length);
      }
      const paths = path.split("&");
      let next = "";
      while (next === "" || next === undefined) {
        next = paths.shift()?.split(".").join("/");
      }
      path = next + "/:" + paths.join("&");
    }
    return "/" + path;
  }

  public static toNext(obj: CombinedVueInstance): void {
    obj.$router.push(this.getNext(this.paramNext(obj)));
  }

  public static notifConfig(
    title: string,
    message: string,
    type: MessageType,
  ): ElNotificationOptions {
    return {
      message: message,
      title: title,
      type: type,
      duration: 2000,
      offset: 50,
    };
  }

  public static async genUser(id: number): Promise<User> {
    const user = await HTTPReq.genGET("user/" + id);
    return new User(user);
  }

  public static async genTrip(id: number): Promise<Trip> {
    const trip = await HTTPReq.genGET("trip/" + id);
    return new Trip(trip);
  }

  public static getIsCurrentUser(id: number): boolean {
    return this.getCurrentUser().ID === id;
  }

  public static async genCurrentUser(): Promise<User> {
    const id = JSON.parse(await HTTPReq.genGET("whoami"))
      .id;
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
}
