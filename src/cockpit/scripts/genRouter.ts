import { readdirSync, lstatSync, writeFileSync } from "fs";
import { join } from "path";

interface Meta {
  [key: string]: string[];
}

class Path {
  public name: string;
  public path: string;

  public constructor(name: string, path: string) {
    this.name = name;
    this.path = path;
  }
}

const paths: Path[] = [new Path("Landing", ""), new Path("NotFound", "404")];

const meta: Meta = {
  guest: ["Login", "Register"],
  loggedIn: ["MyAccount"],
  confirmed: ["trip/New"],
  unconfirmed: ["confirm/UuidOnlyEmailUUID", "unconfirmed/NextEmailRedirect"],
};

const viewFolder = "src/cockpit/views/";
const presetRoute = ["landing", "notfound"];
const prefix = `/*
 * DO NOT EDIT THIS FILE DIRECTLY!
 * Edits will be overwritten on build.
 *
 * Source: src/cockpit/shared/genRouter.ts
 */
`;

const before =
  prefix +
  `
import Vue from "vue";
import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/:pathMatch(.*)",
      name: "404",
      component: () => import("./views/vNotFound.vue"),
    },
    {
      path: "/",
      name: "landing",
      component: () => import("./views/vLanding.vue"),
    },`;

const after = `
  ],
});
`;

const routesBefore =
  prefix +
  `
export default class Routes {
`;

const routesAfter = `}
`;

class Params {
  public key: string;
  public name: string;
  public param: string;

  public constructor(key: string, name: string, param: string) {
    this.key = key;
    this.name = name;
    this.param = param;
  }
}

const allParams: Params[] = [new Params("id", "Index", "id")];

class GenRouter {
  private output = before;

  public run(): void {
    this.getFiles();
    this.output += after;
    writeFileSync("router.ts", this.output);
    writeFileSync("routes.ts", this.pathsToString());
  }

  private getFiles(folder = ""): void {
    const fullpath = viewFolder + folder;
    readdirSync(fullpath).forEach((file) => {
      if (!lstatSync(join(fullpath, file)).isFile()) {
        this.getFiles(folder + file + "/");
      } else if (file.endsWith(".vue")) {
        const routes = this.getParamRoute(folder, file);
        if (routes !== "") {
          this.output += routes;
        }
      }
    });
  }

  private getParamRoute(path: string, file: string): string {
    if (file.substring(0, 1) !== "v") {
      return "";
    }

    let toReturn = "";

    let name = file.substring(1).split(".", 1)[0];
    let urlPath = name.toLowerCase();

    if (presetRoute.includes(urlPath)) {
      return "";
    }

    const params: string[] = [];
    allParams.forEach((param) => {
      if (
        urlPath.length > param.key.length &&
        urlPath.substring(0, param.key.length).localeCompare(param.key) === 0
      ) {
        name = name.substring(param.key.length);
        urlPath = urlPath.substring(param.key.length);
        toReturn += this.getRoute(
          path + urlPath + params.join(""),
          path + name + param.name,
          path + file,
        );
        params.push("/:" + param.param);
      }
    });

    paths.push(new Path((path + name).split("/").join("_"), path + urlPath));
    urlPath += params.join("");

    return (
      toReturn +
      this.getRoute(path + urlPath, path + name, path + file) +
      this.getRoute(
        path + urlPath + "/:params",
        path + name + "Params",
        path + file,
      )
    );
  }

  private getRoute(path: string, name: string, component: string): string {
    let metaTxt = "";
    for (const key of Object.keys(meta)) {
      if (
        meta[key].includes(name) ||
        (name.slice(name.length - 6, name.length) === "Params" &&
          meta[key].includes(name.slice(0, name.length - 6)))
      ) {
        metaTxt +=
          `
        ` +
          key +
          `: true,`;
      }
    }

    if (metaTxt.length > 0) {
      metaTxt =
        `
      meta: {` +
        metaTxt +
        `
      },`;
    }

    return (
      `
    {
      path: "/` +
      path +
      `",
      name: "` +
      name +
      `",` +
      metaTxt +
      `
      component: () => import("./views/` +
      component +
      `"),
    },`
    );
  }

  private getPath(filename: string): string {
    if (filename.substring(0, 1) === "V") {
      filename = filename.substring(1);
    } else {
      return "";
    }

    return filename.split(".", 1)[0];
  }

  private pathsToString(): string {
    let toRet = routesBefore;
    for (const path of paths) {
      toRet += "  public static " + path.name + ' = "/' + path.path + '";\n';
    }
    return toRet + routesAfter;
  }
}

const genRouter = new GenRouter();
genRouter.run();