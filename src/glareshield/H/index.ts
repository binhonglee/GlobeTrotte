import Axios, { AxiosRequestConfig, Method } from "axios";

enum AxMethod {
  POST = "POST",
  GET = "GET",
  DELETE = "DELETE",
  OPTIONS = "OPTIONS",
}

export default abstract class H {
  protected static host: string;
  protected static port?: number;
  protected static protocol: string;
  protected static pathPrefix: string;
  protected static delPrefix: string;
  protected static rateLimited: string;
  protected static selfPort?: number;

  protected static beforeSendRequest(): void {
    return;
  }

  protected static sendRequestSuccess(): void {
    return;
  }

  protected static sendRequestFailure(): void {
    return;
  }

  protected static async genOnRateLimited(): Promise<void> {
    return;
  }

  public static async genGET(uri: string): Promise<unknown> {
    return this.genSendRequest(uri, AxMethod.GET);
  }

  public static async genDELETE(uri: string, data = ""): Promise<unknown> {
    return this.genSendRequest(this.delPrefix + uri, AxMethod.POST, data);
  }

  public static async genPOST(uri: string, data: string): Promise<unknown> {
    return this.genSendRequest(uri, AxMethod.POST, data);
  }

  public static getURI(path: string): string {
    return (
      this.protocol +
      this.host +
      (this.port === undefined ? "" : ":" + this.port) +
      this.pathPrefix +
      path
    );
  }

  private static async genSendRequest(
    uri: string,
    type: Method,
    data = "",
  ): Promise<unknown> {
    this.beforeSendRequest();
    const fullURI: AxiosRequestConfig = {
      method: type,
      url: this.getURI(uri),
    };

    if (data.length > 0) {
      fullURI["data"] = data.split("\n").join("\\n");
    }
    try {
      const toRet = (await Axios.request(fullURI))["data"];
      if (toRet === this.rateLimited) {
        this.sendRequestSuccess();
        await this.genOnRateLimited();
        return "";
      }
      this.sendRequestSuccess();
      return toRet;
    } catch (e) {
      this.sendRequestFailure();
      return "";
    }
  }
}
