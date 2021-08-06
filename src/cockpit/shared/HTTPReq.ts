import H from "./H";
import router from "@/router";

export default class HTTPReq extends H {
  protected static host =
    process.env.NODE_ENV === "production" ? "globetrotte.com" : "localhost";
  protected static port =
    process.env.NODE_ENV === "production" ? undefined : 4000;
  protected static pathPrefix = "/api/";
  protected static delPrefix = "del/";
  protected static rateLimited = "ratelimited";
  protected static router = router;
}
