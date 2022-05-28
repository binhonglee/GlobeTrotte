import { H } from "@glareshield/all";

import router from "@/router";
import Routes from "@/routes";
import Routing from "./Routing";

export default class HTTPReq extends H {
  protected static host =
    process.env.NODE_ENV === "production" ? "globetrotte.com" : "localhost";
  protected static port =
    process.env.NODE_ENV === "production" ? undefined : 4000;
  protected static protocol =
    process.env.NODE_ENV === "production" ? "https://" : "http://";
  protected static pathPrefix = "/api/";
  protected static delPrefix = "del/";
  protected static rateLimited = "ratelimited";
  protected static selfPort =
    process.env.NODE_ENV === "production" ? undefined : 3000;

  public static getAbsoluteURL(routes: Routes, args = ""): string {
    return (
      this.protocol +
      this.host +
      (this.selfPort === undefined ? "" : ":" + this.selfPort) +
      routes +
      "/" +
      args
    );
  }

  protected static async genOnRateLimited(): Promise<void> {
    const currentPath: string = router.currentRoute.value.path;
    if (!currentPath.startsWith(this.rateLimited)) {
      await Routing.genRedirectTo(
        Routing.addParamNext(this.rateLimited, router.currentRoute.value.path),
      );
    }
    return;
  }
}
