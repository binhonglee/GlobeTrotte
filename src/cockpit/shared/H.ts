import Axios, { AxiosRequestConfig, Method } from "axios";
import { Router } from "vue-router";
import R from "./R";
import Redirect from "./redirect";

enum AxMethod {
  POST = "POST",
  GET = "GET",
  DELETE = "DELETE",
  OPTIONS = "OPTIONS",
}

export default abstract class H {
  protected static host: string;
  protected static port: number;
  protected static pathPrefix: string;
  protected static delPrefix: string;
  protected static rateLimited: string;
  protected static router: Router;

  public static async genGET(uri: string): Promise<unknown> {
    return this.genSendRequest(this.getRouter(), uri, AxMethod.GET);
  }

  public static async genDELETE(uri: string, data = ""): Promise<unknown> {
    return this.genSendRequest(
      this.getRouter(),
      this.delPrefix + uri,
      AxMethod.POST,
      data,
    );
  }

  public static async genPOST(uri: string, data: string): Promise<unknown> {
    return this.genSendRequest(this.getRouter(), uri, AxMethod.POST, data);
  }

  public static getURI(path: string): string {
    return "http://" + this.host + ":" + this.port + this.pathPrefix + path;
  }

  private static async genSendRequest(
    router: Router,
    uri: string,
    type: Method,
    data = "",
  ): Promise<unknown> {
    const fullURI: AxiosRequestConfig = {
      method: type,
      url: this.getURI(uri),
    };

    if (data.length > 0) {
      fullURI["data"] = data.split("\n").join("\\n");
    }
    try {
      const toRet = (await Axios.request(fullURI))["data"];
      const currentPath: string = router.currentRoute.value.path;
      if (
        !currentPath.startsWith(this.rateLimited) &&
        toRet === this.rateLimited
      ) {
        // eslint-disable-next-line deprecation/deprecation
        await Redirect.genRedirect(
          router,
          R.addParamNext(this.rateLimited, router.currentRoute.value.path),
          false,
          this.rateLimited,
        );
        return "";
      }
      return toRet;
    } catch (e) {
      return "";
    }
  }

  protected static getRouter(): Router {
    if (this.router === undefined || this.router === null) {
      throw new ReferenceError("Router is null or undefined.");
    }
    return this.router;
  }
}
