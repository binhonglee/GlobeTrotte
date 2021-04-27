import Axios, { AxiosRequestConfig, Method } from "axios";
import VueRouter from "vue-router";
import Routes from "@/routes";
import R from "./R";

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

  public static async genGET(router: VueRouter, uri: string): Promise<unknown> {
    return this.genSendRequest(router, uri, AxMethod.GET);
  }

  public static async genDELETE(
    router: VueRouter,
    uri: string,
    data = "",
  ): Promise<unknown> {
    return this.genSendRequest(
      router,
      this.delPrefix + uri,
      AxMethod.POST,
      data,
    );
  }

  public static async genPOST(
    router: VueRouter,
    uri: string,
    data: string,
  ): Promise<unknown> {
    return this.genSendRequest(router, uri, AxMethod.POST, data);
  }

  public static getURI(path: string): string {
    return "http://" + this.host + ":" + this.port + this.pathPrefix + path;
  }

  private static async genSendRequest(
    router: VueRouter,
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
      const currentPath: string = router.currentRoute.path;
      if (
        !currentPath.startsWith(Routes.RateLimited) &&
        toRet === this.rateLimited
      ) {
        // eslint-disable-next-line deprecation/deprecation
        await R.genRedirect(
          router,
          R.addParamNext(Routes.RateLimited, router.currentRoute.path),
        );
        return "";
      }
      return toRet;
    } catch (e) {
      return "";
    }
  }
}
