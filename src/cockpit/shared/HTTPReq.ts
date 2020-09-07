import Axios, {
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from "axios";

export default class HTTPReq {
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

  private static host = "localhost";
  private static port = 4000;
  private static pathPrefix = "/api/";

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
        // alert('Submission failed');
      });
  }
}
