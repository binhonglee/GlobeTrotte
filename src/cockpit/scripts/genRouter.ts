import { readdirSync, lstatSync, writeFileSync } from "fs";
import { join } from "path";

interface Meta {
  [key: string]: string[];
}

const meta: Meta = {
  guest: [
    "NextLogin",
    "NextLoginRedirect",
    "NextRegister",
    "NextRegisterRedirect",
  ],
  loggedIn: ["trip/New", "MyAccount"],
};

const viewFolder = "src/cockpit/views/";
const presetRoute = ["landing", "404"];
const before = `/*
 * DO MOT EDIT THIS FILE DIRECTLY!
 * Edits will be overwritten on build.
 *
 * Source: src/cockpit/shared/genRouter.ts
 */

import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "landing",
      component: () => import("./views/VLanding.vue"),
    },
    {
      path: "*",
      name: "404",
      component: () => import("./views/V404.vue"),
    },`;

const after = `
  ],
});
`;

class Params {
  public key: string;
  public name: string;
  public param: string;

  public constructor(
    key: string,
    name: string,
    param: string,
  ) {
    this.key = key;
    this.name = name;
    this.param = param;
  }
}

class GenRouter {
  private output = before;

  public run(): void {
    this.getFiles();
    this.output += after;
    writeFileSync("router.ts", this.output);
  }

  private getFiles(folder = ""): void {
    const fullpath = viewFolder + folder;
    readdirSync(fullpath).forEach((file) => {
      if (!lstatSync(join(fullpath, file)).isFile()) {
        this.getFiles(folder + file + "/");
      } else if (file.endsWith(".vue")) {
        this.output += this.getRoutes(folder, file);
      }
    });
  }

  private getRoutes(path: string, file: string): string {
    const name = this.getPath(file);
    let urlPath = name.toLowerCase();
    let toReturn = "";

    if (presetRoute.includes(urlPath)) {
      return "";
    }

    const allParams: Params[] = [
      new Params("get", "Index", "id"),
      new Params("next", "Redirect", "path"),
    ];
    let returnAfter = false;
    allParams.forEach((param) => {
      if (
        urlPath.length > param.key.length &&
        urlPath
          .substr(0, param.key.length)
          .localeCompare(param.key) === 0
      ) {
        urlPath = urlPath.substr(param.key.length);
        returnAfter =
          urlPath.substr(0, 4).localeCompare("only") === 0;
        if (returnAfter) {
          urlPath = urlPath.substr(4);
        }
        toReturn = this.getRoute(
          path + urlPath + "/:" + param.param,
          path + name + param.name,
          path + file,
        );
      }
    });
    if (returnAfter) {
      return toReturn;
    }

    return (
      toReturn +
      this.getRoute(
        path + urlPath,
        path + name,
        path + file,
      )
    );
  }

  private getRoute(
    path: string,
    name: string,
    component: string,
  ): string {
    let metaTxt = "";
    for (const key of Object.keys(meta)) {
      if (meta[key].includes(name)) {
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
    if (filename.substr(0, 1) === "V") {
      filename = filename.substr(1);
    }

    return filename.split(".", 1)[0];
  }
}

const genRouter = new GenRouter();
genRouter.run();
