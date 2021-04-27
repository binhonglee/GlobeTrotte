import H from "./H";

export default class HTTPReq extends H {
  protected static host = "localhost";
  protected static port = 4000;
  protected static pathPrefix = "/api/";
  protected static delPrefix = "del/";
  protected static rateLimited = "ratelimited";
}
