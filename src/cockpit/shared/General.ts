import { WingsStructUtil } from "wings-ts-util";
import HTTPReq from "@/shared/HTTPReq";
import router from "@/router";
import { useLoadingBar } from "naive-ui";
import { LoadingBarApiInjection } from "naive-ui/lib/loading-bar/src/LoadingBarProvider";
import Auth from "@/wings/Auth";
import { getLocal, removeLocal, setLocal } from "./Storage";

export default class General {
  public static paramID(): string | undefined {
    /* istanbul ignore next: $route is a pain to mock, using this as a workaround for testing */
    try {
      return router.currentRoute.value.params["id"] as string;
    } catch {
      return undefined;
    }
  }

  public static getIsCurrentUser(id: number): boolean {
    return this.getCurrentUser().ID === id;
  }

  public static getCurrentUsername(): string {
    const username = this.getCurrentUser().username;
    if (username.length > 0) {
      return username.valueOf();
    }
    return this.getCurrentUser().ID.toString();
  }

  public static async genUpdateCurrentUser(): Promise<void> {
    await this.genCurrentUser();
  }

  public static async genCurrentUser(): Promise<Auth> {
    const user = new Auth(await HTTPReq.genGET("v3/whoami"));
    if (user.ID === -1) {
      removeLocal("auth");
    } else {
      setLocal("auth", WingsStructUtil.stringify(user));
    }

    return this.getCurrentUser();
  }

  private static getCurrentUser(): Auth {
    const user = getLocal("auth");
    if (user !== null) {
      return new Auth(JSON.parse(user));
    }

    return new Auth();
  }

  public static authSession(): boolean {
    return this.getCurrentUser().ID !== -1;
  }

  public static confirmed(): boolean {
    return this.getCurrentUser().confirmed.valueOf();
  }

  public static loadingBar(): LoadingBarApiInjection | null {
    try {
      return useLoadingBar();
    } catch (_) {
      return null;
    }
  }

  public static getDisplayDate(date: Date): string {
    return date.toDateString().substring(4);
  }
}
