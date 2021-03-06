import R from "./R";
import router from "@/router";
import Routes from "@/routes";

export default class Routing extends R {
  protected static router = router;
  protected static ratelimited = Routes.RateLimited;
  protected static default = Routes.Landing;

  // Unlike genRedirectTo, this is for when you are redirecting back to the same
  // page with different params.The page needs to be refreshed to have the new
  // params dealt with (remounted).
  public static async genRefreshRedirect(
    path: string,
    map: Map<string, string> = new Map<string, string>(),
    id = "",
  ): Promise<void> {
    await this.genRedirectTo(
      Routes.Refresh,
      new Map<string, string>(
        Object.entries({
          next: this.getSubPath(path, map, id)
            .replaceAll("/", ".slash.")
            .replaceAll(":", ".colon.")
            .replaceAll("=", ".equal."),
        }),
      ),
      "",
      true,
    );
  }
}
