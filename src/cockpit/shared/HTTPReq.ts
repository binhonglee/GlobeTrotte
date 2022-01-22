import { LoadingBarApiInjection } from "naive-ui/lib/loading-bar/src/LoadingBarProvider";
import { useLoadingBar } from "naive-ui";
import H from "./H";
import router from "@/router";
import Redirect from "./redirect";
import Routing from "./Routing";

export default class HTTPReq extends H {
  protected static host =
    process.env.NODE_ENV === "production" ? "globetrotte.com" : "localhost";
  protected static port =
    process.env.NODE_ENV === "production" ? undefined : 4000;
  protected static pathPrefix = "/api/";
  protected static delPrefix = "del/";
  protected static rateLimited = "ratelimited";
  protected static router = router;
  private static loadingBar: LoadingBarApiInjection | undefined = undefined;
  private static failed = false;

  protected async onRateLimited(): Promise<void> {
    // eslint-disable-next-line @delagen/deprecation/deprecation
    await Redirect.genRedirect(
      router,
      Routing.addParamNext(this.rateLimited, router.currentRoute.value.path),
      false,
      this.rateLimited,
    );
  }

  protected static beforeSendRequest(): void {
    try {
      this.loadingBar = useLoadingBar();
      this.loadingBar.start();
      this.failed = false;
    } catch (_) {
      this.failed = true;
    }
  }

  protected static sendRequestSuccess(): void {
    if (!this.failed && this.loadingBar !== undefined) {
      this.loadingBar.finish();
    }
  }

  protected static sendRequestFailure(): void {
    if (!this.failed && this.loadingBar !== undefined) {
      this.loadingBar.error();
    }
  }
}
