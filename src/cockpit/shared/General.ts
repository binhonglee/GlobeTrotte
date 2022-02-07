import { ElNotificationOptions, MessageType } from "element-plus-option-types";
import { WingsStructUtil } from "wings-ts-util";
import HTTPReq from "@/shared/HTTPReq";
import TripObj from "@/wings/TripObj";
import UserObj from "@/wings/UserObj";
import router from "@/router";
import { useLoadingBar } from "naive-ui";
import { LoadingBarApiInjection } from "naive-ui/lib/loading-bar/src/LoadingBarProvider";

export default class General {
  public static paramID(): string | undefined {
    /* istanbul ignore next: $route is a pain to mock, using this as a workaround for testing */
    try {
      return router.currentRoute.value.params["id"] as string;
    } catch {
      return undefined;
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

  public static async genUser(id: number): Promise<UserObj> {
    const user = await HTTPReq.genGET("v2/user/" + id);
    return new UserObj(user);
  }

  public static async genFromUsername(username: string): Promise<UserObj> {
    const user = await HTTPReq.genGET("username/" + username);
    return new UserObj(user);
  }

  public static async genTrip(id: number): Promise<TripObj> {
    const trip = await HTTPReq.genGET("v2/trip/" + id);
    return new TripObj(trip);
  }

  public static getIsCurrentUser(id: number): boolean {
    return this.getCurrentUser().ID === id;
  }

  public static async genUpdateCurrentUser(): Promise<void> {
    await this.genCurrentUser();
  }

  public static async genCurrentUser(): Promise<UserObj> {
    const user = new UserObj(await HTTPReq.genGET("v2/whoami"));
    if (user.ID === -1) {
      localStorage.clear();
    } else {
      localStorage.setItem("userobj", WingsStructUtil.stringify(user));
    }

    return this.getCurrentUser();
  }

  private static getCurrentUser(): UserObj {
    const user = localStorage.getItem("userobj");
    if (user !== null) {
      return new UserObj(JSON.parse(user));
    }

    return new UserObj();
  }

  public static authSession(): boolean {
    return this.getCurrentUser().ID !== -1;
  }

  public static confirmed(): boolean {
    return this.getCurrentUser().details.confirmed.valueOf();
  }

  public static loadingBar(): LoadingBarApiInjection | null {
    try {
      return useLoadingBar();
    } catch (_) {
      return null;
    }
  }
}
