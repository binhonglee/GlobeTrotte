import * as http from "http";

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

  private static sendRequest(
    uri: string,
    data: string,
    type: string,
    callback: (data: string) => void,
  ) {
    const fullURI = {
      host: HTTPReq.host,
      port: HTTPReq.port,
      path: HTTPReq.pathPrefix + uri,
      method: type,
      headers: {
        "Content-Length": Buffer.byteLength(data),
      },
    };

    const request = http
      .request(fullURI, (res: http.IncomingMessage) => {
        res.setEncoding("utf8");
        let returnData = "";
        res.on("data", (chunk: string) => {
          returnData += chunk;
        });
        res.on("end", () => {
          callback(returnData);
        });
      })
      .on("error", () => {
        callback(false.toString());
        // alert('Submission failed');
      });

    if (data.length > 0) {
      request.write(data);
    }
    request.end();
  }
}
