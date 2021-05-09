import { VueRouter } from "vue-router";

export default class Redirect {
  public static async genRedirect(
    r: VueRouter,
    path: string,
    overrideRateLimit = false,
    rateLimitedPath: string = null,
  ): Promise<void> {
    if (
      rateLimitedPath !== null &&
      r.currentRoute.path.startsWith(rateLimitedPath) &&
      !overrideRateLimit
    ) {
      return;
    }

    await r.push(path);
  }
}
