import Axios, {
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from "axios";

export default class HTTPReq {
  private static host = "localhost";
  private static port = 4000;
  private static pathPrefix = "/api/";

  public static post(
    uri: string,
    data: string,
    callback: (data: string) => void,
  ): void {
    this.sendRequest(uri, data, "POST", callback);
  }

  public static get(
    uri: string,
    callback: (data: string) => void,
  ): void {
    this.sendRequest(uri, "", "GET", callback);
  }

  public static async genGET(uri: string): Promise<string> {
    return await this.genSendRequest(uri, "", "GET");
  }

  public static async genPOST(
    uri: string,
    data: string,
  ): Promise<string> {
    return await this.genSendRequest(uri, data, "POST");
  }

  public static getURI(path: string): string {
    return (
      "http://" +
      HTTPReq.host +
      ":" +
      HTTPReq.port +
      HTTPReq.pathPrefix +
      path
    );
  }

  private static sendRequest(
    uri: string,
    data: string,
    type: Method,
    callback: (data: string) => void,
  ) {
    const fullURI: AxiosRequestConfig = {
      method: type,
      url: this.getURI(uri),
    };

    if (data.length > 0) {
      fullURI["data"] = data;
    }

    Axios.request(fullURI)
      .then((res: AxiosResponse) => {
        callback(res["data"]);
      })
      .catch(() => {
        callback(false.toString());
      });
  }

  private static async genSendRequest(
    uri: string,
    data: string,
    type: Method,
  ): Promise<string> {
    const fullURI: AxiosRequestConfig = {
      method: type,
      url: this.getURI(uri),
    };

    if (data.length > 0) {
      fullURI["data"] = data;
    }

    return (await Axios.request(fullURI))["data"];
  }
}
