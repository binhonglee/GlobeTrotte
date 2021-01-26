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
    },
    {
      path: "*",
      name: "404",
      component: () => import("./views/V404.vue"),
    },
    {
      path: "/user/:id",
      name: "GetUserIndex",
      component: () => import("./views/VGetUser.vue"),
    },
    {
      path: "/user",
      name: "GetUser",
      component: () => import("./views/VGetUser.vue"),
    },
    {
      path: "/myaccount",
      name: "MyAccount",
      meta: {
        loggedIn: true,
      },
      component: () => import("./views/VMyAccount.vue"),
    },
    {
      path: "/login/:path",
      name: "NextLoginRedirect",
      meta: {
        guest: true,
      },
      component: () => import("./views/VNextLogin.vue"),
    },
    {
      path: "/login",
      name: "NextLogin",
      meta: {
        guest: true,
      },
      component: () => import("./views/VNextLogin.vue"),
    },
    {
      path: "/ratelimited/:path",
      name: "NextRateLimitedRedirect",
      component: () => import("./views/VNextRateLimited.vue"),
    },
    {
      path: "/ratelimited",
      name: "NextRateLimited",
      component: () => import("./views/VNextRateLimited.vue"),
    },
    {
      path: "/register/:path",
      name: "NextRegisterRedirect",
      meta: {
        guest: true,
      },
      component: () => import("./views/VNextRegister.vue"),
    },
    {
      path: "/register",
      name: "NextRegister",
      meta: {
        guest: true,
      },
      component: () => import("./views/VNextRegister.vue"),
    },
    {
      path: "/confirm/email/:uuid",
      name: "confirm/UuidOnlyEmailUUID",
      meta: {
        unconfirmed: true,
      },
      component: () => import("./views/confirm/VUuidOnlyEmail.vue"),
    },
    {
      path: "/trip/view/:id",
      name: "trip/GetViewIndex",
      component: () => import("./views/trip/VGetView.vue"),
    },
    {
      path: "/trip/view",
      name: "trip/GetView",
      component: () => import("./views/trip/VGetView.vue"),
    },
    {
      path: "/trip/new",
      name: "trip/New",
      meta: {
        confirmed: true,
      },
      component: () => import("./views/trip/VNew.vue"),
    },
    {
      path: "/unconfirmed/email/:path",
      name: "unconfirmed/NextEmailRedirect",
      meta: {
        unconfirmed: true,
      },
      component: () => import("./views/unconfirmed/VNextEmail.vue"),
    },
    {
      path: "/unconfirmed/email",
      name: "unconfirmed/NextEmail",
      component: () => import("./views/unconfirmed/VNextEmail.vue"),
    },
  ],
});
