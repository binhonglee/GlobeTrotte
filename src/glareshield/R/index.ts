import { Router, RouteLocationNormalized } from "vue-router";

export default abstract class R {
  protected static siteURI: string;
  protected static router: Router;
  protected static ratelimited: string;
  protected static default: string;

  public static async genNewTab(
    path: string,
    map: Map<string, string> = new Map<string, string>(),
    id = "",
  ): Promise<void> {
    if (path !== "/") {
      path = this.getSubPath(path, map, id);
    }
    window.open(this.siteURI + path);
  }

  public static async genRedirectTo(
    path: string,
    map: Map<string, string> = new Map<string, string>(),
    id = "",
    overrideRateLimit = false,
  ): Promise<void> {
    if (path !== "/") {
      path = this.getSubPath(path, map, id);
    }
    await this.genRedirect(path, overrideRateLimit);
  }

  public static getParamMap(): Map<string, string> {
    const params = this.router.currentRoute.value.params["params"] as string;
    return this.paramMapFromString(params);
  }

  public static hasNext(): boolean {
    return this.getParamMap().has("next");
  }

  public static addParamNext(
    path: string,
    next: string,
    map = new Map<string, string>(),
  ): string {
    if (next.startsWith("/")) {
      next = next.substring(1);
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

  public static getSubPath(
    path: string,
    map: Map<string, string>,
    id: string,
  ): string {
    if (path.endsWith("/")) {
      path = path.substring(0, path.length - 1);
    }
    return path + (id.length > 0 ? "/" + id : "") + "/" + this.setParamMap(map);
  }

  public static async paramToNext(
    map: Map<string, string> = new Map<string, string>(),
    force_redirect = false,
  ): Promise<void> {
    const path = this.getParamMap().get("next");
    await this.genRedirectTo(
      this.next(path ?? this.default),
      map,
      "",
      force_redirect,
    );
  }

  public static getNext(
    r: RouteLocationNormalized,
    map: Map<string, string> = new Map<string, string>(),
  ): string {
    const path = this.paramMapFromString(r.params["params"] as string).get(
      "next",
    );
    return this.next(path ?? this.default, map);
  }

  public static fakeGetNext(
    map: Map<string, string> = new Map<string, string>(),
    to: string = this.default,
  ): string {
    return this.next(to, map);
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

  private static next(
    path: string,
    map: Map<string, string> = new Map<string, string>(),
  ): string {
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

  private static async genRedirect(
    path: string,
    overrideRateLimit = false,
  ): Promise<void> {
    if (
      this.router.currentRoute.value.path.startsWith(this.ratelimited) &&
      !overrideRateLimit
    ) {
      return;
    }

    await this.router.push(path);
  }
}
