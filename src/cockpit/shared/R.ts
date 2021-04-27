import Routes from "@/routes";
import VueRouter, { Route } from "vue-router";

/*
 * R is short for Route so functions included here are loosely related to path
 * routing between views.
 */
export default class R {
  public static getParamMap(v: Vue): Map<string, string> {
    const params = v.$route.params["params"];
    return this.paramMapFromString(params);
  }

  private static paramMapFromString(s: string): Map<string, string> {
    if (s === undefined || !s.startsWith(":")) {
      return new Map();
    }

    s = s.substring(1);
    const mapArr = s.split(":");
    const map = new Map();
    mapArr.forEach((element) => {
      const item = element.split("=");
      if (item.length === 2) {
        map.set(item[0], item[1]);
      }
    });

    return map;
  }

  private static setParamMap(map: Map<string, string>): string {
    let toReturn = "";
    map.forEach((value, key) => {
      toReturn += ":" + key + "=" + value;
    });
    return toReturn;
  }

  public static hasNext(v: Vue): boolean {
    return this.getParamMap(v).has("next");
  }

  public static addParamNext(
    path: string,
    next: string,
    map = new Map<string, string>(),
  ): string {
    if (next.startsWith("/")) {
      next = next.substr(1, next.length);
    }
    const nexts = next.split("&");
    const first = nexts.shift()?.split("/").join(".") ?? "";
    if (nexts.length > 0) {
      next = first + "&" + nexts.join("");
    } else {
      next = first;
    }

    map.set("next", next);
    return path + "/" + this.setParamMap(map);
  }

  // Unlike genRedirectTo, this is for when you are redirecting back to the same
  // page with different params.The page needs to be refreshed to have the new
  // params dealt with (remounted).
  public static async genRefreshRedirect(
    v: Vue,
    path: string,
    map: Map<string, string> = new Map<string, string>(),
    id = "",
  ): Promise<void> {
    await this.genRedirectTo(
      v,
      Routes.Refresh,
      new Map<string, string>(
        Object.entries({
          next: this.getSubPath(path, map, id)
            .replaceAll("/", ".slash.")
            .replaceAll(":", ".colon.")
            .replaceAll("=", ".equal."),
        }),
      ),
    );
  }

  public static async genRedirectTo(
    v: Vue,
    path: string,
    map: Map<string, string> = new Map<string, string>(),
    id = "",
    overrideRateLimit = false,
  ): Promise<void> {
    if (path !== "/") {
      path = this.getSubPath(path, map, id);
    }
    // eslint-disable-next-line deprecation/deprecation
    await this.genRedirect(v.$router, path, overrideRateLimit);
  }

  private static getSubPath(
    path: string,
    map: Map<string, string>,
    id: string,
  ) {
    return path + (id.length > 0 ? "/" + id : "") + "/" + this.setParamMap(map);
  }

  /**
   * @deprecated Avoid introducing new use of this. Use `genRedirectTo()` instead
   */
  public static async genRedirect(
    r: VueRouter,
    path: string,
    overrideRateLimit = false,
  ): Promise<void> {
    if (
      r.currentRoute.path.startsWith(Routes.RateLimited) &&
      !overrideRateLimit
    ) {
      return;
    }

    await r.push(path);
  }

  public static async paramToNext(
    v: Vue,
    map: Map<string, string> = new Map<string, string>(),
    force_redirect = false,
  ): Promise<void> {
    const path = this.getParamMap(v).get("next");
    if (!force_redirect) {
      return;
    }
    await this.genRedirectTo(v, this.next(path ?? Routes.Landing, map));
  }

  public static getNext(
    r: Route,
    map: Map<string, string> = new Map<string, string>(),
  ): string {
    const path = this.paramMapFromString(r.params["params"]).get("next");
    return this.next(path ?? Routes.Landing, map);
  }

  private static next(path: string, map: Map<string, string>): string {
    if (path === undefined || path.length < 2) {
      // TODO: Log error
      map.delete("next");
      return "/" + this.setParamMap(map);
    }

    const paths = path.split("&");
    let next = "";
    while (next === "" || next === undefined) {
      next = paths.shift()?.split(".").join("/") ?? "";
    }
    path = next;
    if (paths.length > 0) {
      map.set("next", paths.join("&"));
    }

    return "/" + (path.length > 0 ? path + "/" : "") + this.setParamMap(map);
  }
}
