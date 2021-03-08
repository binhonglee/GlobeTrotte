import { ElNotificationOptions } from "element-ui/types/notification";
import { MessageType } from "element-ui/types/message";
import { WingsStructUtil } from "wings-ts-util";
import HTTPReq from "./HTTPReq";
import TripObj from "@/wings/TripObj";
import UserObj from "@/wings/UserObj";
import VueRouter from "vue-router";

export default class General {
  public static paramID(v: Vue): string | undefined {
    /* istanbul ignore next: $route is a pain to mock, using this as a workaround for testing */
    return v.$route.params["id"];
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

  public static async genUserV2(
    router: VueRouter,
    id: number,
  ): Promise<UserObj> {
    const user = await HTTPReq.genGET(router, "v2/user/" + id);
    return new UserObj(user);
  }

  public static async genTripV2(
    router: VueRouter,
    id: number,
  ): Promise<TripObj> {
    const trip = await HTTPReq.genGET(router, "v2/trip/" + id);
    return new TripObj(trip);
  }

  public static getIsCurrentUser(id: number): boolean {
    return this.getCurrentUserV2().ID === id;
  }

  public static async genUpdateCurrentUser(router: VueRouter): Promise<void> {
    await this.genCurrentUserV2(router);
  }

  public static async genCurrentUserV2(router: VueRouter): Promise<UserObj> {
    const user = new UserObj(await HTTPReq.genGET(router, "v2/whoami"));
    if (user.ID === -1) {
      localStorage.clear();
    } else {
      localStorage.setItem("userobj", WingsStructUtil.stringify(user));
    }

    return this.getCurrentUserV2();
  }

  private static getCurrentUserV2(): UserObj {
    const user = localStorage.getItem("userobj");
    if (user !== null) {
      return new UserObj(JSON.parse(user));
    }

    return new UserObj();
  }

  public static authSession(): boolean {
    return this.getCurrentUserV2().ID !== -1;
  }

  public static confirmed(): boolean {
    return this.getCurrentUserV2().details.confirmed.valueOf();
  }
}
