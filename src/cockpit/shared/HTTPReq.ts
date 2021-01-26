import Axios, { AxiosRequestConfig, Method } from "axios";
import VueRouter from "vue-router";
import General from "./General";

enum AxMethod {
  POST = "POST",
  GET = "GET",
  DELETE = "DELETE",
  OPTIONS = "OPTIONS",
}

export default class HTTPReq {
  private static host = "localhost";
  private static port = 4000;
  private static pathPrefix = "/api/";
  private static delPrefix = "del/";

  public static async genGET(router: VueRouter, uri: string): Promise<string> {
    return await this.genSendRequest(router, uri, AxMethod.GET);
  }

  public static async genDELETE(
    router: VueRouter,
    uri: string,
  ): Promise<string> {
    return await this.genSendRequest(
      router,
      HTTPReq.delPrefix + uri,
      AxMethod.POST,
    );
  }

  public static async genPOST(
    router: VueRouter,
    uri: string,
    data: string,
  ): Promise<string> {
    return await this.genSendRequest(router, uri, AxMethod.POST, data);
  }

  public static getURI(path: string): string {
    return (
      "http://" + HTTPReq.host + ":" + HTTPReq.port + HTTPReq.pathPrefix + path
    );
  }

  private static async genSendRequest(
    router: VueRouter,
    uri: string,
    type: Method,
    data = "",
  ): Promise<string> {
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
      if (!currentPath.startsWith("/ratelimited") && toRet === "ratelimited") {
        await General.genRedirectTo(
          router,
          General.addNext("/ratelimited", router.currentRoute.path),
        );
        return "";
      }
      return toRet;
    } catch (e) {
      return "";
    }
  }
}
