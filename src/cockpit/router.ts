/*
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
    }, {
      path: "*",
      name: "404",
      component: () => import("./views/V404.vue"),
    }, {
      path: "/user",
      name: "GetUserIndex",
      component: () => import("./views/VGetUser.vue"),
    }, {
      path: "/user/:id",
      name: "GetUser",
      component: () => import("./views/VGetUser.vue"),
    }, {
      path: "/login",
      name: "Login",
      meta: {
        guest: true,
      },
      component: () => import("./views/VLogin.vue"),
    }, {
      path: "/myaccount",
      name: "MyAccount",
      meta: {
        loggedIn: true,
      },
      component: () => import("./views/VMyAccount.vue"),
    }, {
      path: "/register",
      name: "Register",
      meta: {
        guest: true,
      },
      component: () => import("./views/VRegister.vue"),
    }, {
      path: "/trip/view",
      name: "trip/GetViewIndex",
      component: () => import("./views/trip/VGetView.vue"),
    }, {
      path: "/trip/view/:id",
      name: "trip/GetView",
      component: () => import("./views/trip/VGetView.vue"),
    }, {
      path: "/trip/new",
      name: "trip/New",
      meta: {
        loggedIn: true,
      },
      component: () => import("./views/trip/VNew.vue"),
    },
  ],
});
