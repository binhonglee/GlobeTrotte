import { Router } from "vue-router";

export default class Redirect {
  public static async genRedirect(
    r: Router,
    path: string,
    overrideRateLimit = false,
    rateLimitedPath: string | null = null,
  ): Promise<void> {
    if (
      rateLimitedPath !== null &&
      r.currentRoute.value.path.startsWith(rateLimitedPath) &&
      !overrideRateLimit
    ) {
      return;
    }

    await r.push(path);
  }
}
